<template>
	<div>
		<BaseSpinner v-if="loading" />
		<form @submit.prevent="handleSubmit" v-else>
			<input type="text" placeholder="display name" v-model="displayName" />
			<input type="email" placeholder="email" v-model="email" />
			<input type="password" placeholder="password" v-model="password" />
			<p v-if="!formIsValid" class="error">{{ error }}</p>
			<button>Sign up</button>
		</form>
	</div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
	emit: ["signup"],
	setup(props, context) {
		// Vue stuff
		const store = useStore();

		// Variables
		const displayName = ref("");
		const email = ref("");
		const password = ref("");
		const formIsValid = ref(true);
		const error = ref("");
		const loading = ref(false);

		const handleSubmit = async () => {
			formIsValid.value = true;
			error.value = "";
			try {
				loading.value = true;
				await store.dispatch("signup", {
					email: email.value,
					password: password.value,
					displayName: displayName.value,
				});
				loading.value = false;
				context.emit("signup");
			} catch (err) {
				loading.value = false;
				formIsValid.value = false;
				error.value = err.message;
			}
		};

		return { displayName, email, password, handleSubmit, formIsValid, error, loading };
	},
};
</script>

<style></style>
