<template>
	<div class="container">
		<form @submit.prevent="handleSubmit">
			<h2>Update Profile</h2>
			<div class="profile">
				<img :src="tempUrl" />
				<label for="photo" class="photo">
					<font-awesome-icon icon="pen" style="color: white" />
					<input id="photo" type="file" @change="handleChange" />
				</label>
			</div>
			<BaseSpinner v-if="loading" />
			<div class="form-group" v-else>
				<label>Display Name</label>
				<input type="text" class="name" placeholder="update your display name" v-model="name" />
				<label>Description</label>
				<input type="text" class="description" placeholder="tell others about yourself" v-model="description" />
			</div>
			<p class="error" v-if="error">{{ error }}</p>
			<button v-if="!loading">Save</button>
			<router-link :to="{ name: 'Chatroom' }" v-if="!loading"><button type="button">Back</button></router-link>
		</form>
	</div>
</template>

<script>
import { computed, ref } from "vue";
import { projectAuth, projectFirestore, projectStorage } from "../firebase/config";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
	props: ["id"],
	setup(props) {
		// Vue stuff
		const router = useRouter();
		const store = useStore();

		// Handling
		const error = ref(null);
		const loading = ref(false);
		const formIsValid = ref(true);

		// Variables
		const file = ref(null);
		const name = ref("");
		const url = ref("");
		const tempUrl = ref("");
		const description = ref("");
		const userCollection = computed(() => store.getters.getUserCollection);

		// Allowed types
		const types = ["image/png", "image/jpeg"];

		store.dispatch("userDetect");

		const handleChange = e => {
			let selected = e.target.files[0];
			if (selected && types.includes(selected.type)) {
				file.value = selected;
				tempUrl.value = URL.createObjectURL(selected);
			}
		};

		const handleSubmit = async () => {
			loading.value = true;
			formIsValid.value = true;
			error.value = "";

			try {
				if (name.value === "" || description.value === "" || file.value === null) {
					formIsValid.value = false;
					throw new Error("Please enter a valid name and description");
				}
				// Storage path & Ref
				let filePath = `users/${props.id}/${file.value.name}`;
				const storageRef = projectStorage.ref(filePath);

				// Delete FireStorage
				const deleteStorageRef = projectStorage.ref(userCollection.value.filePath);
				try {
					await deleteStorageRef.getDownloadURL();
					await deleteStorageRef.delete();
				} catch (err) {
					throw new Error("Do not have this file");
				}

				// Update FireStorage
				const res = await storageRef.put(file.value);
				url.value = await res.ref.getDownloadURL();

				// Update User collection
				await projectFirestore
					.collection("user")
					.doc(props.id)
					.update({ displayName: name.value, filePath: filePath, url: url.value, description: description.value });

				// Update Auth profile
				await projectAuth.currentUser.updateProfile({
					displayName: name.value,
					photoURL: url.value,
				});

				// Update store
				store.dispatch("userDetect");

				loading.value = false;
				router.push({ name: "Chatroom" });
			} catch (err) {
				formIsValid.value = false;
				loading.value = false;
				error.value = err.message;
			}
		};

		return { name, handleSubmit, handleChange, tempUrl, error, description, loading };
	},
};
</script>

<style lang="scss" scoped>
.container {
	text-align: center;
	padding: 3.8rem 0;
	font-size: 1.6rem;
	width: 100%;

	& .profile {
		margin: 20px auto;
		width: 15rem;
		height: 15rem;
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
		width: 80rem;
		margin: 2rem auto;

		@media only screen and (max-width: $bp-small) {
			width: 40rem;
		}
		@media only screen and (max-width: 25em) {
			width: 30rem;
		}
	}

	.form-group {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	& label {
		display: block;
		margin: 2rem 0 0.1rem;
	}

	& .name {
		width: 35%;
	}

	& .description {
		width: 60%;
	}

	& button {
		margin: 2rem 1rem 0 1rem;
	}

	.error {
		margin-top: 1.5rem;
	}
}
</style>
