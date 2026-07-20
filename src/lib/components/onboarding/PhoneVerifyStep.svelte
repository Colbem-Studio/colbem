<!-- src/lib/components/onboarding/PhoneVerifyStep.svelte -->
<script lang="ts">
	import { ShieldCheck } from 'phosphor-svelte';
	import { PinInput, Label } from 'bits-ui';

	let { phone = $bindable(''), code = $bindable(''), codeSent = $bindable(false) }: {
		phone: string;
		code: string;
		codeSent: boolean;
	} = $props();

	let sending = $state(false);
	let sendError = $state('');

	async function sendCode() {
		sending = true;
		sendError = '';
		try {
			// TODO: confirm actual console.colbe.cc endpoint + payload shape
			const res = await fetch('https://console.colbe.cc/api/verify/send', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ phone })
			});
			if (!res.ok) throw new Error('Failed to send code');
			codeSent = true;
		} catch (err) {
			sendError = err instanceof Error ? err.message : 'Something went wrong';
		} finally {
			sending = false;
		}
	}
</script>

<div class="flex flex-col gap-2">
	<Label.Root for="phone" class="text-sm text-muted-foreground">Phone number</Label.Root>
	<div class="flex gap-2">
		<input
			id="phone"
			type="tel"
			bind:value={phone}
			placeholder="Enter your phone number"
			disabled={codeSent}
			class="flex-1 rounded-[15px] border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors disabled:opacity-60"
		/>
		{#if !codeSent}
			<button
				type="button"
				onclick={sendCode}
				disabled={!phone || sending}
				class="shrink-0 rounded-[15px] bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
			>
				{sending ? 'Sending...' : 'Send code'}
			</button>
		{/if}
	</div>
	{#if sendError}
		<p class="text-xs text-destructive">{sendError}</p>
	{/if}
</div>

{#if codeSent}
	<div class="flex flex-col gap-2">
		<Label.Root class="flex items-center gap-1.5 text-sm text-muted-foreground">
			<ShieldCheck size={14} />
			Verification code
		</Label.Root>
		<PinInput.Root bind:value={code} maxlength={6} class="flex gap-2">
			{#snippet children({ cells })}
				{#each cells as cell (cell)}
					<div class="flex h-11 w-11 items-center justify-center rounded-[15px] border border-border bg-secondary text-sm text-foreground">
						{cell.char}
					</div>
				{/each}
			{/snippet}
		</PinInput.Root>
	</div>
{/if}