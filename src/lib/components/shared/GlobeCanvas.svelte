<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, MeshBasicMaterial,
		Color, Mesh, Group, InstancedMesh, Matrix4
	} from 'three';
	import { geoEquirectangular, geoPath } from 'd3-geo';

	interface Props {
		dotColor?: string;
		scale?: number;
		speed?: number;
		dragSpeed?: number;
		stopOnHover?: boolean;
		onhoverchange?: (hovering: boolean) => void;
	}

	let {
		dotColor = '#60a5fa',
		scale = 8,
		speed = 2,
		dragSpeed = 5,
		stopOnHover = true,
		onhoverchange
	}: Props = $props();

	let container: HTMLDivElement;

	function latLngToPosition(lat: number, lng: number) {
		const latRad = (lat * Math.PI) / 180;
		const lngRad = (lng * Math.PI) / 180;
		return {
			x: Math.cos(latRad) * Math.sin(lngRad),
			y: Math.sin(latRad),
			z: Math.cos(latRad) * Math.cos(lngRad)
		};
	}

	onMount(() => {
		let animationFrameId: number | null = null;
		let disposed = false;

		const width = container.clientWidth || 400;
		const height = container.clientHeight || 400;

		const scene = new Scene();
		const scaleMultiplier = Math.max(0.2, Math.min(2, ((scale - 1) / 19) * 1.8 + 0.2));
		const globeRadius = 1 * scaleMultiplier;
		const cameraDistance = 2.5 / scaleMultiplier;

		const camera = new PerspectiveCamera(50, width / height, 0.1, 1e3);
		camera.position.set(0, 0, cameraDistance);
		camera.lookAt(0, 0, 0);

		const renderer = new WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		const canvas = renderer.domElement;
		canvas.style.position = 'absolute';
		canvas.style.inset = '0';
		canvas.style.width = '100%';
		canvas.style.height = '100%';
		canvas.style.opacity = '0';
		canvas.style.transition = 'opacity 0.6s ease';
		// eslint-disable-next-line svelte/no-dom-manipulating -- Three.js owns this canvas imperatively; Svelte never renders into it
		container.appendChild(canvas);

		const globeGroup = new Group();
		scene.add(globeGroup);

		const oceanGeometry = new SphereGeometry(globeRadius, 64, 64);
		const oceanMaterial = new MeshBasicMaterial({ color: new Color('#121016') });
		globeGroup.add(new Mesh(oceanGeometry, oceanMaterial));

		const rotationBase = Math.max(0, Math.min(0.9, (speed / 10) * 0.9));
		let dotInstances: InstancedMesh | null = null;

		const rotation = { x: -0.4, y: 0.35 };
		const targetRotation = { x: -0.4, y: 0.35 };
		const velocity = { x: 0, y: 0 };
		let isDragging = false;
		let isHovering = false;
		let lastMouseX = 0;
		let lastMouseY = 0;
		const lerpFactor = 0.08;
		const velocityDecay = 0.9;

		globeGroup.rotation.y = rotation.x;
		globeGroup.rotation.x = rotation.y;

		async function loadWorld() {
			try {
				const res = await fetch(
					'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/50m/physical/ne_50m_land.json'
				);
				if (!res.ok) throw new Error('land fetch failed');
				const land = await res.json();

				const bitmapWidth = 1024;
				const bitmapHeight = 512;
				const off = document.createElement('canvas');
				off.width = bitmapWidth;
				off.height = bitmapHeight;
				const ctx = off.getContext('2d', { willReadFrequently: true });
				if (!ctx) return;
				const sphere: { type: 'Sphere' } = { type: 'Sphere' };
				const projection = geoEquirectangular().fitSize([bitmapWidth, bitmapHeight], sphere);
				const pathGen = geoPath().projection(projection).context(ctx);
				ctx.fillStyle = '#000';
				ctx.fillRect(0, 0, bitmapWidth, bitmapHeight);
				ctx.fillStyle = '#fff';
				ctx.beginPath();
				const landData = land as GeoJSON.FeatureCollection;
				landData.features.forEach((f) => pathGen(f));
				ctx.fill();
				const imageData = ctx.getImageData(0, 0, bitmapWidth, bitmapHeight);
				const pixels = imageData.data;
				const isOnLand = (lng: number, lat: number) => {
					const x = Math.round(((lng + 180) / 360) * bitmapWidth) % bitmapWidth;
					const y = Math.max(0, Math.min(bitmapHeight - 1, Math.round(((90 - lat) / 180) * bitmapHeight)));
					const idx = (y * bitmapWidth + x) * 4;
					return pixels[idx] > 128;
				};

				const dotCoords: number[][] = [];
				const baseStep = 8 * 0.08;
				for (let lat = -90; lat <= 90; lat += baseStep) {
					const cosLat = Math.cos((Math.abs(lat) * Math.PI) / 180);
					const lngStep = cosLat > 0.01 ? baseStep / Math.max(0.3, cosLat) : 360;
					for (let lng = -180; lng < 180; lng += lngStep) {
						if (isOnLand(lng, lat)) dotCoords.push([lng, lat]);
					}
				}
				if (dotCoords.length === 0 || disposed) return;

				const dotGeometry = new SphereGeometry(0.01 * 0.35, 4, 4);
				const dotMaterial = new MeshBasicMaterial({ color: new Color(dotColor) });
				const instanced = new InstancedMesh(dotGeometry, dotMaterial, dotCoords.length);
				const matrix = new Matrix4();
				dotCoords.forEach(([lng, lat], i) => {
					const pos = latLngToPosition(lat, lng);
					matrix.setPosition(pos.x * globeRadius, pos.y * globeRadius, pos.z * globeRadius);
					instanced.setMatrixAt(i, matrix);
				});
				instanced.instanceMatrix.needsUpdate = true;
				dotInstances = instanced;
				globeGroup.add(dotInstances);

				renderer.render(scene, camera);
				canvas.style.opacity = '1';
			} catch {
				canvas.style.opacity = '1';
			}
		}

		function animate() {
			if (!isDragging && (!stopOnHover || !isHovering)) {
				targetRotation.x += rotationBase * 0.01;
			}
			if (!isDragging) {
				if (Math.abs(velocity.x) > 0.001 || Math.abs(velocity.y) > 0.001) {
					targetRotation.x += velocity.x;
					targetRotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.y + velocity.y));
					velocity.x *= velocityDecay;
					velocity.y *= velocityDecay;
				}
			}
			rotation.x += (targetRotation.x - rotation.x) * lerpFactor;
			rotation.y += (targetRotation.y - rotation.y) * lerpFactor;
			globeGroup.rotation.y = rotation.x;
			globeGroup.rotation.x = rotation.y;
			renderer.render(scene, camera);
			animationFrameId = requestAnimationFrame(animate);
		}
		animationFrameId = requestAnimationFrame(animate);

		function handlePointerDown(e: PointerEvent) {
			isDragging = true;
			velocity.x = 0;
			velocity.y = 0;
			lastMouseX = e.clientX;
			lastMouseY = e.clientY;
			const sensitivity = Math.max(0.001, Math.min(0.02, (dragSpeed / 10) * 0.02));
			function move(ev: PointerEvent) {
				const dx = ev.clientX - lastMouseX;
				const dy = ev.clientY - lastMouseY;
				targetRotation.x += dx * sensitivity;
				targetRotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.y + dy * sensitivity));
				velocity.x = dx * sensitivity * 0.3;
				velocity.y = dy * sensitivity * 0.3;
				lastMouseX = ev.clientX;
				lastMouseY = ev.clientY;
			}
			function up() {
				document.removeEventListener('pointermove', move);
				document.removeEventListener('pointerup', up);
				isDragging = false;
			}
			document.addEventListener('pointermove', move);
			document.addEventListener('pointerup', up);
		}
		canvas.addEventListener('pointerdown', handlePointerDown);

		function handleEnter() {
			isHovering = true;
			onhoverchange?.(true);
		}
		function handleLeave() {
			isHovering = false;
			onhoverchange?.(false);
		}
		canvas.addEventListener('pointerenter', handleEnter);
		canvas.addEventListener('pointerleave', handleLeave);

		const resizeObserver = new ResizeObserver(() => {
			const w = container.clientWidth || 400;
			const h = container.clientHeight || 400;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		});
		resizeObserver.observe(container);

		loadWorld();

		return () => {
			disposed = true;
			if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
			canvas.removeEventListener('pointerdown', handlePointerDown);
			canvas.removeEventListener('pointerenter', handleEnter);
			canvas.removeEventListener('pointerleave', handleLeave);
			resizeObserver.disconnect();
			renderer.dispose();
			// eslint-disable-next-line svelte/no-dom-manipulating -- tearing down the same imperative canvas mounted above
			container.removeChild(canvas);
		};
	});
</script>

<div bind:this={container} class="relative h-full w-full"></div>