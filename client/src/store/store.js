import Vue from "vue";
import Vuex from "vuex";

import userRepo from "./modules/userRepo";
import postsRepo from "./modules/postsRepo";

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		userRepo,
		postsRepo
	}
});

export default store;