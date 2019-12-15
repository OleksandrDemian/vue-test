<template>
    <el-button id="logoutBtn" type="danger" @click="onLogout">Logout from '{{user.username}}'</el-button>
</template>

<script>
	import {mapState} from "vuex";

	export default {
		name: "LogoutButton",
		computed: {
			...mapState({
				user: state => state.userRepo.user
			}),
		},
		methods: {
			onLogout: function() {
				this.$store.dispatch("logout");
				this.$router.push("/");
			}
		},
	}
</script>

<style scoped>

</style>