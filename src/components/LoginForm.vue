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
		const error = computed(() => store.getters.getError);

		const handleSubmit = async () => {
			// Login
			formIsValid.value = true;

			await store.dispatch("login", {
				email: email.value,
				password: password.value,
			});

			if (error.value) formIsValid.value = false;
			else context.emit("login");
		};

		return { email, password, handleSubmit, formIsValid, error };
	},
};
</script>

<style></style>
