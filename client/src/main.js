import Vue from 'vue'

import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import postsService from "./services/postsService";
import userService from "./services/userService";
import router from "@/router";
import store from "./store/store";

Vue.config.productionTip = false;

Vue.use(Element);

new Vue({
	router,
	store,
	provide: () => ({
		postsService,
		userService
	}),
	render: h => h(App)
}).$mount('#app');
