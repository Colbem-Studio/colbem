<!-- src/lib/components/marketing/Footer.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import { TwitterLogo, DiscordLogo, GithubLogo } from 'phosphor-svelte';

	const columns = [
		{ title: 'Product', links: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }] },
		{ title: 'Company', links: [{ label: 'About', href: resolve('/about') }, { label: 'Careers', href: resolve('/careers') }] },
		{ title: 'Legal', links: [{ label: 'Privacy', href: resolve('/privacy') }, { label: 'Terms', href: resolve('/terms') }] }
	];
</script>

<footer class="border-t border-border bg-card py-16">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid grid-cols-2 gap-10 sm:grid-cols-6">
			<div class="col-span-2 sm:col-span-3">
				<div class="flex items-center gap-2">
					<img src="/icons/favicon.svg" alt="Colbe" class="h-7 w-7 rounded-[15px]" />
					<span class="font-semibold text-foreground">Colbe</span>
				</div>
				<p class="mt-3 text-sm text-muted-foreground">Built like blocks.</p>
				<div class="mt-4 flex gap-4">
					<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" class="text-muted-foreground hover:text-foreground"><TwitterLogo size={18} /></a>
					<a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord" class="text-muted-foreground hover:text-foreground"><DiscordLogo size={18} /></a>
					<a href="https://github.com/Coal-Inc" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="text-muted-foreground hover:text-foreground"><GithubLogo size={18} /></a>
				</div>
			</div>

			{#each columns as col (col.title)}
				<div class="sm:col-span-1">
					<h4 class="text-sm font-semibold text-foreground">{col.title}</h4>
					<ul class="mt-4 space-y-3">
						{#each col.links as link (link.label)}
							<li>
								<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
								<a href={link.href} class="text-sm text-muted-foreground hover:text-foreground">{link.label}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
			© {new Date().getFullYear()} Colbem Studio. All rights reserved.
		</div>
	</div>
</footer>