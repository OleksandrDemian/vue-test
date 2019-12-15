<template>
    <div id="posts">
        <el-row :gutter="12">
            <el-col :span="12" :offset="6">
                <router-link to="/posteditor">
                    <el-button type="primary">Create new post</el-button>
                </router-link>

                <Post v-bind:key="post.id" v-for="post in posts" :post="post"></Post>
            </el-col>
        </el-row>
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
                //reverse posts, so the newer is first
				posts: state => state.postsRepo.posts.reverse()
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