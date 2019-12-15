<template>
    <div id="post">
        <el-card>
            <div v-if="edit === false">
                <p>{{post.title}}</p>
                <p>{{post.body}}</p>
                <el-button @click="updatePost">Update</el-button>
            </div>
            <PostEditor v-if="edit === true" :post="editablePost" :insert="false" @edit-cancel="onEditCancel"></PostEditor>
        </el-card>
    </div>
</template>

<script>
	import PostEditor from "./PostEditor";
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
        methods: {
			updatePost: function () {
				this.editablePost = Object.assign({}, this.post);
				this.edit = true;
                //this.$router.push("/posteditor/" + this.post.id);
			},
            onEditCancel: function () {
                this.edit = false;
			}
        }
	}
</script>

<style scoped>
    #post {
        margin: 5vh;
    }
</style>