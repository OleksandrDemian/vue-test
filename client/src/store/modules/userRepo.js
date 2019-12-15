import userService from "../../services/userService";

export const SET_USER = "setUser";
export const SET_ERROR = "setError";
export const SET_INFO = "setInfo";
export const CLEAR_MESSAGES = "clearMessages";

export const LOGIN = "login";
export const REGISTER = "register";
export const LOGOUT ="logout";
export const SET_LOADING ="setLoading";

const LAST_STORED_USER_ID = "last_stored_user_id";

function lastUser() {
	const storedUserId = localStorage.getItem(LAST_STORED_USER_ID);
	if(storedUserId == null){
		return null;
	} else {
		return Number(storedUserId);
	}
}

function storeUserId(userId) {
	localStorage.setItem(LAST_STORED_USER_ID, userId);
}

export default {
	state: {
		user: null,
		error: null,
		info: null,
		loading: false
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
		[SET_LOADING](state, enable = true) {
			state.loading = enable;
		},
		[CLEAR_MESSAGES](state) {
			state.error = null;
			state.info = null;
		}
	},
	actions: {
		async [LOGIN]({ commit }, {username, password}) {
			commit(SET_LOADING);
			try {
				const user = await userService.login(username, password);
				commit(CLEAR_MESSAGES);
				commit(SET_USER, user);
				storeUserId(user.id);
			} catch (e) {
				commit(SET_ERROR, e.message);
				throw e;
			} finally {
				commit(SET_LOADING, false);
			}
		},

		async [REGISTER]({ commit }, {username, password}){
			commit(SET_LOADING);
			try {
				const user = await userService.saveUser({
					username, password
				});
				commit(CLEAR_MESSAGES);
				commit(SET_USER, user);
				storeUserId(user.id);
			} catch (e) {
				commit(SET_ERROR, e.message);
				throw e;
			} finally {
				commit(SET_LOADING, false);
			}
		},

		async loadLastUser({ commit }){
			try {
				const userId = lastUser();
				if(userId != null && !isNaN(userId)){
					commit(SET_LOADING);
					const user = await userService.getUser(userId);
					commit(SET_USER, user);
				}
			} catch (e) {
				throw e;
			} finally {
				commit(SET_LOADING, false);
			}
		},

		[LOGOUT]({ commit }){
			commit(SET_USER, null);
			storeUserId(null);
		}
	},
	getters: {
		userId(state) {
			return state.user.id;
		},
		hasUser(state){
			return state.user != null;
		}
	}
}