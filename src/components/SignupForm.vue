<template>
	<form @submit.prevent="handleSubmit">
		<input type="text" placeholder="display name" v-model="displayName" />
		<input type="email" placeholder="email" v-model="email" />
		<input type="password" placeholder="password" v-model="password" />
		<p v-if="!formIsValid" class="error">{{ error }}</p>
		<button>Sign up</button>
	</form>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
	setup() {
		// Vue stuff
		const store = useStore();

		// Variables
		const displayName = ref("");
		const email = ref("");
		const password = ref("");
		const formIsValid = ref(true);
		const error = computed(() => store.getters.getError);

		const handleSubmit = async () => {
			// Signup
			await store.dispatch("signup", {
				email: email.value,
				password: password.value,
				displayName: displayName.value,
			});

			if (error.value) formIsValid.value = false;
		};

		return { displayName, email, password, handleSubmit, formIsValid, error };
	},
};
</script>

<style></style>
