<template>
	<div class="current-user">
		<div class="title">Online:</div>
		<div v-for="user in documents" :key="user.id" class="user-container">
			<div class="single">
				<img src="../assets/img/51ejYd9HbRL._SX425_.jpg" />
				<p>{{ user.displayName }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, ref, onUpdated, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";
export default {
	setup() {
		const documents = ref([]);

		let collectionRes = projectFirestore.collection("user").where("isLogin", "==", true);

		const unsub = collectionRes.onSnapshot(snap => {
			let results = [];
			snap.forEach(doc => {
				results.push(doc.data());
			});
			documents.value = results;
		});

		watchEffect(onInvalidate => {
			onInvalidate(() => unsub());
		});

		return { documents };
	},
};
</script>

<style lang="scss" scoped>
.current-user {
	display: flex;
	align-items: center;
	padding: 1rem 1rem;
	flex-wrap: wrap;
	justify-content: center;

	& .title {
		font-weight: 700;
		margin: 2rem 0;
	}

	& .user-container {
		display: flex;
		flex-wrap: wrap;

		& img {
			width: 6rem;
			border-radius: 50px;
		}
	}

	.single {
		text-align: center;
		margin: 1rem 0;
	}

	& p {
		color: rgb(126, 125, 125);
	}
}
</style>
