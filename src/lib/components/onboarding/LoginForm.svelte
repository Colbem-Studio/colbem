<!-- src/lib/components/onboarding/LoginForm.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import { Label } from 'bits-ui';

	let { identifier = $bindable(''), password = $bindable(''), onsubmit }: {
		identifier: string;
		password: string;
		onsubmit: (e: SubmitEvent) => void;
	} = $props();
</script>

<form {onsubmit} class="flex flex-col gap-4">
	<div class="flex flex-col gap-2">
		<Label.Root for="identifier" class="text-sm text-muted-foreground">Username or email</Label.Root>
		<input
			id="identifier"
			type="text"
			bind:value={identifier}
			class="rounded-[15px] border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
		/>
	</div>

	<div class="flex flex-col gap-2">
		<Label.Root for="password" class="text-sm text-muted-foreground">Password</Label.Root>
		<input
			id="password"
			type="password"
			bind:value={password}
			class="rounded-[15px] border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none focus:border-primary transition-colors"
		/>
	</div>

	<button type="submit" class="mt-2 rounded-[15px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
		Login
	</button>

	<p class="text-center text-sm text-muted-foreground">
		Don't have an account?
		<a href={resolve('/register')} class="text-primary hover:underline">Register</a>
	</p>
</form>