<!-- src/routes/(auth)/login/+page.svelte -->
<script lang="ts">
	import AuthCard from '$lib/components/onboarding/AuthCard.svelte';
	import LoginForm from '$lib/components/onboarding/LoginForm.svelte';

	let identifier = $state('');
	let password = $state('');
	let error = $state('');
	let submitting = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (submitting) return;
		submitting = true;
		error = '';

		const formData = new FormData();
		formData.set('identifier', identifier);
		formData.set('password', password);

		try {
			const res = await fetch('?/login', { method: 'POST', body: formData });
			const result = await res.json();

			if (result.type === 'redirect') {
				window.location.href = result.location;
				return;
			}

			if (result.type === 'failure') {
				error = result.data?.error ?? 'Login failed. Check your credentials and try again.';
				return;
			}

			error = 'Login failed. Please try again.';
		} finally {
			submitting = false;
		}
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