import {json} from "@sveltejs/kit";
import {getPosts} from "$lib/server/getPosts";

export async function GET() {
    const posts = await getPosts()
    return json(posts)
}