<template>
    <div id="post-editor">
        <input type="text" v-model="post.title">
        <input type="text" v-model="post.body">
        <button @click="savePost">Salva</button>
    </div>
</template>

<script>
    export default {
        name: "PostEditor",
        inject: [ "postsService" ],
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
        methods: {
            savePost: function() {
                this.postsService.savePost(this.post, 15);
            }
        }
    }
</script>

<style scoped>

</style>