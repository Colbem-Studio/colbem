<!-- src/lib/components/onboarding/RegisterWizard.svelte -->
<script lang="ts">
	import DatePickerField from './DatePickerField.svelte';
	import UsernameStep from './UsernameStep.svelte';
	import PhoneVerifyStep from './PhoneVerifyStep.svelte';

	let { onsubmit }: { onsubmit: (data: Record<string, string>) => void } = $props();

	let step = $state(1);
	let month = $state('');
	let day = $state('');
	let year = $state('');
	let email = $state('');
	let username = $state('');
	let password = $state('');
	let phone = $state('');
	let code = $state('');
	let codeSent = $state(false);

	function next() {
		step += 1;
	}

	function back() {
		step -= 1;
	}

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (step < 3) {
			next();
			return;
		}
		onsubmit({ email, month, day, year, username, password, phone, code });
	}
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-4">
	{#if step === 1}
		<DatePickerField bind:month bind:day bind:year />
	{:else if step === 2}
		<UsernameStep bind:email bind:username bind:password />
	{:else if step === 3}
		<PhoneVerifyStep bind:phone bind:code bind:codeSent />
	{/if}

	<div class="mt-2 flex gap-3">
		{#if step > 1}
			<button type="button" onclick={back} class="flex-1 rounded-[15px] bg-secondary px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">
				Back
			</button>
		{/if}
		<button type="submit" class="flex-1 rounded-[15px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
			{step < 3 ? 'Continue' : 'Sign up'}
		</button>
	</div>
</form>