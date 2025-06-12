<script lang="ts">
    import {formatDate} from '$lib/utils'
    import * as config from '$lib/config'
    import {onNavigate} from '$app/navigation';
    import '../app.css';

    let {data, children} = $props()

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


<!-- Your persistent sidebar   -->

<div class="fixed top-4 bottom-4 left-4  w-60 rounded-xl py-4 sidebar" style="view-transition-name: none;">
    <div class="h-full bg-gray-100 rounded-xl p-2 ">
        <div class="h-full overflow-y-auto scrollbar-hide">
            <section>
                <ul class="box flex-column flex-wrap">
                    {#each data.posts as post}
                        <li class="px-1 py-1">
                            <a href={`/blog/${post.slug}`}>
                                <div class="rounded-md px-5 py-2 bg-gray-100 hover:bg-gray-200 transition hover:scale-105 hover:rotate-z-[-0.2deg] hover:rotate-x-20 ease-bounceback duration-250">
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

{@render children()}