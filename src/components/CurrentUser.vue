<template>
	<div class="current-user">
		<div class="title">Online:</div>
		<div v-for="user in status" :key="user.id" class="user-container">
			<div class="single">
				<div class="status" :class="user.status"></div>
				<router-link :to="{ name: 'Profile', params: { id: user.id } }">
					<div class="cover">
						<img class="icon" :src="user.photoURL" v-if="user.photoURL" />
						<img class="icon" src="../assets/img/user.png" v-else />
					</div>
				</router-link>
				<p>{{ user.displayName }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { onBeforeUnmount, ref } from "vue";
import { projectAuth, projectDatabase } from "../firebase/config";
export default {
	setup() {
		const status = ref([]);
		const user = projectAuth.currentUser;
		const userId = projectAuth.currentUser.uid;
		const usersRef = projectDatabase.ref("users/");
		const userRef = projectDatabase.ref("users/" + userId);
		const myStatusRef = projectDatabase.ref("users/" + userId + "/status");
		const connectedRef = projectDatabase.ref(`.info/connected`);

		if (user) {
			// Listen to connect change
			const unsub1 = connectedRef.on("value", function(snap) {
				if (snap && snap.val() === true) {
					userRef.onDisconnect().remove();
					userRef.set({
						status: "online",
						photoURL: user.photoURL,
						displayName: user.displayName,
					});

					// Update to offline version
					// myStatusRef.onDisconnect().set("offline");
				}
			});

			// Listen to visible change
			document.onvisibilitychange = e => {
				if (document.visibilityState === "hidden") {
					myStatusRef.set("away");
				} else {
					myStatusRef.set("online");
				}
			};

			// Listen to all users
			const unsub2 = usersRef.on("value", function(snap) {
				if (snap && snap.val() !== null) {
					status.value = [];
					for (const [key, value] of Object.entries(snap.val())) {
						let _user = { ...value };
						_user.id = key;
						status.value.push(_user);
					}
				}
			});

			// clear snapshot
			onBeforeUnmount(() => {
				connectedRef.off("value", unsub1);
				usersRef.off("value", unsub2);
			});
		}

		return { status };
	},
};
</script>

<style lang="scss" scoped>
.current-user {
	padding: 1rem 1rem;
	min-height: 70rem;

	// Scroll bar
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: -17px; // move to hide the scroll bar
	overflow-y: scroll;

	& .title {
		font-weight: 700;
		margin: 2rem 0;
		position: relative;
		right: -13px;
	}

	& .user-container {
		display: flex;
		flex-wrap: wrap;
		position: relative;
		right: -10px;
	}

	.single {
		text-align: center;
		margin: 1rem 0;
		display: flex;
		flex-direction: column;
		position: relative;

		& .status {
			position: absolute;
			z-index: 10;
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 20px;
			bottom: 30%;
			right: 0;
		}

		& .online {
			background: greenyellow;
		}
		& .away {
			background: orange;
		}

		& .cover {
			margin-bottom: 1rem;
		}

		& p {
			color: #444;
			font-weight: 600;
		}
	}
}
</style>
