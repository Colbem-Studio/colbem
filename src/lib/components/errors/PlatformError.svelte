<!-- src/lib/components/errors/PlatformError.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import { GhostIcon, House } from 'phosphor-svelte';

	let { status, message }: { status: number; message?: string } = $props();

	const isNotFound = $derived(status === 404);
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
	<GhostIcon size={48} class="text-primary" />

	<h1 class="text-4xl font-bold text-foreground">
		{status}
	</h1>

	<p class="max-w-md text-sm text-muted-foreground">
		{#if isNotFound}
			This page doesn't exist. It may have been moved, deleted, or the link might be broken.
		{:else}
			{message ?? 'Something went wrong. Please try again.'}
		{/if}
	</p>

	<a
		href={resolve('/')}
		class="mt-2 flex items-center gap-2 rounded-[15px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
	>
		<House size={14} />
		Back home
	</a>
</div>