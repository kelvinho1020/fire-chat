<template>
	<div class="welcome container">
		<p>Welcome to Fire-chat</p>
		<div v-if="showLogin">
			<h2>Login</h2>
			<LoginForm />
			<p>no account yet? <span @click="showLogin = false">Signup </span>instead</p>
		</div>
		<div v-else>
			<h2>SignUp</h2>
			<SignupForm />
			<p>Already registered <span @click="showLogin = true">Login </span>instead</p>
		</div>
	</div>
</template>

<script>
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import { ref } from "vue";
export default {
	components: { SignupForm, LoginForm },
	setup() {
		const showLogin = ref(true);

		return { showLogin };
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
	& input {
		width: 100%;
		padding: 1rem;
		border-radius: 2rem;
		border: 1px solid #eee;
		outline: none;
		color: #999;
		margin: 1rem auto;
	}

	& button {
		margin: 2rem auto;
	}
	
	.error {
		margin-top: 1.5rem;
	}
}
</style>
