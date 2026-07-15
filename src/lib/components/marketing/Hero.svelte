<script lang="ts">
	import { resolve } from '$app/paths';
	import GlobeCanvas from '$lib/components/shared/GlobeCanvas.svelte';

	let phase = $state<'invisible' | 'outline' | 'filled'>('invisible');
	let timers: ReturnType<typeof setTimeout>[] = [];

	function clearTimers() {
		timers.forEach(clearTimeout);
		timers = [];
	}

	function runFlicker() {
		clearTimers();
		const sequence: Array<{ phase: typeof phase; at: number }> = [
			{ phase: 'invisible', at: 0 },
			{ phase: 'outline', at: 80 },
			{ phase: 'invisible', at: 160 },
			{ phase: 'outline', at: 260 },
			{ phase: 'filled', at: 420 }
		];
		sequence.forEach(({ phase: p, at }) => {
			timers.push(setTimeout(() => (phase = p), at));
		});
	}

	function handleHoverChange(hovering: boolean) {
		if (hovering) {
			runFlicker();
		} else {
			clearTimers();
			phase = 'invisible';
		}
	}
</script>

<section class="mx-auto flex w-[90%] max-w-7xl flex-col items-center gap-12 py-20 lg:flex-row lg:gap-8 lg:py-32">
	<div class="flex flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
		<div class="flex items-center gap-3">
			<img src="/favicon.svg" alt="Colbe" class="h-10 w-10 rounded-[15px]" />
			<span class="text-2xl font-bold text-white">Colbe</span>
		</div>

		<h1 class="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
			The chat platform<br />built like blocks.
		</h1>

		<p class="mt-4 max-w-md text-lg text-zinc-400">
			Snap DMs, calls, and communities together into one space that fits exactly how you and your people talk.
		</p>

		<div class="mt-8 flex gap-3">
			<a
				href={resolve('/register')}
				class="rounded-[15px] bg-blue-500 px-6 py-3 text-sm font-medium text-white hover:bg-blue-400"
			>
				Get started
			</a>
			<a
				href="#how-it-works"
				class="rounded-[15px] bg-white/5 px-6 py-3 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white"
			>
				See how it works
			</a>
		</div>
	</div>

	<div class="relative flex w-full items-center justify-center lg:w-1/2">
		<div class="relative h-85 w-85 sm:h-105 sm:w-105">
			<GlobeCanvas onhoverchange={handleHoverChange} />
		</div>

		<div
			class="pointer-events-none absolute left-full top-1/2 ml-4 hidden -translate-y-1/2 whitespace-nowrap text-xl font-bold tracking-tight sm:block"
			style="
				color: {phase === 'filled' ? '#60a5fa' : 'transparent'};
				-webkit-text-stroke: {phase === 'outline' ? '1.5px #60a5fa' : '0px transparent'};
				transition: color 0.15s ease;
			"
		>
			Used World Wide
		</div>
	</div>
</section>