<template>
    <div id="app">
        <div v-if="user != null">
            <el-button @click="logout">Logout from {{user.username}}</el-button>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
	import {mapState} from "vuex";

	export default {
		name: 'app',

		computed: mapState({
			user: state => state.userRepo.user
		}),

		methods: {
			logout: function() {
				this.$store.dispatch("logout");
				this.$router.push("/");
            }
		}
	}
</script>

<style>

</style>
