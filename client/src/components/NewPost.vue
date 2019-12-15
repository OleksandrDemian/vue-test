<template>
    <el-row :gutter="12">
        <el-col :span="12" :offset="6">
            <PostEditor :insert="true" @edit-cancel="onEditCancel" />
        </el-col>
    </el-row>
</template>

<script>
	import PostEditor from "./PostEditor";
	export default {
		name: "NewPost",
		components: {PostEditor},

        methods: {
			onEditCancel: function () {
                this.$router.push("/posts");
			}
        }
	}
</script>

<style scoped>

</style>