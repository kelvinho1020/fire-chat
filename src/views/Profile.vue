<template>
	<div class="container">
		<h2>Profile</h2>
		<div class="profile">
			<img :src="collection.url" />
		</div>
		<p>{{ collection.displayName }}</p>
		<div class="form-group"></div>
		<router-link :to="{ name: 'Update', params: { id: user.uid } }"
			><button type="button" v-if="user.uid === collection.id">Update</button></router-link
		>
		<router-link :to="{ name: 'Chatroom' }"><button type="button">Back</button></router-link>
	</div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { projectAuth } from "../firebase/config";
export default {
	setup() {
		const user = projectAuth.currentUser;
		const store = useStore();
		const route = useRoute();
		const collection = ref("");

		const userCollection = (async function() {
			await store.dispatch("userCollectionDetect", route.params.id);
			collection.value = computed(() => store.getters.getUserCollection).value;
		})();

		return { collection, user };
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
		margin-top: 2rem;
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
