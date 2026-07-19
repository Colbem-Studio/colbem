<!-- src/lib/components/marketing/Navbar.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';

	const navItems = [
		{ label: 'About', href: '/about' },
		{ label: 'Documentation', href: '/docs' },
		{ label: 'Company', href: '/company' },
		{ label: 'News', href: '/news' }
	] as const;
</script>

<header class="w-full border-b border-border bg-background">
	<nav class="flex items-center justify-between px-6 py-4">
		<a href={resolve('/')} class="flex items-center gap-2 text-foreground font-semibold rounded-[15px] px-2 py-1">
			<img src="/favicon.svg" alt="Colbe" class="h-6 w-6" />
			<span>Colbe</span>
		</a>
		<ul class="flex items-center gap-8">
			{#each navItems as item (item.href)}
				<li>
					<a href={resolve(item.href)} class="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline rounded-[15px] px-2 py-1">
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
		<div class="flex items-center gap-3">
			<a href={resolve('/login')} class="px-4 py-2 text-sm text-foreground bg-secondary hover:bg-accent transition-colors rounded-[15px]">
				Login
			</a>
			<a href={resolve('/register')} class="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 transition-opacity rounded-[15px]">
				Register
			</a>
		</div>
	</nav>
</header>