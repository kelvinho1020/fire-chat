import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Chatroom from "../views/Chatroom.vue";
import Profile from "../views/Profile.vue";
import { projectAuth } from "../firebase/config";

const requireAuth = (to, form, next) => {
	let user = projectAuth.currentUser;
	if (!user) {
		next({ name: "Welcome" });
	} else next();
};

const requireNoAuth = (to, form, next) => {
	let user = projectAuth.currentUser;
	if (user) {
		next({ name: "Chatroom" });
	} else next();
};

const routes = [
	{
		path: "/",
		name: "Welcome",
		component: Welcome,
		beforeEnter: requireNoAuth,
	},
	{
		path: "/chatroom",
		name: "Chatroom",
		component: Chatroom,
		beforeEnter: requireAuth,
	},
	{
		path: "/profile",
		name: "Profile",
		component: Profile,
		beforeEnter: requireAuth,
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
