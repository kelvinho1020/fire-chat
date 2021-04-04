<template>
	<div>
		<div class="container">
			<Navbar />
			<CurrentUser />
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

<style scoped>
</style>
