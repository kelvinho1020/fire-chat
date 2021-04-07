<template>
	<div>
		<BaseSpinner v-if="loading" />
		<form @submit.prevent="handleSubmit" v-else>
			<input type="email" placeholder="email" v-model="email" required />
			<input type="password" placeholder="password" v-model="password" required />
			<button>Log in</button>
			<p v-if="!formIsValid" class="error">{{ error }}</p>
		</form>
	</div>
</template>

<script>
import { ref } from "vue";
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
		const loading = ref(false);
		
		const handleSubmit = async () => {
			loading.value = true;
			formIsValid.value = true;
			error.value = "";
			try {
				await store.dispatch("login", {
					email: email.value,
					password: password.value,
				});
				context.emit("login");
				loading.value = false;
			} catch (err) {
				console.log(err);
				loading.value = false;
				formIsValid.value = false;
				error.value = err.message;
			}
		};

		return { email, password, handleSubmit, formIsValid, error, loading };
	},
};
</script>

<style></style>
