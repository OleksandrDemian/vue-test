import userService from "../../services/userService";

export const SET_USER = "setUser";
export const SET_ERROR = "setError";
export const SET_INFO = "setInfo";
export const CLEAR_MESSAGES = "clearMessages";

export const LOGIN = "login";
export const REGISTER = "register";
export const LOGOUT ="logout";

export default {
	state: {
		user: null,
		error: null,
		info: null
	},
	mutations: {
		[SET_USER](state, user) {
			state.user = user;
		},
		[SET_ERROR](state, error) {
			state.error = error;
		},
		[SET_INFO](state, info) {
			state.info = info;
		},
		[CLEAR_MESSAGES](state) {
			state.error = null;
			state.info = null;
		}
	},
	actions: {
		async [LOGIN]({ commit }, {username, password}) {
			try {
				const user = await userService.login(username, password);
				commit(CLEAR_MESSAGES);
				commit(SET_USER, user);
			} catch (e) {
				commit(SET_ERROR, e.message);
			}
		},

		async [REGISTER]({ commit }, {username, password}){
			try {
				const user = await userService.saveUser({
					username, password
				});
				commit(CLEAR_MESSAGES);
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