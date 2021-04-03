import { projectAuth } from "../firebase/config";
export default {
	state() {
		return {
			user: null,
		};
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload.user;
		},
	},
	actions: {
		async signup(context, payload) {
			try {
				if (payload.displayName === "" || !payload.email.includes(".com") || !payload.email.includes("@")) {
					throw new Error("Please enter valid email and display name!");
				}

				const res = await projectAuth.createUserWithEmailAndPassword(payload.email, payload.password);

				context.dispatch("userDetect");
				if (!res) {
					throw new Error("Could not complete the signup");
				}

				await res.user.updateProfile({ displayName: payload.displayName });
			} catch (err) {
				throw new Error(err.message);
			}
		},
		async login(context, payload) {
			try {
				const res = await projectAuth.signInWithEmailAndPassword(payload.email, payload.password);

				if (!res) {
					throw new Error("Could not login");
				}

				context.dispatch("userDetect");
			} catch (err) {
				throw new Error(err.message);
			}
		},
		async logout(context) {
			try {
				await projectAuth.signOut();
				context.dispatch("userDetect");
			} catch (err) {
				throw new Error(err.message);
			}
		},
		userDetect(context) {
			let user = projectAuth.currentUser;
			// projectAuth.onAuthStateChanged(_user => {
			// 	user = _user;
			// });
			context.commit("setUser", { user });
		},
	},
	getters: {
		getUser(state) {
			return state.user;
		},
	},
};
