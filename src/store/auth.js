import { projectAuth, projectFirestore, projectDatabase } from "../firebase/config";
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
					.set({ ...payload, url: "", id: authRes.user.uid, filePath: "", description: "" });

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
			} catch (err) {
				throw new Error(err.message);
			}
		},
		async logout(context) {
			const userId = projectAuth.currentUser.uid;
			const userRef = projectDatabase.ref("users/" + userId);
			userRef.remove();
			try {
				await projectAuth.signOut();
			} catch (err) {
				throw new Error(err.message);
			}
		},
		async userDetect(context) {
			let user = projectAuth.currentUser;

			context.commit("setUser", { user });
			console.log("detected");

			try {
				const userRef = await projectFirestore
					.collection("user")
					.doc(user.uid)
					.get();
				const userCollection = userRef.data();
				// console.log(userCollection);
				context.commit("setUserCollection", userCollection);
			} catch (err) {
				console.log(err.message);
			}
		},
		async userCollectionDetect(context, payload) {
			try {
				const userRef = await projectFirestore
					.collection("user")
					.doc(payload)
					.get();
				const userCollection = userRef.data();
				context.commit("setUserCollection", userCollection);
			} catch (err) {
				console.log(err.message);
			}
		},
		async allUserCollection(context,payload){
			try {
				const userRef = await projectFirestore
					.collection("user")
					.get();

				console.log(userRef)
				const userCollection = userRef.data();

				context.commit("setUserCollection", userCollection);
			} catch (err) {
				console.log(err.message);
			}
		}
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
