<template>
	<div>
		<router-view />
	</div>
</template>

<script>
import { useStore } from "vuex";
import { projectAuth } from "./firebase/config";
export default {
	setup() {
		const store = useStore();
		projectAuth.onAuthStateChanged(_user => {
			store.dispatch("userDetect");
		});
	},
};
</script>

<style lang="scss">
@import url("../src/sass/main.scss");
</style>
