<template>
	<div>
		<BaseSpinner v-if="loading" class='spinner'/>
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
			loading.value = true;
			context.emit("loading", loading.value);
			try {
				await store.dispatch("signup", {
					email: email.value,
					password: password.value,
					displayName: displayName.value,
				});
				loading.value = false;
				context.emit("signup");
				context.emit("notLoading", loading.value);
			} catch (err) {
				loading.value = false;
				formIsValid.value = false;
				error.value = err.message;
				context.emit("notLoading", loading.value);
			}
		};

		return { displayName, email, password, handleSubmit, formIsValid, error, loading };
	},
};
</script>

<style scoped>
.spinner {
	margin-top: 2rem;
}
</style>
