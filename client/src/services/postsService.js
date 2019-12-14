function getPosts() {
    let posts = localStorage.getItem("posts");
    if(posts != null)
        return JSON.parse(posts);
    return [];
}

function storePosts(posts) {
    localStorage.setItem("posts", JSON.stringify(posts));
}

export default {
    savePost(post, userId){
        const posts = getPosts();
        posts.push({
            owner: userId,
            data: post
        });
        storePosts(posts);
    },

    getUserPosts(userId){
        const posts = getPosts();
        const arr = [];

        for(let i = 0; i < posts.length; i++){
            const post = posts[i];
            if(post.owner === userId){
                arr.push(post.data);
            }
        }

        return arr;
    }
}