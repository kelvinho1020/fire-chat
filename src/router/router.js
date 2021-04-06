import { createRouter, createWebHistory } from "vue-router";
import { projectAuth } from "../firebase/config";
import Welcome from "../views/Welcome.vue";
import Chatroom from "../views/Chatroom.vue";
import Update from "../views/Update.vue";
import Profile from "../views/Profile.vue";

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
		path: "/profile/:id",
		name: "Profile",
		component: Profile,
		beforeEnter: requireAuth,
		props: true,
	},
	{
		path: "/profile/:id/update",
		name: "Update",
		component: Update,
		beforeEnter: requireAuth,
		props: true,
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
