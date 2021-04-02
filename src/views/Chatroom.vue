<template>
	<div class="container">
		<Navbar />
	</div>
</template>

<script>
import Navbar from "../components/Navbar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
	components: { Navbar },
	setup() {
		// Vue stuff
		const store = useStore();
		const router = useRouter;

	},
};
</script>

<style scoped></style>
