<template>
    <div id="login">
        <el-row :gutter="12">
            <el-col :span="12" :offset="6">
                <LoginForm v-if="user == null"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
	import {mapState} from "vuex";
	import LoginForm from "./LoginForm";

	export default {
		components: {LoginForm},
		computed: mapState({
			user: state => state.userRepo.user
		})
	}
</script>

<style scoped>

</style>