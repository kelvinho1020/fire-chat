<template>
	<div class="current-user">
		<div class="title">Online:</div>
		<div v-for="user in documents" :key="user.id" class="user-container">
			<div class="single">
				<div class="cover">
					<img class="icon" :src="user.url !== '' ? user.url : '../assets/img/user.png'" v-if="user.url !== ''" />
					<img class="icon" src="../assets/img/user.png" v-else />
				</div>
				<p>{{ user.displayName }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";
export default {
	setup() {
		const documents = ref([]);

		let collectionRes = projectFirestore.collection("user").where("isLogin", "==", true);

		// Firestore snapshot
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
	}

	.single {
		text-align: center;
		margin: 1rem 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.cover {
		margin-bottom: 1rem;
	}

	& p {
		color: #444;
		font-weight: 600;
	}
}
</style>
