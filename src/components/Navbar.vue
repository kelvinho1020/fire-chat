<template>
	<nav v-if="user">
		<div>
			<div class="cover">
				<img class="icon" :src="photoUrl" v-if="photoUrl" />
				<img class="icon" src="../assets/img/user.png" v-else />
			</div>
			<p>Hey there {{ user.displayName }} !</p>
			<p class="email">
				Currently logged in as {{ user.email }}
				<router-link :to="{ name: 'Profile', params: { id: user.uid } }"><font-awesome-icon icon="pen" style="color:#777"/></router-link>
			</p>
		</div>
		<button @click="handleClick">Logout</button>
	</nav>
</template>

<script>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
	setup() {
		// Vue stuff
		const store = useStore();
		const router = useRouter();

		// Variables
		const photoUrl = ref("");
		const user = computed(() => store.getters.getUser);
		photoUrl.value = user.value.photoURL;

		// Logout
		const handleClick = async () => {
			await store.dispatch("logout");

			if (!user.value) {
				router.push({ name: "Welcome" });
			}
		};

		return { handleClick, user, photoUrl };
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

	& a{
		margin-left: .5rem;
	}
	& .cover {
		margin-right: 2rem;
	}

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
