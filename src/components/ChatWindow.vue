<template>
	<div class="chat-window">
		<p v-if="error">{{ error }}</p>
		<div class="messages" v-if="formattedDocuments && user" ref="messages">
			<div
				class="single"
				v-for="message in formattedDocuments"
				:class="message.email === user.email ? 'currentUser' : ''"
				:key="message.id"
			>
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
import { useStore } from "vuex";
import { formatDistanceToNow } from "date-fns";

export default {
	setup() {
		// Vue stuff
		const store = useStore();

		const documents = ref(null);
		const error = ref(null);
		const messages = ref(null);

		const user = computed(() => store.getters.getUser);

		// Firestore snapshot
		let collectionRef = projectFirestore.collection("message").orderBy("createdAt");

		const unsub = collectionRef.onSnapshot(
			snap => {
				let i = 0;
				let size = snap.size;
				let sizeToDelete = size - 50;

				let results = [];
				snap.docs.forEach(async doc => {
					doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });

					if (i < sizeToDelete) {
						await doc.ref.delete();
					}
					i++;
				});

				documents.value = results;
				error.value = null;
			},
			err => {
				documents.value = null;
				error.value = "could not fetch the data";
			}
		);

		const formattedDocuments = computed(() => {
			if (documents.value) {
				return documents.value.map(doc => {
					let time = formatDistanceToNow(doc.createdAt.toDate());
					return { ...doc, createdAt: time };
				});
			}
		});

		watchEffect(onInvalidate => {
			onInvalidate(() => unsub());
		});

		// aut-scroll
		onUpdated(() => {
			if (store.getters["messageCollection/getIsScroll"] && user.value) {
				messages.value.scrollTop = messages.value.scrollHeight;
				console.log(documents.value);
			}
		});

		return { documents, error, formattedDocuments, messages, user };
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
	display: block;
}
.messages {
	max-height: 40rem;
	overflow: auto;
}
.currentUser {
	text-align: right;
	margin-right: 2rem;
}
span {
	margin: 0.5rem 0;
}
</style>
