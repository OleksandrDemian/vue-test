import Vue from 'vue'
import Router from "vue-router";

import HelloWorldVue from "../components/HelloWorldVue";
import Login from "../components/Login";
import Posts from "../components/Posts";
import PostEditor from "../components/PostEditor";

Vue.use(Router);

//<router-link to="/foo">Go to Foo</router-link>
//<router-link to="/bar">Go to Bar</router-link>

/* ROUTING */
const routes = [
    { path: '/', component: HelloWorldVue },
    { path: '/login', component: Login },
    { path: '/posts', component: Posts },
    { path: '/posteditor', component: PostEditor }
];

const router = new Router({
    routes
});

export default router;