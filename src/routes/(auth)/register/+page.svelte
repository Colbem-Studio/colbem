<script lang="ts">
	import AuthCard from '$lib/components/onboarding/AuthCard.svelte';
	import RegisterWizard from '$lib/components/onboarding/RegisterWizard.svelte';

	type ActionResult =
		| { type: 'redirect'; location: string }
		| { type: 'failure'; data?: { error?: string } }
		| { type: 'success'; data?: unknown }
		| { type: 'error'; error?: unknown };

	let error = $state('');
	let submitting = $state(false);

	async function handleSubmit(data: Record<string, string>) {
		if (submitting) return;
		submitting = true;
		error = '';

		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.set(key, value);
		}

		try {
			const res = await fetch('?/register', { method: 'POST', body: formData });
			const result = (await res.json()) as ActionResult;

			if (result.type === 'redirect') {
				window.location.href = result.location;
				return;
			}

			if (result.type === 'failure') {
				error = result.data?.error ?? 'Registration failed. Please check your details and try again.';
				return;
			}

			error = 'Registration failed. Please try again.';
		} finally {
			submitting = false;
		}
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