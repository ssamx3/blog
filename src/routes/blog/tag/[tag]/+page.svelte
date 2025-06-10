<script lang="ts">
    import {formatDate} from '$lib/utils'
    import * as config from '$lib/config'
    import {onNavigate} from '$app/navigation';

    let {data} = $props()

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

<div class="flex flex-wrap justify-start">
    <section class="flex flex-row flex-wrap">

        <ul class=".box flex flex-row flex-wrap ">
            {#each data.posts as post}

                <li class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0 ">
                    <a href={`/blog/${post.slug}`}>
                        <div class="bg-purple-300/30 inset-shadow-sm/40 inset-shadow-violet-400 rounded-xl px-10 py-20 hover:bg-purple-300/50 transition hover:scale-105 hover:drop-shadow-xl hover:rotate-z-[-1deg] hover:rotate-x-20 ease-bounceback duration-250 w-70 h-100 ">
                            <p
                                    class="mt-2 text-xl italic  font-serif tracking-tight text-gray-950">{post.title}</p>
                            <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:">{formatDate(post.date)}</p>
                            <p class="break-words whitespace-normal line-clamp-none text-sm/6">{post.description}</p>
                        </div>
                    </a>
                </li>
            {/each}
        </ul>
    </section>
</div>

