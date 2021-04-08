<template>
	<div class="outer">
		<div class="container currentUser">
			<CurrentUser />
		</div>
		<div class="container">
			<Navbar />
			<ChatWindow />
			<NewChatForm />
		</div>
		<ThemeNav />
	</div>
</template>

<script>
import Navbar from "../components/Navbar";
import NewChatForm from "../components/NewChatForm";
import ChatWindow from "../components/ChatWindow";
import CurrentUser from "../components/CurrentUser";
import ThemeNav from "../components/ThemeNav";

export default {
	components: { Navbar, NewChatForm, ChatWindow, CurrentUser, ThemeNav },
	setup() {},
};
</script>

<style scoped lang="scss">
.outer {
	display: flex;
	justify-content: center;

	@media only screen and (max-width: $bp-small) {
		flex-direction: column;
		height: 100vh;
	}

	& .container {
		margin: 4rem 0;

		@media only screen and (max-width: $bp-medium) {
			min-height: 90vh;
		}

		@media only screen and (max-width: $bp-small) {
			width: 100%;
			border-radius: 0px;
			min-height: 100vh;
			margin: 0;
		}
	}

	.currentUser {
		width: 10rem;
		margin-right: 5rem;

		@media only screen and (max-width: $bp-medium) {
			margin-left: 1.5rem;
		}

		@media only screen and (max-width: $bp-small) {
			display: none;
		}
	}
}
</style>
