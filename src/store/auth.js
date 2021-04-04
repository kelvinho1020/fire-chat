import { projectAuth } from "../firebase/config";
import { projectFirestore } from "../firebase/config";
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

				const authRes = await projectAuth.createUserWithEmailAndPassword(payload.email, payload.password);

				await projectFirestore
					.collection("user")
					.doc(authRes.user.uid)
					.set({ ...payload, isLogin: true, url: "", id: authRes.user.uid });

				if (!authRes) {
					throw new Error("Could not complete the signup");
				}

				await authRes.user.updateProfile({ displayName: payload.displayName });
			} catch (err) {
				throw new Error(err.message);
			}
		},
		async login(context, payload) {
			try {
				const authRes = await projectAuth.signInWithEmailAndPassword(payload.email, payload.password);
				const userId = context.getters.getUser.uid;

				await projectFirestore
					.collection("user")
					.doc(userId)
					.update({ isLogin: true });

				if (!authRes) {
					throw new Error("Could not login");
				}
			} catch (err) {
				throw new Error(err.message);
			}
		},
		async logout(context) {
			try {
				const userId = context.getters.getUser.uid;

				await projectFirestore
					.collection("user")
					.doc(userId)
					.update({ isLogin: false });

				await projectAuth.signOut();

			} catch (err) {
				throw new Error(err.message);
			}
		},
		userDetect(context) {
			let user = projectAuth.currentUser;
			context.commit("setUser", { user });

			console.log("detected");
		},
	},
	getters: {
		getUser(state) {
			return state.user;
		},
	},
};
