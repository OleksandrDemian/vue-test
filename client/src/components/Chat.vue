<template>
    <div id="chat">
        <Message v-bind:key="message.id" v-for="message in messages" :message="message" />
        <hr />
        <el-input v-model="message" @keyup.enter.native="sendMessage"></el-input>
        <el-button @click="sendMessage">Send</el-button>
        <el-button @click="closeChat">Close chat</el-button>
    </div>
</template>

<script>
	import Message from "./Message";
	import {mapState} from "vuex";

	export default {
		name: "Chat",
		components: {Message},

        data: function(){
            return {
				message: ""
            }
        },

        methods: {
			sendMessage: function () {
				const { username, id } = this.user;
                this.$ws.emit("message", {
                    text: this.message,
					username,
                    userId: id
                });

                this.message = "";
			},
			closeChat: function () {
                this.$router.push("/posts");
			}
        },

        computed: {
			...mapState({
                messages: state => state.chatRepo.messages,
                user: state => state.userRepo.user
            })
        }
	}
</script>

<style scoped>

</style>