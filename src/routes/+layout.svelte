<script lang="ts">
    import {formatDate} from '$lib/utils'
    import * as config from '$lib/config'
    import {onNavigate} from '$app/navigation';
    import {onMount} from 'svelte';
    import '../app.css';

    let {data, children} = $props()
    let sidebarVisible = $state(true);

    function handleKeydown(event: KeyboardEvent) {
        // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            sidebarVisible = !sidebarVisible
        }
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    });

    onNavigate((navigation) => {
        if (!document.startViewTransition) return;

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
</script>

<svelte:head>
    <title>{config.title}</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
</svelte:head>

<div class="flex min-h-screen">

    <!-- Sidebar -->
    <div class="fixed top-4 bottom-4 left-4 w-60 rounded-xl py-4 sidebar transition-all duration-300 ease-in-out-quad"
         class:translate-x-[-110%]={!sidebarVisible}>
        <div class="h-full border border-gray-200 bg-gradient-to-b from-indigo-50 to-purple-100  rounded-lg p-2">
            <div class="h-full overflow-y-auto scrollbar-hide">
                <section>
                    <ul class="box flex-column flex-wrap">
                        {#if data.tag}
                        <div class="rounded-md px-5 inset-shadow-white/20 inset-shadow-sm py-2 flex flex-row justify-between items-center">
                            <p class="mt-2 text-md italic font-serif tracking-tight text-gray-600 truncate text-ellipsis">&nbsp;/posts/{data.tag}</p>
                            <button class="text-gray-600 font-serif " on:click={()=>sidebarVisible = !sidebarVisible}>
                                x
                            </button>
                        </div>
                    {/if}

                    {#if !data.tag}
                        <div class="rounded-md px-5 inset-shadow-white/20 inset-shadow-sm py-2 flex flex-row justify-between items-center">
                            <p class="mt-2 text-md italic font-serif tracking-tight text-gray-600 truncate text-ellipsis">&nbsp;/posts</p>
                            <button class="text-gray-600 font-serif " on:click={()=>sidebarVisible = !sidebarVisible}>
                                x
                            </button>
                        </div>

                    {/if}


                        {#each data.posts as post}
                            <li class="px-1 py-2">
                                <a href={`/blog/${post.slug}`}>
                                    <div class="hover:bg-white/40  inset-shadow-white/30  inset-shadow-sm rounded-md px-5 py-2  transition hover:scale-105 hover:rotate-z-[-0.5deg] hover:rotate-x-20 ease-bounceback duration-250">
                                        <p class="mt-2 text-md italic font-serif tracking-tight text-gray-950 truncate text-ellipsis">{post.title}</p>
                                        <p class="pmt-2 max-w-lg text-xs text-gray-400 max-lg:">{formatDate(post.date)}</p>
                                    </div>
                                </a>
                            </li>
                        {/each}
                    </ul>
                </section>
            </div>
        </div>
    </div>

        <button class="fixed top-100  h-10 w-7 flex items-center justify-center
                       bg-gradient-to-b from-indigo-50 to-purple-100 text-gray-600 font-serif text-lg rounded-r-lg
                       transition duration-300 font:serif ease-in-out z-50 " class:translate-x-[-210%]={sidebarVisible}
                on:click={()=>sidebarVisible = !sidebarVisible}>
            >
        </button>

    <!-- Main content -->
    <main class="flex-1 transition-all duration-300 ease-in-out"
          class:ml-72={sidebarVisible}
          class:ml-4={!sidebarVisible}>
        {@render children()}
    </main>
</div>
