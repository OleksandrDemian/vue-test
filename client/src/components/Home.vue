<template>
    <div id="posts">
        <el-menu mode="horizontal">
            <el-menu-item index="1">
                <router-link to="/posteditor">
                    <el-button type="primary">Create new post</el-button>
                </router-link>
            </el-menu-item>
            <el-menu-item index="2">
                <router-link v-if="connected === true" to="/chat">
                    <el-button type="primary">Chat</el-button>
                </router-link>
                <el-button v-else disabled type="primary">Cannot reach chat server</el-button>
            </el-menu-item>
            <el-menu-item index="3">
                <LogoutButton />
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
                        :closable="false"
                />
                <Post v-bind:key="post.id" v-for="post in posts" :post="post"></Post>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {mapState, mapGetters} from "vuex";
	import Post from "./Post";
	import LogoutButton from "./LogoutButton";

	export default {
		name: "Home",
		components: {LogoutButton, Post},

		computed: {
			...mapState({
                //reverse posts, so the newer is first
				posts: state => state.postsRepo.posts.reverse(),
                user: state => state.userRepo.user,
				connected: state => state.chatRepo.connected
			}),
            ...mapGetters([
				"userId",
                "hasUser"
            ]),
        },

        /*
        * check user after view creation.
        * if store has no user, reroute to login page
        * */
        created() {
			if(this.hasUser){
				if(!this.$ws.connected()){
					this.$ws.connect();
				}

				const userId = this.userId;
				this.$store.dispatch("loadPosts", userId);
            } else {
				this.$ws.disconnect();
				this.$router.push("/");
            }
		}
	}
</script>

<style scoped>

</style>