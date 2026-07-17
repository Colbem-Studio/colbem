<script lang="ts">
	import { resolve } from '$app/paths';
	import { List, X, CaretRight } from 'phosphor-svelte';

	let scrolled = $state(false);
	let mobileOpen = $state(false);

	const links = [
		{ label: 'Features', href: '#features' },
		{ label: 'Communities', href: '#communities' },
		{ label: 'Pricing', href: '#pricing' },
		{ label: 'Docs', href: '#docs' }
	];

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 12);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	let navClass = $derived(
		`flex w-full max-w-5xl items-center justify-between rounded-[15px] border border-white/5 px-4 py-2.5 transition-all duration-300 ${
			scrolled
				? 'bg-[#17141d]/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
				: 'bg-transparent'
		}`
	);
</script>

<header class="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
	<nav class={navClass}>
		<a href={resolve('/')} class="flex items-center gap-2">
			<span class="relative flex h-8 w-8 items-center justify-center rounded-[15px] bg-blue-500/10">
				<span class="h-2 w-2 rounded-full bg-blue-400"></span>
			</span>
			<span class="text-[15px] font-semibold tracking-tight text-white">Colbe</span>
		</a>

		<ul class="hidden items-center gap-1 md:flex">
			{#each links as link (link.href)}
				<li>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- same-page hash anchor, not a route -->
					<a
						href={link.href}
						class="rounded-[15px] px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>

		<div class="hidden items-center gap-2 md:flex">
			<a
				href={resolve('/login')}
				class="rounded-[15px] px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
			>
				Log in
			</a>
			<a
				href={resolve('/register')}
				class="group flex items-center gap-1.5 rounded-[15px] bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400"
			>
				Get started
				<CaretRight size={14} weight="bold" class="transition-transform group-hover:translate-x-0.5" />
			</a>
		</div>

		<button
			class="flex h-9 w-9 items-center justify-center rounded-[15px] text-white/80 hover:bg-white/5 md:hidden"
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-label="Toggle menu"
		>
			{#if mobileOpen}
				<X size={20} />
			{:else}
				<List size={20} />
			{/if}
		</button>
	</nav>
</header>

{#if mobileOpen}
	<div
		class="fixed inset-x-4 top-20 z-40 flex flex-col gap-1 rounded-[15px] border border-white/5 bg-[#17141d]/95 p-3 backdrop-blur-xl md:hidden"
		style="animation: navDrop 0.2s ease-out"
	>
		{#each links as link (link.href)}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- same-page hash anchor, not a route -->
			<a
				href={link.href}
				class="rounded-[15px] px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
				onclick={() => (mobileOpen = false)}
			>
				{link.label}
			</a>
		{/each}
		<div class="mt-1 flex flex-col gap-2 border-t border-white/5 pt-3">
			<a href={resolve('/login')} class="rounded-[15px] px-3 py-2.5 text-center text-sm text-white/70">
				Log in
			</a>
			<a
				href={resolve('/register')}
				class="rounded-[15px] bg-blue-500 px-3 py-2.5 text-center text-sm font-medium text-white"
			>
				Get started
			</a>
		</div>
	</div>
{/if}

<style>
	@keyframes navDrop {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>