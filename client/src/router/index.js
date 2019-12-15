import Vue from 'vue'
import Router from "vue-router";

import Login from "../components/Login";
import Posts from "../components/Posts";
import NewPost from "../components/NewPost";
import Chat from "../components/Chat";

Vue.use(Router);

const routes = [
	{path: '/', component: Login},						//set default page to Login/Welcome
	{path: '/posts', component: Posts},					//user's posts list
	{path: '/posteditor', component: NewPost},			//post editor
	{path: '/chat', component: Chat}					//post editor
];

const router = new Router({
	routes
});

export default router;