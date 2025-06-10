import {json} from "@sveltejs/kit";
import {getFilteredPosts} from "$lib/server/getFilteredPosts";

export async function GET(tag) {
    const posts = await getFilteredPosts(tag)
    return json(posts)
}