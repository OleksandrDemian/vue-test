<template>
    <div id="post">
        <p>{{post.title}}</p>
        <p>{{post.body}}</p>
        <el-button @click="updatePost">Update</el-button>
    </div>
</template>

<script>
	export default {
		name: "Post",

        props: {
			post: Object
        },
        methods: {
			updatePost: function () {
                this.$router.push("/posteditor/" + this.post.id);
			}
        }
	}
</script>

<style scoped>

</style>