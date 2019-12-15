<template>
    <div id="chat">
        <Message v-bind:key="message.id" v-for="message in messages" :message="message" />
    </div>
</template>

<script>
	import Message from "./Message";
	import {mapState} from "vuex";

	export default {
		name: "Chat",
		components: {Message},

        computed: {
			...mapState({
                messages: state => {
                    return state.chatRepo.messages;
                }
            })
        }
	}
</script>

<style scoped>

</style>