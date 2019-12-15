import Vue from 'vue'

import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import router from "@/router";
import store from "./store/store";
import WebSocket from "./plugins/WebSocket";
import handler from "./handlers/wsChatHandler";

Vue.config.productionTip = false;

Vue.use(Element);
Vue.use(WebSocket, {
	handler: handler({ store })
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
