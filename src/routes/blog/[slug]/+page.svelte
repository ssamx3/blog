<script lang="ts">
    import {formatDate} from '$lib/utils'
    import {onNavigate} from '$app/navigation';

    let {data} = $props()

    onNavigate((navigation) => {
        if (!document.startViewTransition) return;

        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.viewTransitionName = 'none';
        }

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
</script>

<svelte:head>
    <title>{data.meta.title}</title>
    <meta content="article" property="og:type"/>
    <meta content={data.meta.title} property="og:title"/>
</svelte:head>

<div class="mx-auto px-4 py-12 max-w-2xl">

    <article>
        <hgroup>
            <h1 class="px-1.5 py-2 font-serif text-4xl italic">{data.meta.title}</h1>
            <p class="px-1.5 font-serif text-gray-400">{formatDate(data.meta.date)}</p>
        </hgroup>


        <div class="py-2">
            <a href="/." class="inline-flex inset-shadow-purple-200 inset-shadow-sm justify-center items-center bg-white-300/40 m-1 p-1 px-1.5 border-2 border-purple-100 rounded-xl text-purple-300 hover:rotate-z-1 hover:scale-120 transition duration-300 ease-bounceback"
                    >←
            </a>
            {#each data.meta.categories as category}
                <a href="/blog/tag/{category}" class="inline-flex inset-shadow-purple-200 inset-shadow-sm justify-center items-center bg-purple-300/30 m-1 p-1 border-2 border-purple-200 rounded-xl text-purple-300 hover:rotate-z-1 hover:scale-120 transition duration-300 ease-bounceback">
                    &num;{category}
                </a>
            {/each}
        </div>

        <div class="flex items-center rounded-full w-full h-14">
            <div class="flex-1 border-gray-300 border-b"></div>
        </div>


        <div class="px-1.5">
            <div class="prose">
                <data.content/>
            </div>
        </div>
    </article>
</div>