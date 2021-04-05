import { projectFirestore } from "../firebase/config";
export default {
	namespaced: true,
	state() {
		return {
			message: [],
		};
	},
	mutations: {
		setMessage(state, payload) {
			state.message = payload;
		},
	},
	actions: {
		async addDoc(context, payload) {
			try {
				await projectFirestore.collection("message").add(payload);
			} catch (err) {
				throw new Error("Could not send the message");
			}
		},
	},
	getters: {
		getMessage(state) {
			return state.message;
		},
	},
};
