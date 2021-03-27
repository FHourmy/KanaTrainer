import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../screens/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/drawing",
		name: "Drawing",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../screens/DrawingTraining.vue")
	},
	{
		path: "/identify",
		name: "Identify",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: Home
	},
	{
		path: "/IdentifyAndDraw",
		name: "IdentifyAndDraw",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: Home
	}
];

const router = new VueRouter({
	routes
});

export default router;
