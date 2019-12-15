<template>
    <el-form label-position="left">
        <el-form-item label="Title">
            <el-input type="text" v-model="post.title" />
        </el-form-item>
        <el-form-item label="Body">
            <el-input type="text" v-model="post.body" />
        </el-form-item>

        <el-button type="primary" @click="onSave">{{ insert ? "Save" : "Update" }}</el-button>
        <el-button type="primary" @click="onCancel">Cancel</el-button>
    </el-form>
</template>

<script>
	import {mapGetters, mapActions} from "vuex";

	export default {
		name: "PostEditor",
		inject: ["postsService"],
		props: {
			insert: {
				type: Boolean,
                default() {
					return true;
				}
			},
			post: {
				type: Object,
                default() {
					return { title: "", body: "" }
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
				this.onCancel();
			},
            onCancel: function () {
                this.$emit("edit-cancel");
			},
            ...mapActions([
				"savePost"
            ])
		}
	}
</script>

<style scoped>

</style>