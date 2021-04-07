<template>
	<div class="welcome container">
		<p>Welcome to Firechat</p>
		<div v-if="showLogin">
			<h2>Login</h2>
			<LoginForm @login="enterChat" @loading="isLoading" @notLoading="notLoading" />
			<p v-if="!loading">no account yet? <span @click="showLogin = false">Signup </span>instead</p>
		</div>
		<div v-else>
			<h2>SignUp</h2>
			<SignupForm @signup="enterChat" @loading="isLoading" @notLoading="notLoading" />
			<p v-if="!loading">Already registered <span @click="showLogin = true">Login </span>instead</p>
		</div>
	</div>
</template>

<script>
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
	components: { SignupForm, LoginForm },
	setup() {
		// Vue stuff
		const router = useRouter();

		// Variables
		const showLogin = ref(true);
		const loading = ref(false);

		const enterChat = () => {
			router.push({ name: "Chatroom" });
		};

		const isLoading = isLoad => {
			loading.value = isLoad;
		};

		const notLoading = notLoad => {
			loading.value = notLoad;
		};

		return { showLogin, enterChat, loading, isLoading, notLoading };
	},
};
</script>

<style lang="scss">
.welcome {
	text-align: center;
	padding: 3.8rem 0;
	font-size: 1.6rem;

	& h2 {
		margin-top: 2rem;
	}

	& span {
		font-weight: bold;
		text-decoration: underline;
		cursor: pointer;
		color: var(--primary);
	}

	& form {
		width: 30rem;
		margin: 2rem auto;
	}

	& label {
		display: block;
		margin: 2rem 0 0.1rem;
	}

	& button {
		margin: 2rem auto;
	}

	.error {
		margin-top: 1.5rem;
	}
}
</style>
