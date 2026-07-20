<!-- src/routes/(auth)/register/+page.svelte -->
<script lang="ts">
	import AuthCard from '$lib/components/onboarding/AuthCard.svelte';
	import RegisterWizard from '$lib/components/onboarding/RegisterWizard.svelte';

	let error = $state('');

	async function handleSubmit(data: Record<string, string>) {
		error = '';
		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.set(key, value);
		}

		// TODO: confirm this matches your +page.server.ts action name
		const res = await fetch('?/register', { method: 'POST', body: formData });
		if (!res.ok) {
			error = 'Registration failed. Please check your details and try again.';
			return;
		}
		window.location.href = '/';
	}
</script>

<svelte:head>
	<title>Registration - Colbe</title>
</svelte:head>

<AuthCard title="Sign up and start having fun!">
	<RegisterWizard onsubmit={handleSubmit} />
	{#if error}
		<p class="text-center text-sm text-destructive">{error}</p>
	{/if}
</AuthCard>