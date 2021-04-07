import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BaseSpinner from "./components/ui/BaseSpinner.vue";

library.add(fas);
import { projectAuth } from "./firebase/config";

let app;
projectAuth.onAuthStateChanged(() => {
	if (!app) {
		app = createApp(App)
			.use(store)
			.use(router)
			.component("BaseSpinner", BaseSpinner)
			.component("font-awesome-icon", FontAwesomeIcon)
			.mount("#app");
	}
});
