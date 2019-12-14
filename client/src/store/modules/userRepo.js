import userService from "../../services/userService";

export default {
	state: {
		user: null,
		error: null
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		setError(state, error) {
			state.error = error;
		},
		clearErrors(state) {
			state.error = null;
		}
	},
	actions: {
		async login({commit}, {username, password}) {
			try {
				const user = await userService.login(username, password);
				commit("clearErrors");
				commit("setUser", user);
			} catch (e) {
				commit("setError", e.message);
			}
		},

		logout({ commit }){
			commit("setUser", null);
		}
	}
}