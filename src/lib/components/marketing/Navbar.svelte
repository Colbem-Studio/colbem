<script lang="ts">
    import { resolve } from '$app/paths';
    import { DropdownMenu, Dialog } from 'bits-ui';
    import { List, X, ChatCircleDots, Phone, UsersThree } from 'phosphor-svelte';
    import ToggleTheme from '$lib/components/shared/ToggleTheme.svelte';

    interface RouteProps {
        href: string;
        label: string;
    }
    interface FeatureProps {
        icon: typeof ChatCircleDots;
        title: string;
        description: string;
    }

    const routeList: RouteProps[] = [
        { href: '#how-it-works', label: 'How it works' },
        { href: '#style', label: 'Style' },
        { href: '#pricing', label: 'Pricing' }
    ];

    const featureList: FeatureProps[] = [
        { icon: ChatCircleDots, title: 'Instant DMs', description: 'Fast, reliable messaging that stays in sync everywhere.' },
        { icon: Phone, title: 'Crystal-clear calls', description: 'Voice and video that just works, no dropped connections.' },
        { icon: UsersThree, title: 'Communities', description: 'Servers with channels, roles, and permissions that scale.' }
    ];

    let isOpen = $state(false);
</script>

<header class="w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-7xl top-5 mx-auto sticky z-40 rounded-[15px] flex justify-between items-center p-2 bg-[#1a1720]/90 backdrop-blur-md shadow-md">
    <a href={resolve('/')} class="font-bold text-lg flex items-center gap-2 text-white">
        <img src="/thumbnail/Colbe.png" alt="Colbe" class="h-9 w-9 rounded-[15px]" />
        Colbe
    </a>

    <div class="flex items-center lg:hidden">
        <button onclick={() => (isOpen = true)} aria-label="Open menu" class="text-white">
            <List size={22} />
        </button>

        <Dialog.Root bind:open={isOpen}>
            <Dialog.Portal>
                <Dialog.Overlay class="fixed inset-0 z-50 bg-black/60" />
                <Dialog.Content class="fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between rounded-tr-[15px] rounded-br-[15px] bg-[#1a1720] p-5">
                    <div>
                        <div class="mb-6 flex items-center justify-between">
                            <a href={resolve('/')} class="flex items-center gap-2 text-white">
                                <img src="/thumbnail/Colbe.png" alt="Colbe" class="h-9 w-9 rounded-[15px]" />
                                <span class="font-bold text-lg">Colbe</span>
                            </a>
                            <Dialog.Close class="text-zinc-500 hover:text-white">
                                <X size={20} />
                            </Dialog.Close>
                        </div>

                        <div class="flex flex-col gap-1">
                            {#each routeList as { href, label } (href)}
                                <a href={resolve('/') + href} onclick={() => (isOpen = false)} class="rounded-[10px] px-3 py-2 text-base text-zinc-300 hover:bg-white/5 hover:text-white">
                                    {label}
                                </a>
                            {/each}
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 pt-4">
                        <ToggleTheme />
                        <a href={resolve('/login')} class="rounded-full bg-white/5 px-4 py-2 text-center text-sm text-zinc-300 hover:bg-white/10 hover:text-white">
                            Log in
                        </a>
                        <a href={resolve('/register')} class="rounded-full bg-blue-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-400">
                            Register
                        </a>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    </div>

    <div class="hidden lg:flex items-center gap-1">
        <DropdownMenu.Root>
            <DropdownMenu.Trigger class="rounded-[10px] px-3 py-2 text-base text-zinc-300 hover:bg-white/5 hover:text-white data-[state=open]:bg-white/5 data-[state=open]:text-white">
                Features
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content class="z-50 w-110 rounded-[15px] bg-[#1a1720] p-3 shadow-xl" sideOffset={8}>
                    <div class="flex flex-col gap-1">
                        {#each featureList as { icon, title, description } (title)}
                            {@const Icon = icon}
                            <DropdownMenu.Item class="flex items-start gap-3 rounded-[10px] p-3 outline-none data-highlighted:bg-blue-500/10">
                                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-blue-500/10">
                                    <Icon size={18} class="text-blue-400" />
                                </div>
                                <div>
                                    <p class="mb-1 text-sm font-semibold leading-none text-white">{title}</p>
                                    <p class="text-sm text-zinc-500">{description}</p>
                                </div>
                            </DropdownMenu.Item>
                        {/each}
                    </div>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>

        {#each routeList as { href, label } (href)}
            <a href={resolve('/') + href} class="rounded-[10px] px-3 py-2 text-base text-zinc-300 hover:bg-white/5 hover:text-white">
                {label}
            </a>
        {/each}
    </div>

    <div class="hidden lg:flex items-center gap-2">
        <ToggleTheme />
        <a href={resolve('/login')} class="rounded-full px-4 py-2 text-sm text-zinc-300 hover:text-white">Log in</a>
        <a href={resolve('/register')} class="rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400">Register</a>
    </div>
</header>