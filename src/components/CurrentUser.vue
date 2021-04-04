<template>
	<div class="current-user">
		<div class="title">Online User :</div>
		<div v-for="user in documents" :key="user.id">
			<p>{{ user.displayName }}</p>
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
			console.log(results);
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
	border-bottom: 1px solid #eee;
	background-color: rgba(241, 240, 240, 0.616);
	display: flex;
	align-items: center;
	padding: 1rem 1rem;

	& .title {
		padding-left: 1rem;
		padding-right: 1rem;
	}

	& p {
		color: rgb(126, 125, 125);
		margin: 0 1rem;
		border-right: 1px solid rgb(211, 211, 211);
		padding-right: 2rem;
	}
}
</style>
