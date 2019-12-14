<template>
    <div id="post-editor">
        <input type="text" v-model="post.title">
        <input type="text" v-model="post.body">
        <el-button type="primary" @click="savePost">Add</el-button>
        <router-link to="/posts">
            <el-button type="primary">Back</el-button>
        </router-link>
    </div>
</template>

<script>
	import {mapGetters} from "vuex";

	export default {
		name: "PostEditor",
		inject: ["postsService"],
		props: {
			post: {
				type: Object,
				default() {
					return {
						title: "",
						body: ""
					}
				}
			}
		},

        computed: {
			...mapGetters([
				"userId"
			])
		},

		methods: {
			savePost: function () {
				this.postsService.savePost(this.post, this.userId);
			}
		}
	}
</script>

<style scoped>

</style>