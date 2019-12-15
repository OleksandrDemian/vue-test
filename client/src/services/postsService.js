const DEFAULT_POST = {
	title: "",		//post's title
	body: "",		//post's body
	owner: null,	//who created post
	removed: false	//flag, if true, post would not be seen from app
};

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

function updatePost(post) {
	const posts = getPosts();
	mergePosts(posts, post);
	storePosts(posts);
}

function initPost(post, input) {
	return Object.assign({}, DEFAULT_POST, post, input);
}

export default {
	savePost(post, userId) {
		const posts = getPosts();
		const entry = initPost(post, {
			owner: userId
		});

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
			if (post.owner === userId && !post.removed) {
				arr.push(post);
			}
		}

		return arr;
	},

	deletePost(postId) {
		const posts = getPosts();

		for (let i = 0; i < posts.length; i++) {
			const post = posts[i];
			if (post.id === postId) {
				//mark post as removed instead of deleting, so it can be recovered in future
				post.removed = true;
				updatePost(post);
				return true;
			}
		}

		throw new Error("Post: " + postId + " not found!")
	}
}