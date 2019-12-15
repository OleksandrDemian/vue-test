<template>
    <div id="activeUsers">
        <p v-bind:key="user.id" v-for="user in users">
            <el-badge is-dot :type="user.active ? 'primary' : 'danger'">
                {{user.username}}
            </el-badge>
        </p>
    </div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "ActiveUsers",

		computed: {
			...mapState({
				users: state => state.chatRepo.users
			})
		}
	}
</script>

<style scoped>

</style>