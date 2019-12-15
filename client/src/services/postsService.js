function getPosts() {
	let posts = localStorage.getItem("posts");
	if (posts != null)
		return JSON.parse(posts);
	return [];
}

function storePosts(posts) {
	localStorage.setItem("posts", JSON.stringify(posts));
}

function mergePosts(posts, newEntry) {
	for(let i = 0; i < posts.length; i++){
		if(posts[i].id === newEntry.id){
			posts[i] = newEntry;
			break;
		}
	}
}

export default {
	savePost(post, userId) {
		const posts = getPosts();
		const entry = Object.assign(post, { owner: userId });

		if(entry.id == null){
			entry.id = new Date().getTime();
			posts.push(entry);
		} else {
			mergePosts(posts, entry);
		}

		storePosts(posts);
	},

	getUserPosts(userId) {
		const posts = getPosts();
		const arr = [];

		for (let i = 0; i < posts.length; i++) {
			const post = posts[i];
			if (post.owner === userId) {
				arr.push(post);
			}
		}

		return arr;
	}
}