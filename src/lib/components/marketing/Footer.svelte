<!-- src/lib/components/marketing/Footer.svelte -->
<script lang="ts">
	import { TwitterLogo, DiscordLogo, GithubLogo } from 'phosphor-svelte';

	const columns = [
		{ title: 'Product', links: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }] },
		{ title: 'Company', links: [{ label: 'About', href: '/about' }, { label: 'Careers', href: '/careers' }] },
		{ title: 'Legal', links: [{ label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }] }
	];
</script>

<footer class="border-t border-white/10 bg-[#121016] py-16">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid grid-cols-2 gap-10 sm:grid-cols-4">
			<div class="col-span-2 sm:col-span-1">
				<div class="flex items-center gap-2">
					<img src="/favicon.svg" alt="Colbe" class="h-7 w-7 rounded-[15px]" />
					<span class="font-semibold text-white">Colbe</span>
				</div>
				<p class="mt-3 text-sm text-zinc-500">Built like blocks.</p>
				<div class="mt-4 flex gap-4">
					<a href="https://twitter.com" class="text-zinc-500 hover:text-white"><TwitterLogo size={18} /></a>
					<a href="https://discord.com" class="text-zinc-500 hover:text-white"><DiscordLogo size={18} /></a>
					<a href="https://github.com/Coal-Inc" class="text-zinc-500 hover:text-white"><GithubLogo size={18} /></a>
				</div>
			</div>

			{#each columns as col}
				<div>
					<h4 class="text-sm font-semibold text-white">{col.title}</h4>
					<ul class="mt-4 space-y-3">
						{#each col.links as link}
							<li><a href={link.href} class="text-sm text-zinc-500 hover:text-white">{link.label}</a></li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="mt-12 border-t border-white/10 pt-6 text-center text-xs text-zinc-600">
			© {new Date().getFullYear()} Coal-Inc. All rights reserved.
		</div>
	</div>
</footer>