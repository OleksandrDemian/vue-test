<template>
    <div id="posts">
        <router-link to="/posteditor">
            <el-button type="primary">Create new post</el-button>
        </router-link>
        <p v-bind:key="post.id" v-for="post in posts">{{post.title}}</p>
    </div>
</template>

<script>
    import {mapState, mapGetters} from "vuex";

	export default {
		name: "posts",

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