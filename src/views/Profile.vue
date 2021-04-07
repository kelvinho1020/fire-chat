<template>
	<div class="container">
		<BaseSpinner v-if="loading" />
		<div v-else>
			<h2>Profile</h2>
			<div class="profile">
				<img src="../assets/img/user.png" v-if="collection.url === ''" />
				<img :src="collection.url" v-else />
			</div>
			<div v-if="collection.displayName !== ''">
				<h3>Name</h3>
				<h2>{{ collection.displayName }}</h2>
			</div>
			<div v-if="collection.description !== ''">
				<h3>About me</h3>
				<h2>{{ collection.description }}</h2>
			</div>
			<div class="form-group"></div>
			<router-link :to="{ name: 'Update', params: { id: user.uid } }"
				><button type="button" v-if="user.uid === collection.id">Update</button></router-link
			>
			<router-link :to="{ name: 'Chatroom' }"><button type="button">Back</button></router-link>
		</div>
	</div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { projectAuth } from "../firebase/config";
export default {
	setup() {
		// Vue stuff
		const store = useStore();
		const route = useRoute();

		// Handling
		const collection = ref("");
		const loading = ref(false);

		// Variables
		const user = projectAuth.currentUser;

		const userCollection = (async function() {
			loading.value = true;
			try {
				await store.dispatch("userCollectionDetect", route.params.id);
				loading.value = false;
				collection.value = computed(() => store.getters.getUserCollection).value;
			} catch (err) {
				loading.value = false;
			}
		})();

		return { collection, user, loading };
	},
};
</script>

<style lang="scss" scoped>
.container {
	text-align: center;
	padding: 3.8rem 0;
	font-size: 1.6rem;

	& .profile {
		margin: 20px auto;
		width: 150px;
		height: 150px;
		position: relative;
		border-radius: 100px;
		background-color: royalblue;
		overflow: hidden;

		img {
			max-width: 300px;
			max-height: 300px;
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		& .photo {
			cursor: pointer;
			position: absolute;
			bottom: 0;
			right: 45%;
		}

		& #photo {
			visibility: hidden;
			position: absolute;
			right: 50%;
		}
	}
	& h2 {
		color: var(--grey-dark);
	}
	& h3 {
		color: var(--grey-light);
		margin-top: 0.5rem;
		border-bottom: 2px solid #9999;
		display: inline-block;
		margin-bottom: 1rem;
		padding: 1rem 4rem;
		font-size: 2rem;
	}

	& form {
		width: 30rem;
		margin: 2rem auto;
	}

	& label {
		display: block;
		margin: 2rem 0 0.1rem;
	}

	& .name {
		width: 100%;
		padding: 1rem;
		border-radius: 2rem;
		border: 1px solid #eee;
		outline: none;
		color: var(--grey-light);
		margin: 1rem auto;
	}

	& button {
		margin: 2rem 1rem 0 1rem;
	}

	.error {
		margin-top: 1.5rem;
	}
}
</style>
