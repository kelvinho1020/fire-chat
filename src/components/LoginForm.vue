<template>
	<form @submit.prevent="handleSubmit">
		<input type="email" placeholder="email" v-model="email" required />
		<input type="password" placeholder="password" v-model="password" required />
		<button>Log in</button>
		<p v-if="!formIsValid" class="error">{{ error }}</p>
	</form>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
	emit: ["login"],
	setup(props, context) {
		// Vue stuff
		const store = useStore();

		// Variables
		const email = ref("");
		const password = ref("");
		const formIsValid = ref(true);
		const error = ref("");

		// Login
		const handleSubmit = async () => {
			formIsValid.value = true;
			error.value = "";
			try {
				await store.dispatch("login", {
					email: email.value,
					password: password.value,
				});
				context.emit("login");
			} catch (err) {
				console.log(err)
				formIsValid.value = false;
				error.value = err.message;
			}
		};

		return { email, password, handleSubmit, formIsValid, error };
	},
};
</script>

<style></style>
