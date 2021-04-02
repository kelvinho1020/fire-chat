import { projectAuth } from "../firebase/config";
export default {
	state() {
		return {
			user: null,
			error: null,
		};
	},
	mutations: {
		setError(state, payload) {
			state.error = payload.error;
		},
		setUser(state, payload) {
			state.user = payload.user;
		},
	},
	actions: {
		async signup(context, payload) {
			try {
				context.commit("setError", { error: null });
				if (payload.displayName === "" || !payload.email.includes(".com") || !payload.email.includes("@")) {
					context.commit("setError", { error: "Please enter valid email and display name!" });
					return;
				}

				const res = await projectAuth.createUserWithEmailAndPassword(payload.email, payload.password);

				context.dispatch("userDetect");
				if (!res) {
					throw new Error("Could not complete the signup");
				}

				await res.user.updateProfile({ displayName: payload.displayName });
			} catch (err) {
				context.commit("setError", { error: err.message });
				console.log(err.message);
			}
		},
		async login(context, payload) {
			try {
				context.commit("setError", { error: null });
				const res = await projectAuth.signInWithEmailAndPassword(payload.email, payload.password);

				if (!res) {
					throw new Error("Could not login");
				}

				context.dispatch("userDetect");
			} catch (err) {
				context.commit("setError", { error: err.message });
				console.log(err.message);
			}
		},
		async logout(context) {
			try {
				context.commit("setError", { error: null });
				await projectAuth.signOut();

				context.dispatch("userDetect");
			} catch (err) {
				context.commit("setError", { error: err.message });
			}
		},
		userDetect(context) {
			let user = projectAuth.currentUser;
			// projectAuth.onAuthStateChanged(_user => {
			// 	user = _user;
			// });
			context.commit("setUser", { user });
			console.log("detected");
		},
	},
	getters: {
		getError(state) {
			return state.error;
		},
		getUser(state) {
			return state.user;
		},
	},
};
