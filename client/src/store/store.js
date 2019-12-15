import Vue from "vue";
import Vuex from "vuex";

import userRepo from "./modules/userRepo";
import postsRepo from "./modules/postsRepo";
import chatRepo from "./modules/chatRepo";

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		userRepo,
		postsRepo,
		chatRepo
	}
});

export default store;