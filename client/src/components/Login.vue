<template>
    <div id="login">
        <LoginForm v-if="user == null"/>
        <Welcome v-if="user != null"/>
    </div>
</template>

<script>
	import {mapState} from "vuex";
	import LoginForm from "./LoginForm";
	import Welcome from "./Welcome";

	export default {
		components: {Welcome, LoginForm},
		computed: mapState({
			user: state => state.userRepo.user
		})
	}
</script>

<style scoped>

</style>