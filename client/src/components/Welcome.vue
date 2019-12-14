<template>
    <div id="welcome">
        <h1>Welcome {{user.username}}</h1>
        <el-button type="primary">
            <router-link to="/posts">Go to dashboard</router-link>
        </el-button>
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