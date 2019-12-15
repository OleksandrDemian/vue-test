<template>
    <div id="post">
        <el-card>
            <div v-if="edit === false">
                <p>{{post.title}}</p>
                <p>{{post.body}}</p>
                <el-button @click="onUpdatePost" type="primary" icon="el-icon-edit" circle></el-button>
                <el-button @click="onDeletePost" type="danger" icon="el-icon-delete" circle></el-button>
            </div>
            <PostEditor v-if="edit === true" :post="editablePost" :insert="false" @edit-cancel="onEditCancel"></PostEditor>
        </el-card>
    </div>
</template>

<script>
	import PostEditor from "./PostEditor";
	import { mapGetters, mapActions } from "vuex";
	export default {
		name: "Post",
		components: {PostEditor},
		data() {
			return {
				edit: false,
				editablePost: null
            }
        },

        props: {
			post: Object
        },

		computed: {
			...mapGetters([
				"userId"
			])
		},

        methods: {
			onUpdatePost: function () {
				this.editablePost = Object.assign({}, this.post);
				this.edit = true;
			},
            onEditCancel: function () {
                this.edit = false;
			},
			onDeletePost: function () {
                this.deletePost({
                    postId: this.post.id,
                    userId: this.userId
                });
			},
            ...mapActions([
                "deletePost"
            ])
        }
	}
</script>

<style scoped>
    #post {
        margin: 5vh;
    }
</style>