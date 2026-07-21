<!-- src/routes/+error.svelte -->
<!-- Required by SvelteKit at this location to catch unmatched routes (true 404s). -->
<!-- Actual UI lives in $lib/components/errors/PlatformError.svelte -->
<script lang="ts">
	import { page } from '$app/state';
	import PlatformError from '$lib/components/errors/PlatformError.svelte';
</script>

<PlatformError status={page.status} message={page.error?.message} />