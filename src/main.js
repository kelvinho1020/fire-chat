import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";

import { projectAuth } from "./firebase/config";

let app;
projectAuth.onAuthStateChanged(() => {
	if (!app) {
		app = createApp(App)
			.use(store)
			.use(router)
			.mount("#app");
	}
});
