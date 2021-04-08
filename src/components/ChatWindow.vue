<template>
	<div class="chat-window">
		<div class="messages" v-if="formattedDocuments && user" ref="messages">
			<div
				class="single"
				v-for="message in formattedDocuments"
				:class="message.email === user.email ? 'currentUser' : ''"
				:key="message.id"
			>
				<router-link :to="{ name: 'Profile', params: { id: message.uid } }">
					<div class="cover">
						<img class="icon" :src="message.url" v-if="message.url" />
						<img class="icon" src="../assets/img/user.png" v-else />
					</div>
				</router-link>
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

		// Variables
		const user = computed(() => store.getters.getUser);
		const documents = ref(null);
		const userDocuments = ref(null);
		const error = ref(null);
		const messages = ref(null);

		// Firestore collection
		let collectionRef = projectFirestore.collection("message").orderBy("createdAt");
		let usercollectionRef = projectFirestore.collection("user");

		// UserCollection
		const unsub1 = usercollectionRef.onSnapshot(
			snap => {
				let results = [];
				snap.docs.forEach(async doc => {
					results.push({ ...doc.data() });
				});

				userDocuments.value = results;
				error.value = null;
			},
			err => {
				documents.value = null;
				error.value = "could not fetch the data";
			}
		);

		// MessageCollection
		const unsub2 = collectionRef.onSnapshot(
			snap => {
				let i = 0;
				let size = snap.size;
				let sizeToDelete = size - 50;

				let results = [];
				snap.docs.forEach(doc => {
					doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });

					if (i < sizeToDelete) {
						doc.ref.delete();
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

		// Fromat the timestamp and url
		const formattedDocuments = computed(() => {
			if (documents.value) {
				return documents.value.map(doc => {
					let user = userDocuments.value.find(u => u.id === doc.uid);
					let time = formatDistanceToNow(doc.createdAt.toDate());
					return { ...doc, createdAt: time, url: user.url };
				});
			}
		});

		watchEffect(onInvalidate => {
			onInvalidate(() => unsub1());
		});
		watchEffect(onInvalidate => {
			onInvalidate(() => unsub2());
		});

		// aut-scroll
		onUpdated(() => {
			if (messages.value) {
				messages.value.scrollTop = messages.value.scrollHeight;
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
	min-height: 46rem;

	@media only screen and (max-width: $bp-medium) {
			min-height: 70vh;
		}

	@media only screen and (max-width: $bp-small) {
		min-height: 75vh;
	}
}
.single {
	margin: 1.8rem 0 1.8rem 1.3rem;
}
.cover {
	margin-right: 2rem;
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

	@media only screen and (max-width: $bp-medium) {
		min-height: 63vh;
	}

	@media only screen and (max-width: $bp-small) {
		min-height: 75vh;
	}
}
.currentUser {
	text-align: right;
	margin-right: 1.5rem;

	.cover {
		margin-left: 2rem;
		float: right;
	}
}
span {
	margin: 0.5rem 0;
}
</style>
