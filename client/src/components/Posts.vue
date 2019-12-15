<template>
    <div id="posts">
        <el-menu mode="horizontal">
            <el-menu-item index="1">
                <router-link to="/posteditor">
                    <el-button type="primary">Create new post</el-button>
                </router-link>
            </el-menu-item>
            <el-menu-item index="3">
                <el-button @click="logout">Logout from {{user.username}}</el-button>
            </el-menu-item>
        </el-menu>
        <el-row :gutter="12">
            <el-col :span="12" :offset="6">
                <el-alert
                        class="margin-s"
                        v-if="posts.length < 1"
                        title="There is no posts"
                        description="Click 'Create new post' to add someone"
                        center
                        show-icon
                        type="info"
                        :closable="false">
                </el-alert>
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
				posts: state => state.postsRepo.posts.reverse(),
                user: state => state.userRepo.user
			}),
            ...mapGetters([
				"userId"
            ]),
        },

        methods: {
			logout: function() {
				this.$store.dispatch("logout");
				this.$router.push("/");
			}
        },

        created() {
			const userId = this.userId;
			this.$store.dispatch("loadPosts", userId);
		}
	}
</script>

<style scoped>

</style>