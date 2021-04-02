import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import VueObserveVisibility from "vue-observe-visibility";
import { projectAuth } from "./firebase/config";

let app;
projectAuth.onAuthStateChanged(() => {
	if (!app) {
		app = createApp(App)
			.use(store)
			.use(router)
			.use(VueObserveVisibility)
			.mount("#app");
	}
});
