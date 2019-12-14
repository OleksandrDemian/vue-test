<template>
    <div id="loginForm">
        <h1>Login</h1>
        <p v-if="error != null">Error: {{error}}</p>
        <p v-if="info != null">{{info}}</p>
        <form @submit="onSubmit">
            <input type="text" v-model="user.username"/>
            <br/>
            <input type="password" v-model="user.password"/>
            <br/>
            <button type="submit">Login</button>
            <button @click="onRegister">Register</button>
        </form>
    </div>
</template>

<script>
	import {mapState, mapActions} from "vuex";

	export default {
		data: () => ({
			user: {
				username: "",
				password: ""
			}
		}),
		methods: {
			onSubmit: function(e) {
				e.preventDefault();
				e.stopPropagation();
				this.login(this.user);
            },
            onRegister: function (e) {
                e.preventDefault();
                e.stopPropagation();
				this.register(this.user);
			},
			...mapActions([
				"login",
                "register"
			])
		},
		computed: mapState({
			error: state => state.userRepo.error,
            info: state => state.userRepo.info
		})
	}
</script>

<style scoped>

</style>