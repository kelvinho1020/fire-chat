<template>
	<div>
		<router-view />
	</div>
</template>

<script>
import { useStore } from "vuex";
export default {
	setup() {
		const store = useStore();
		store.dispatch("userDetect");
	},
};
</script>

<style lang="scss">
@import url("../src/sass/main.scss");
</style>
