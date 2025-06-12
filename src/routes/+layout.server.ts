import type {Post} from '$lib/types'

export async function load({fetch}) {
    const response = await fetch('/api/posts')
    const posts: Post[] = await response.json()

    const allCategories = posts.flatMap(post => post.categories)
    const uniqueCategories = [...new Set(allCategories)]

    return {
        posts,
        categories: uniqueCategories
    }
}
