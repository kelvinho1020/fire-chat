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
	</div>
</template>

<script>
import Navbar from "../components/Navbar";
import NewChatForm from "../components/NewChatForm";
import ChatWindow from "../components/ChatWindow";
import CurrentUser from "../components/CurrentUser";
export default {
	components: { Navbar, NewChatForm, ChatWindow, CurrentUser },
	setup() {},
};
</script>

<style scoped lang="scss">
.outer {
	display: flex;
	justify-content: center;

	& .container {
		margin-left: 0rem;
		margin-right: 0rem;
	}

	.currentUser {
		width: 10rem;
		margin-right: 5rem;
	}
}
</style>
