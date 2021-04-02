<template>
	<form @submit.prevent="handleSubmit">
		<input type="email" placeholder="email" v-model="email" required />
		<input type="password" placeholder="password" v-model="password" required />
		<button>Log in</button>
		<p v-if="!formIsValid" class="error">Please enter a valid email and password<br />(at least 6 characters long)</p>
	</form>
</template>

<script>
import { ref } from "vue";
export default {
	setup() {
		const email = ref("");
		const password = ref("");
		const formIsValid = ref(true);

		const handleSubmit = () => {
			if (
				email.value === "" ||
				!email.value.includes("@") ||
				!email.value.includes(".com") ||
				password.value.length < 6
			) {
				formIsValid.value = false;
				return;
			}
			console.log(email, password);
		};

		return { email, password, handleSubmit, formIsValid };
	},
};
</script>

<style></style>
