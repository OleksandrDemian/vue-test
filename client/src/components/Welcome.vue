<template>
    <div id="welcome">
        <h1>Welcome {{user.username}}</h1>
        <router-link to="/posts">
            <el-button type="primary">Go to dashboard</el-button>
        </router-link>
    </div>
</template>

<script>
	import {mapState} from "vuex";

	export default {
		name: "Welcome",

		computed: mapState({
			user: state => state.userRepo.user
		})
	}
</script>

<style scoped>

</style>