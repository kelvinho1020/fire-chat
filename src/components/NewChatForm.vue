<template>
	<form>
		<textarea
			placeholder="Type a meessage and hit enter to send..."
			v-model="message"
			@keypress.enter.prevent="handleSubmit"
		></textarea>
		<p class="error">{{ error }}</p>
	</form>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { timestamp, projectAuth, projectFirestore, projectStorage } from "../firebase/config";
export default {
	setup() {
		// Vue stuff
		const store = useStore();

		// Variables
		const message = ref("");
		const error = ref("");
		const photoUrl = ref("");

		const user = projectAuth.currentUser;
		if (user) {
			photoUrl.value = user.photoURL;
		}

		const handleSubmit = async () => {
			error.value = "";
			try {
				const chat = {
					name: user.displayName,
					message: message.value,
					createdAt: timestamp(),
					email: user.email,
					url: photoUrl.value,
					uid: user.uid,
				};
				message.value = "";
				await store.dispatch("messageCollection/addDoc", chat);
			} catch (err) {
				error.value = err.message;
			}
		};

		return { message, handleSubmit, error };
	},
};
</script>

<style lang="scss" scoped>
form {
	margin: 1rem;

	textarea {
		width: 100%;
		max-width: 100%;
		margin-bottom: 6px;
		padding: 1rem;
		box-sizing: border-box;
		border: 0;
		border-radius: 2rem;
		font-family: inherit;
		outline: none;
	}
}
</style>
