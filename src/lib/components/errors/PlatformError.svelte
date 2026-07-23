<!-- src/lib/components/errors/PlatformError.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import { GhostIcon, House } from 'phosphor-svelte';

	let { status, message }: { status: number; message?: string } = $props();

	// Official-style error codes — mirrors the "Error Code: XXX" pattern
	// used by platforms colbe for quick support reference.
	const ERROR_MESSAGES: Record<number, string> = {
		400: 'The request was malformed and could not be processed.',
		401: 'You need to be signed in to view this page.',
		403: "You don't have permission to access this page.",
		404: "This page doesn't exist. It may have been moved, deleted, or the link might be broken.",
		408: 'The request took too long to respond. Please try again.',
		429: "You're doing that too much. Please wait a moment and try again.",
		500: 'Something went wrong on our end. Our team has been notified.',
		502: 'We had trouble reaching one of our services. Please try again shortly.',
		503: 'This service is temporarily unavailable. Please try again in a few minutes.',
		504: 'The server took too long to respond. Please try again.'
	};

	const displayMessage = $derived(message ?? ERROR_MESSAGES[status] ?? 'Something went wrong. Please try again.');
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
	<GhostIcon size={48} class="text-primary" />

	<h1 class="text-4xl font-bold text-foreground">
		{status}
	</h1>

	<p class="max-w-md text-sm text-muted-foreground">
		{displayMessage}
	</p>

	<p class="text-xs text-muted-foreground/60">
		Error Code: {status}
	</p>

	<a href={resolve('/')} class="mt-2 flex items-center gap-2 rounded-[15px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
		<House size={14} />
		Back home
	</a>
</div>