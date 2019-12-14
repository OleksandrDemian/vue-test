<template>
    <div id="posts">
        <p>posts</p>
    </div>
</template>

<script>
export default {
    inject: [ "postsService" ],
    mounted() {
        // console.log(this.postsService.getUserPosts(15));
    }
}
</script>

<style scoped>

</style>