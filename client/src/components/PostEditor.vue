<template>
    <div id="post-editor">
        <input type="text" v-model="post.title">
        <input type="text" v-model="post.body">
        <el-button type="primary" @click="onSave">Add</el-button>
        <router-link to="/posts">
            <el-button type="primary">Back</el-button>
        </router-link>
    </div>
</template>

<script>
	import {mapGetters, mapActions} from "vuex";

	export default {
		name: "PostEditor",
		inject: ["postsService"],
		data() {
			return {
				post: {
					title: "",
					body: ""
				}
			}
		},

        computed: {
			...mapGetters([
				"userId"
			])
		},

		methods: {
			onSave: function () {
				this.savePost({
					post: this.post,
					userId: this.userId
				});
			},
            ...mapActions([
				"savePost"
            ])
		}
	}
</script>

<style scoped>

</style>