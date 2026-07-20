<!-- src/routes/(auth)/login/+page.svelte -->
<script lang="ts">
	import AuthCard from '$lib/components/onboarding/AuthCard.svelte';
	import LoginForm from '$lib/components/onboarding/LoginForm.svelte';

	let identifier = $state('');
	let password = $state('');
	let error = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		const formData = new FormData();
		formData.set('identifier', identifier);
		formData.set('password', password);

		// TODO: confirm this matches your +page.server.ts action name
		const res = await fetch('?/login', { method: 'POST', body: formData });
		if (!res.ok) {
			error = 'Login failed. Check your credentials and try again.';
			return;
		}
		window.location.href = '/';
	}
</script>

<svelte:head>
	<title>Log in to Colbe</title>
</svelte:head>

<AuthCard title="Log in to Colbe">
	<LoginForm bind:identifier bind:password onsubmit={handleSubmit} />
	{#if error}
		<p class="text-center text-sm text-destructive">{error}</p>
	{/if}
</AuthCard>