<!-- src/lib/components/onboarding/UsernameStep.svelte -->
<script lang="ts">
	import { Label } from 'bits-ui';

	let { email = $bindable(''), username = $bindable(''), password = $bindable('') }: {
		email: string;
		username: string;
		password: string;
	} = $props();
</script>

<div class="flex flex-col gap-2">
	<Label.Root for="email" class="text-sm text-muted-foreground">Email</Label.Root>
	<input
		id="email"
		type="email"
		bind:value={email}
		placeholder="you@example.com"
		class="rounded-[15px] border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
	/>
</div>

<div class="flex flex-col gap-2">
	<Label.Root for="username" class="text-sm text-muted-foreground">Username</Label.Root>
	<input
		id="username"
		type="text"
		bind:value={username}
		placeholder="Don't use your real name"
		class="rounded-[15px] border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
	/>
</div>

<div class="flex flex-col gap-2">
	<Label.Root for="password" class="text-sm text-muted-foreground">Password</Label.Root>
	<input
		id="password"
		type="password"
		bind:value={password}
		placeholder="At least 8 characters"
		class="rounded-[15px] border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
	/>
</div>