<template>
	<nav v-if="user">
		<div>
			<router-link :to="{ name: 'Profile', params: { id: user.uid } }">
				<div class="cover">
					<img class="icon" :src="photoUrl" v-if="photoUrl" />
					<img class="icon" src="../assets/img/user.png" v-else />
				</div>
			</router-link>
			<p>Hey there {{ user.displayName }} !</p>
			<p class="email">
				Currently logged in as {{ user.email }}
				<router-link :to="{ name: 'Update', params: { id: user.uid } }"
					><font-awesome-icon icon="pen" style="color:#777" class="pen-icon"
				/></router-link>
			</p>
		</div>
		<button @click="handleClick">Logout</button>
	</nav>
</template>

<script>
import { projectAuth } from "../firebase/config";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
	setup() {
		// Vue stuff
		const store = useStore();
		const router = useRouter();

		// Variables
		const user = projectAuth.currentUser;
		const photoUrl = ref("");
		photoUrl.value = user.photoURL;

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

	& .pen-icon {
		margin-left: 0.5rem;
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
