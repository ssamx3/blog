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

<!-- Your persistent sidebar -->
<div class="fixed top-4 left-4 z-50 px-3 py-2 ">
<div class="px-3 py-2">
    <div class="flex flex-wrap justify-start bg-gray-100 py-10 px-2 w-60 rounded-xl overflow-y-auto ">
        <section class="flex flex-column">
            <ul class=".box flex-column flex-wrap">
                {#each data.posts as post}
                    <li class="px-1 py-1">
                        <a href={`/blog/${post.slug}`}>
                            <div class="bg-gray-100 rounded-md px-5 py-2 hover:bg-gray-200 transition hover:scale-105 hover:drop-shadow-xl hover:rotate-z-[-0.2deg] hover:rotate-x-20 ease-bounceback duration-250">
                                <p class="mt-2 text-md italic font-serif tracking-tight text-gray-950">{post.title}</p>
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
<!-- Page content -->
{@render children()}