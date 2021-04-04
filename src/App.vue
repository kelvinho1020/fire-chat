<template>
	<div>
		<router-view />
	</div>
</template>

<script>
import { computed, onMounted, onUpdated } from "vue";
import { useStore } from "vuex";
import { projectAuth, projectFirestore } from "./firebase/config";

export default {
	setup() {
		const store = useStore();
		const userId = projectAuth.currentUser.uid;

		console.log(userId);

		projectAuth.onAuthStateChanged(_user => {
			store.dispatch("userDetect");
		});

		const login = async () => {
			await projectFirestore
				.collection("user")
				.doc(userId)
				.update({ isLogin: true });
		};
		const logout = async () => {
			await projectFirestore
				.collection("user")
				.doc(userId)
				.update({ isLogin: false });
		};

		onMounted(() => {
			login();
		});
		window.addEventListener("beforeunload", logout);
	},
};
</script>

<style lang="scss">
@import url("../src/sass/main.scss");
</style>
