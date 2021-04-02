<template>
	<nav v-if="user">
		<div>
			<p>Hey there... {{ user.displayName }}</p>
			<p class="email">Currently logged in as {{ user.email }}</p>
		</div>
		<button @click="handleClick">Logout</button>
	</nav>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
	setup() {
		// Vue stuff
		const store = useStore();
		const router = useRouter();

		// Variables
		const user = computed(() => store.getters.getUser);
		console.log(user.value);

		// Logout
		const handleClick = async () => {
			await store.dispatch("logout");

			if (!user.value) {
				router.push({ name: "Welcome" });
			}
		};

		return { handleClick, user };
	},
};
</script>

<style lang="scss" scoped>
nav {
	padding: 2rem;
	border-bottom: 1px solid #eee;
	display: flex;
	justify-content: space-between;
	align-items: center;

	& p {
		margin: 2px auto;
		font-size: 16px;
		color: var(--grey-dark);
	}

	.email {
		font-size: 1.4rem;
		color: var(--grey-light);
	}
}
</style>
