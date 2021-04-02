<template>
	<div class="chat-window">
		<p v-if="error">{{ error }}</p>
		<div class="messages" v-if="formattedDocuments" ref="messages">
			<div class="single" v-for="message in formattedDocuments" :key="message.id">
				<span class="created-at">{{ message.createdAt }}</span>
				<span class="name">{{ message.name }}</span>
				<span class="message">{{ message.message }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { computed, ref, onUpdated, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";
import { formatDistanceToNow } from "date-fns";
export default {
	setup() {
		const documents = ref(null);
		const error = ref(null);
		const messages = ref(null);

		const formattedDocuments = computed(() => {
			if (documents.value) {
				return documents.value.map(doc => {
					let time = formatDistanceToNow(doc.createdAt.toDate());
					return { ...doc, createdAt: time };
				});
			}
		});

		let collectionRef = projectFirestore.collection("message").orderBy("createdAt");

		const unsub = collectionRef.onSnapshot(
			snap => {
				let results = [];
				snap.docs.forEach(doc => {
					doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
				});

				documents.value = results;
				error.value = null;
			},
			err => {
				documents.value = null;
				error.value = "could not fetch the data";
			}
		);

		watchEffect(onInvalidate => {
			onInvalidate(() => unsub());
		});

		// aut-scroll
		onUpdated(() => {
			messages.value.scrollTop = messages.value.scrollHeight;
		});

		return { documents, error, formattedDocuments, messages };
	},
};
</script>

<style lang="scss" scoped>
.chat-window {
	background: #fafafa;
	padding: 3rem 2rem;
}
.single {
	margin: 1.8rem 0;
}
.created-at {
	display: block;
	color: var(--grey-light);
	font-size: 1.2rem;
	margin-bottom: 4px;
}
.name {
	font-weight: bold;
	margin-right: 6px;
}
.messages {
	max-height: 40rem;
	overflow: auto;
}
</style>
