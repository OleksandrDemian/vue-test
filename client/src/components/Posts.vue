<template>
    <div id="posts">
        <router-link to="/posteditor">
            <el-button type="primary">Create new post</el-button>
        </router-link>
        <Post v-bind:key="post.id" v-for="post in posts" :post="post"></Post>
    </div>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
	import Post from "./Post";

	export default {
		name: "posts",
		components: {Post},
		computed: {
			...mapState({
				posts: state => state.postsRepo.posts
			}),
            ...mapGetters([
				"userId"
            ])
        },

        created() {
			const userId = this.userId;
			this.$store.dispatch("loadPosts", userId);
		}
	}
</script>

<style scoped>

</style>