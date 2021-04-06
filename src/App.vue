<template>
	<div>
		<router-view />
	</div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { projectAuth, projectFirestore, projectDatabase } from "./firebase/config";
import firebase from "firebase/app";
export default {
	setup() {
		const store = useStore();
		projectAuth.onAuthStateChanged(_user => {
			store.dispatch("userDetect");
		});
		if (projectAuth.currentUser) {
		}
	},
};
</script>

<style lang="scss">
@import url("../src/sass/main.scss");
</style>
