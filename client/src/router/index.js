import Vue from 'vue'
import Router from "vue-router";

import Login from "../components/Login";
import Posts from "../components/Posts";
import PostEditor from "../components/PostEditor";

Vue.use(Router);

const routes = [
	{path: '/', component: Login},                        //set default page to Login/Welcome
	{path: '/posts', component: Posts},                   //user's posts list
	{path: '/posteditor/:postid?', component: PostEditor}  //post editor
];

const router = new Router({
	routes
});

export default router;