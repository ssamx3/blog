import { json} from "@sveltejs/kit";
import type { Post } from '$lib/Post'

async function getPosts() {
    let posts: Post[] = []

    const paths = import.meta.glob('src/posts/*.md', {eager: true})

    for(const path in paths) {
        const file = paths[path]
        const slug =  path.split('/').at(-1)?.replace('.md', '')
    }
    }