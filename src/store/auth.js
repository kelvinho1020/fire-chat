import { projectAuth } from "../firebase/config";
export default {
	state() {
		return {
			error: null,
		};
	},
	mutations: {
		setError(state, payload) {
			state.error = payload.error;
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
				if (!res) {
					throw new Error("Could not complete the signup");
				}

				await res.user.updateProfile({ displayName: payload.displayName });
				console.log(res.user);
			} catch (err) {
				context.commit("setError", { error: err.message });
				console.log(err.message);
			}
		},
		async login(context, payload) {
			try {
				context.commit("setError", { error: null });
				const res = await projectAuth.signInWithEmailAndPassword(payload.email, payload.password);
				console.log(res);
			} catch (err) {
				context.commit("setError", { error: err.message });
				console.log(err.message);
			}
		},
	},
	getters: {
		getError(state) {
			return state.error;
		},
	},
};
