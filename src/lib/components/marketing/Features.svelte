<!-- src/lib/components/marketing/Features.svelte -->
<script lang="ts">
	import { ChatCircleDots, VideoCamera, Broadcast, ShieldCheck, BellSimple, Plus } from 'phosphor-svelte';
	import { Accordion } from 'bits-ui';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';

	const isMobile = new IsMobile();

	const smallFeatures = [
		{ icon: VideoCamera, title: 'Video calls', body: 'Group calls over WebRTC, directly from a channel or DM.' },
		{ icon: Broadcast, title: 'Live channels', body: 'One channel, everyone in the community sees it update in real time.' },
		{ icon: ShieldCheck, title: 'Role-based permissions', body: 'Server-side control over who can post, mute, or manage a channel.' },
		{ icon: BellSimple, title: 'Notification routing', body: 'Mentions and DMs are prioritized separately from general channel activity.' }
	];

	const showcaseFeatures = [
		{ icon: ChatCircleDots, title: 'Messaging', body: 'Real-time delivery over a persistent connection.' },
		{ icon: VideoCamera, title: 'Voice & video', body: 'WebRTC calls, peer-to-peer where possible.' },
		{ icon: Broadcast, title: 'Live channels', body: 'Updates pushed instantly to every member.' },
		{ icon: ShieldCheck, title: 'Permissions', body: 'Roles enforced server-side, not client-side.' },
		{ icon: BellSimple, title: 'Notifications', body: 'Mentions surfaced ahead of general activity.' }
	];

	const doubledShowcase = [...showcaseFeatures, ...showcaseFeatures];
</script>

<section id="features" class="mx-auto w-[90%] max-w-7xl py-20">
	<div class="mb-10 max-w-2xl">
		<span class="inline-flex items-center rounded-[15px] border border-border bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
			Features
		</span>
		<h2 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
			Everything a chat platform needs.
		</h2>
	</div>

	<div class="mb-10 overflow-hidden rounded-[15px] border border-border bg-card">
		<div class="flex items-center gap-3 border-b border-border p-5">
			<div class="flex h-10 w-10 items-center justify-center rounded-[10px] bg-secondary">
				<ChatCircleDots size={20} class="text-primary" />
			</div>
			<div>
				<h3 class="font-semibold text-foreground">See Colbe in motion</h3>
				<p class="text-sm text-muted-foreground">A look at what's actually in the platform.</p>
			</div>
		</div>

		{#if isMobile.current}
			<div class="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3">
				{#each showcaseFeatures as { icon, title, body } (title)}
					{@const Icon = icon}
					<div class="rounded-[15px] border border-border bg-secondary p-4">
						<Icon size={20} class="text-primary" />
						<p class="mt-3 text-sm font-semibold text-foreground">{title}</p>
						<p class="mt-1 text-xs text-muted-foreground">{body}</p>
					</div>
				{/each}
			</div>
		{:else}
			<div class="marquee-mask overflow-hidden py-6">
				<div class="marquee-track marquee-left flex w-max gap-4">
					{#each doubledShowcase as { icon, title, body }, idx (idx)}
						{@const Icon = icon}
						<div class="h-32 w-56 shrink-0 rounded-[15px] border border-border bg-secondary p-4">
							<Icon size={20} class="text-primary" />
							<p class="mt-3 text-sm font-semibold text-foreground">{title}</p>
							<p class="mt-1 text-xs text-muted-foreground">{body}</p>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<Accordion.Root type="single" class="flex flex-col gap-3">
		{#each smallFeatures as { icon, title, body } (title)}
			{@const Icon = icon}
			<Accordion.Item value={title} class="overflow-hidden rounded-[15px] border border-border bg-card">
				<Accordion.Header>
					<Accordion.Trigger class="group flex w-full items-center gap-3 p-5 text-left">
						<div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-secondary">
							<Icon size={18} class="text-primary" />
						</div>
						<span class="flex-1 font-semibold text-foreground">{title}</span>
						<Plus size={16} class="text-muted-foreground transition-transform group-data-[state=open]:rotate-45" />
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content class="px-5 pb-5 pl-17">
					<p class="text-sm text-muted-foreground">{body}</p>
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
</section>

<style>
	.marquee-mask {
		mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
	}

	.marquee-track {
		animation-name: scroll-left;
		animation-duration: 35s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}

	.marquee-track:hover {
		animation-play-state: paused;
	}

	@keyframes scroll-left {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
</style>