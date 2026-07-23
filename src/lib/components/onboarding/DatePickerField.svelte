<!-- src/lib/components/onboarding/DatePickerField.svelte -->
<script lang="ts">
	import { CaretDown } from 'phosphor-svelte';
	import { Select, Label } from 'bits-ui';
	import { validateAge } from '$lib/client/username-rules.js';

	let { month = $bindable(''), day = $bindable(''), year = $bindable('') }: {
		month: string;
		day: string;
		year: string;
	} = $props();

	const months = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	].map((label, i) => ({ value: String(i + 1), label }));
	const days = Array.from({ length: 31 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }));
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 100 }, (_, i) => ({
		value: String(currentYear - i),
		label: String(currentYear - i)
	}));

	const ageError = $derived.by(() => {
		if (!month || !day || !year) return null;
		const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
		const result = validateAge(birthDate);
		return result.valid ? null : result.reason;
	});
</script>

<div class="flex flex-col gap-2">
	<Label.Root class="text-sm text-muted-foreground">Birthday</Label.Root>
	<div class="grid grid-cols-3 gap-2">
		<Select.Root type="single" bind:value={month}>
			<Select.Trigger class="flex items-center justify-between rounded-[15px] border border-border bg-secondary px-3 py-2.5 text-sm text-foreground">
				{months.find((m) => m.value === month)?.label ?? 'Month'}
				<CaretDown size={14} class="text-muted-foreground" />
			</Select.Trigger>
			<Select.Portal>
				<Select.Content class="rounded-[15px] border border-border bg-card p-1 shadow-lg">
					{#each months as m (m.value)}
						<Select.Item value={m.value} label={m.label} class="rounded-[10px] px-3 py-2 text-sm text-foreground hover:bg-secondary">
							{m.label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Portal>
		</Select.Root>

		<Select.Root type="single" bind:value={day}>
			<Select.Trigger class="flex items-center justify-between rounded-[15px] border border-border bg-secondary px-3 py-2.5 text-sm text-foreground">
				{day || 'Day'}
				<CaretDown size={14} class="text-muted-foreground" />
			</Select.Trigger>
			<Select.Portal>
				<Select.Content class="max-h-60 overflow-y-auto rounded-[15px] border border-border bg-card p-1 shadow-lg">
					{#each days as d (d.value)}
						<Select.Item value={d.value} label={d.label} class="rounded-[10px] px-3 py-2 text-sm text-foreground hover:bg-secondary">
							{d.label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Portal>
		</Select.Root>

		<Select.Root type="single" bind:value={year}>
			<Select.Trigger class="flex items-center justify-between rounded-[15px] border border-border bg-secondary px-3 py-2.5 text-sm text-foreground">
				{year || 'Year'}
				<CaretDown size={14} class="text-muted-foreground" />
			</Select.Trigger>
			<Select.Portal>
				<Select.Content class="max-h-60 overflow-y-auto rounded-[15px] border border-border bg-card p-1 shadow-lg">
					{#each years as y (y.value)}
						<Select.Item value={y.value} label={y.label} class="rounded-[10px] px-3 py-2 text-sm text-foreground hover:bg-secondary">
							{y.label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	</div>
	{#if ageError}
		<p class="text-xs text-destructive">{ageError}</p>
	{/if}
</div>