<script lang="ts">
    import {formatDate} from '$lib/utils'
    import * as config from '$lib/config'
    import {onNavigate} from '$app/navigation';
    import { fade, scale, fly } from 'svelte/transition'

    let {data} = $props()
    let showCats = $state('true');

    function toggleVisible() {
        showCats = !showCats
    }

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



<header class="inset-shadow-purple-200 inset-shadow-sm justify-center items-center bg-purple-50/30 m-1 p-1 rounded-2xl text-purple-300  flex-wrap flex-row mx-auto py-2 max-w-2xl items-center text-center justify-center" class:blur-sm={!showCats}>

    <h1 class="px-1.5 py-2 font-serif text-xl text-purple-200">home</h1>
</header>

<div class="flex flex-wrap justify-start" class:blur-sm={!showCats}>


    <section class="flex flex-row flex-wrap">

        <ul class=".box flex flex-row flex-wrap ">
            {#each data.posts as post}

                <li class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0 ">
                    <a href={`/blog/${post.slug}`}>
                        <div class=" inset-shadow-sm/50 bg-purple-200/10 inset-shadow-purple-300 rounded-2xl px-10 py-20 hover:bg-purple-300/10 transition hover:scale-105 hover:drop-shadow-xl hover:rotate-z-[-1deg] hover:rotate-x-20 ease-bounceback duration-250 w-70 h-100 ">
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

