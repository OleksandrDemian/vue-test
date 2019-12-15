import Vue from 'vue'

import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import router from "@/router";
import store from "./store/store";
import WebSocket from "./plugins/WebSocket";

Vue.config.productionTip = false;

Vue.use(Element);
Vue.use(WebSocket, { store });

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
