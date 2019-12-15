<template>
    <div id="login">
        <el-row :gutter="12">
            <el-col :span="12" :offset="6">
                <LoginForm v-if="user == null"/>
                <Welcome v-if="user != null"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
	import {mapActions, mapState} from "vuex";
	import LoginForm from "./LoginForm";
	import Welcome from "./Welcome";

	export default {
		components: {Welcome, LoginForm},
		computed: mapState({
			user: state => state.userRepo.user
		}),
        mounted: function () {
			this.loadLastUser();
        },
        methods: {
			...mapActions([
                "loadLastUser"
            ])
        }
	}
</script>

<style scoped>

</style>