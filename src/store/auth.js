import { projectAuth } from "../firebase/config";
import { projectFirestore } from "../firebase/config";
export default {
	state() {
		return {
			user: null,
			userCollection: null,
		};
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload.user;
		},
		setUserCollection(state, payload) {
			state.userCollection = payload;
		},
	},
	actions: {
		async signup(context, payload) {
			try {
				if (payload.displayName === "" || !payload.email.includes(".com") || !payload.email.includes("@")) {
					throw new Error("Please enter valid email and display name!");
				}

				const authRes = await projectAuth.createUserWithEmailAndPassword(payload.email, payload.password);
				if (!authRes) {
					throw new Error("Could not complete the signup");
				}

				await projectFirestore
					.collection("user")
					.doc(authRes.user.uid)
					.set({ ...payload, isLogin: true, url: "", id: authRes.user.uid, filePath: "" });


				await authRes.user.updateProfile({ displayName: payload.displayName });
			} catch (err) {
				throw new Error(err.message);
			}
		},
		async login(context, payload) {
			try {
				const authRes = await projectAuth.signInWithEmailAndPassword(payload.email, payload.password);
				if (!authRes) {
					throw new Error("Could not login");
				}

				if (projectAuth.currentUser) {
					const userId = projectAuth.currentUser.uid;
					await projectFirestore
						.collection("user")
						.doc(userId)
						.update({ isLogin: true });
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
		async userDetect(context) {
			let user = projectAuth.currentUser;

			context.commit("setUser", { user });
			console.log("detected");

			if (user) {
				const userRef = await projectFirestore
					.collection("user")
					.doc(user.uid)
					.get();

				const userCollection = userRef.data();
				context.commit("setUserCollection", userCollection);
			}
		},
	},
	getters: {
		getUser(state) {
			return state.user;
		},
		getUserCollection(state) {
			return state.userCollection;
		},
	},
};
