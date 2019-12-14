import userService from "../../services/userService";

export const SET_USER = "setUser";
export const SET_ERROR = "setError";
export const CLEAR_ERRORS = "clearErrors";

export const LOGIN = "login";
export const LOGOUT ="logout";

export default {
	state: {
		user: null,
		error: null
	},
	mutations: {
		[SET_USER](state, user) {
			state.user = user;
		},
		[SET_ERROR](state, error) {
			state.error = error;
		},
		[CLEAR_ERRORS](state) {
			state.error = null;
		}
	},
	actions: {
		async [LOGIN]({commit}, {username, password}) {
			try {
				const user = await userService.login(username, password);
				commit(CLEAR_ERRORS);
				commit(SET_USER, user);
			} catch (e) {
				commit(SET_ERROR, e.message);
			}
		},

		[LOGOUT]({ commit }){
			commit(SET_USER, null);
		}
	},
	getters: {
		userId(state) {
			return state.user.id;
		}
	}
}