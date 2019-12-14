<template>
    <div id="loginForm">
        <h1>Login</h1>
        <p v-if="error != null">Error: {{error}}</p>
        <form @submit="login(user)">
            <input type="text" v-model="user.username" />
            <br />
            <input type="password" v-model="user.password" />
            <br />
            <button type="submit">Login</button>
            <button @click="saveUser">Register</button>
        </form>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";

    export default {
        inject: [ "userService" ],
        data: () => ({
            user: {
                username: "",
                password: ""
            }
        }),
        methods: {
            saveUser: function () {
                const {username, password} = this;
                this.userService.saveUser({
                    username, password
                });
            },
            ...mapActions([
                "login"
            ])
        },
        computed: mapState({
            error: state => {
                return state.userRepo.error;
            }
        })
    }
</script>

<style scoped>

</style>