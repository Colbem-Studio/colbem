<!-- src/lib/components/marketing/Hero.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import { Sparkle, ArrowRight } from 'phosphor-svelte';
</script>

<section class="w-full pt-40 pb-24 px-6 text-center bg-background">
	<div class="max-w-4xl mx-auto flex flex-col items-center gap-6">
		<span class="inline-flex items-center gap-2 px-4 py-1.5 text-sm text-primary bg-secondary rounded-[15px] border border-border">
			<Sparkle size={16} weight="fill" />
			Early access is open
		</span>

		<h1 class="text-5xl md:text-6xl font-bold text-foreground leading-tight">
			One home for every
			<span class="text-primary">conversation</span>, call, and community
		</h1>

		<p class="text-lg text-muted-foreground max-w-2xl">
			Colbe brings messaging, calls, and communities into a single, fast platform — built for groups that actually want to stick around.
		</p>

		<div class="flex flex-col sm:flex-row items-center gap-4 mt-4">
			<a href={resolve('/register')} class="flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 transition-opacity rounded-[15px]">
				Create your space
				<ArrowRight size={16} weight="bold" />
			</a>
			<a href={resolve('/discover')} class="px-6 py-3 text-sm font-medium text-foreground bg-secondary hover:bg-accent transition-colors rounded-[15px] border border-border">
				Discover communities
			</a>
		</div>
	</div>
</section>