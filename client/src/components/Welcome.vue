<template>
    <div id="welcome">
        <h1>Welcome {{user.username}}</h1>
        <router-link to="/home">
            <el-button type="primary">Go to dashboard</el-button>
        </router-link>
        <LogoutButton />
    </div>
</template>

<script>
	import {mapState} from "vuex";
	import LogoutButton from "./LogoutButton";

	export default {
		name: "Welcome",
		components: {LogoutButton},
		computed: mapState({
			user: state => state.userRepo.user
		})
	}
</script>

<style scoped>

</style>