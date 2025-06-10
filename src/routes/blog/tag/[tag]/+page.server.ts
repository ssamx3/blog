import type { Post } from '$lib/types'


async function getFilteredPosts(tag: string) {
    let posts: Post[] = []

    const paths = import.meta.glob('/src/posts/*.md', {eager: true})

    for (const path in paths) {
        const file = paths[path]
        const slug = path.split('/').at(-1)?.replace('.md', '')

        if (file && typeof file == 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata as Omit<Post, 'slug'>
            const post = {...metadata, slug} satisfies Post
            posts.push(post)
        }
    }

    posts = posts.sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
    )
    posts = posts.filter(post => post.categories.includes(tag))

    return posts

}

export async function load({params}) {
    const tag = params.tag
    const posts = await getFilteredPosts(tag)
    return { posts,
    tag}
}
