import { projectAuth, projectFirestore } from "./firebase/config";
export default {
	namespaced: true,
	state() {
		return {
			userCollection: null,
		};
	},
	mutations: {
		setUserCollection(state, payload) {
			state.userCollection = payload;
		},
	},
	actions: {
		async userCollectionDetect(context, payload) {
			const userId = projectAuth.currentUser.uid;

			let collectionRes = await projectFirestore
				.collection("user")
				.doc(userId)
				.get();
		},
	},
	getters: {
		getUserCollection(state) {
			return state.userCollection;
		},
	},
};
