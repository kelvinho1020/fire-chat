import { projectFirestore } from "../firebase/config";
export default {
	namespaced: true,
	state() {
		return {
			message: [],
			isScroll: true,
		};
	},
	mutations: {
		setMessage(state, payload) {
			state.message = payload;
		},
		setIsScroll(state, payload) {
			state.isScroll = payload;
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
		toggleIsScroll(context, payload) {
			context.commit("setIsScroll", payload);
		},
	},
	getters: {
		getMessage(state) {
			return state.message;
		},
		getIsScroll(state) {
			return state.isScroll;
		},
	},
};
