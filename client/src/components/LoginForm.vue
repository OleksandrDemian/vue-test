<template>
    <div id="loginForm">
        <h1>Login</h1>
        <el-alert
                class="margin-s"
                v-if="error != null"
                title="Error"
                :description="error"
                right
                show-icon
                type="error"
        />
        <p v-if="info != null">{{info}}</p>
        <el-form @submit="onSubmit">
            <el-form-item label="Username">
                <el-input @keyup.enter.native="onSubmit" type="text" v-model="user.username"/>
            </el-form-item>
            <el-form-item label="Password">
                <el-input @keyup.enter.native="onSubmit" type="password" v-model="user.password"/>
            </el-form-item>

            <el-button v-loading.fullscreen.lock="loading" @click="onSubmit" type="primary">Login</el-button>
            <el-button @click="onRegister">Register</el-button>
        </el-form>
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
				this.login(this.user).then(() => {
					this.$router.push("/posts");
                });
            },
            onRegister: function (e) {
                e.preventDefault();
                e.stopPropagation();
				this.register(this.user).then(() => {
					this.$router.push("/posts");
				});
			},
			...mapActions([
				"login",
                "register"
			])
		},
		computed: mapState({
			error: state => state.userRepo.error,
            info: state => state.userRepo.info,
			loading: state => state.userRepo.loading
		})
	}
</script>

<style scoped>

</style>