<template>
	<div class="container">
		<Navbar />
		<ChatWindow />
		<NewChatForm />
	</div>
</template>

<script>
import Navbar from "../components/Navbar";
import NewChatForm from "../components/NewChatForm";
import ChatWindow from "../components/ChatWindow";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
	components: { Navbar, NewChatForm, ChatWindow },
	setup() {
		// Vue stuff
		const store = useStore();
		const router = useRouter;
	},
};
</script>

<style scoped></style>
