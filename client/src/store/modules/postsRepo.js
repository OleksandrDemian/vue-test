import postsService from "../../services/postsService";

export const SET_POSTS = "setPosts";
export const LOAD_POSTS = "loadPosts";
export const SAVE_POST = "savePost";

export default {
	state: {
		posts: []
	},

	mutations: {
		[SET_POSTS](state, posts){
			state.posts = posts;
		}
	},

	actions: {
		async [LOAD_POSTS]({ commit }, userId){
			const posts = await postsService.getUserPosts(userId);
			commit(SET_POSTS, posts);
		},
		async [SAVE_POST]({ commit }, {post, userId}){
			postsService.savePost(post, userId);
			const newPosts = postsService.getUserPosts(userId);
			commit(SET_POSTS, newPosts);
		}
	}
}