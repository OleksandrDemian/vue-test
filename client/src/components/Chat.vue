<template>
    <div id="chat">
        <el-row :gutter="12">
            <el-col :span="6">
                <ActiveUsers />
            </el-col>
            <el-col :span="12">
                <el-alert
                        class="margin-s"
                        v-if="messages.length < 1"
                        title="There is no messages"
                        description="Be first to write on this chat"
                        center
                        show-icon
                        type="info"
                        :closable="false"
                />

                <div v-else>
                    <Message v-bind:key="message.id" v-for="message in messages" :message="message" />
                    <hr />
                </div>

                <el-input v-model="message" @keyup.enter.native="sendMessage"></el-input>
                <el-button @click="sendMessage">Send</el-button>
                <el-button @click="closeChat">Close chat</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
	import Message from "./Message";
	import {mapState} from "vuex";
	import ActiveUsers from "./ActiveUsers";

	export default {
		name: "Chat",
		components: {ActiveUsers, Message},

        data: function(){
            return {
				message: ""
            }
        },

        created(){
			this.$ws.emit("join", this.user);
			this.$ws.emit("requestMessages");
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
				this.$ws.emit("leave");
                this.$router.push("/home");
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