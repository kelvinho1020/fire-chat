<template>
	<div class="container">
		<form @submit.prevent="handleSubmit">
			<h2>Update Profile</h2>
			<div class="profile">
				<img :src="tempUrl" />
			</div>
			<label>
				<input type="file" @change="handleChange" />
			</label>
			<div class="form-group">
				<label>Display Name</label>
				<input type="text" class="name" placeholder="update your display name" v-model="name" />
			</div>
			<button>Save</button>
			<router-link :to="{ name: 'Chatroom' }"><button type="button">Back</button></router-link>
		</form>
	</div>
</template>

<script>
import { computed, ref, onUpdated, watchEffect } from "vue";
import { projectAuth, projectFirestore, projectStorage } from "../firebase/config";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
	props: ["id"],
	setup(props) {
		const router = useRouter();
		const file = ref(null);
		const name = ref("");
		const url = ref("");
		const tempUrl = ref("");

		////////////////////////////////////
		const store = useStore();
		const user = computed(() => store.getters.getUser);
		// let collectionRes = projectFirestore.collection("user").where("id", "==", user.value.id);

		// allowed types
		const types = ["image/png", "image/jpeg"];

		const handleChange = e => {
			let selected = e.target.files[0];
			if (selected && types.includes(selected.type)) {
				file.value = selected;
				tempUrl.value = URL.createObjectURL(selected);
				console.log(tempUrl.value);
			}
		};

		const handleSubmit = async () => {
			// Profile picture
			let filePath = `users/${props.id}/${file.value.name}`;
			const storageRef = projectStorage.ref(filePath);

			const res = await storageRef.put(file.value);
			url.value = await res.ref.getDownloadURL();

			await projectFirestore
				.collection("user")
				.doc(props.id)
				.update({ url: url.value });

			// Displayname
			await projectAuth.currentUser.updateProfile({
				displayName: name.value,
				photoURL: url.value,
			});
			await projectFirestore
				.collection("user")
				.doc(props.id)
				.update({ displayName: name.value, filePath: filePath });

			console.log(url.value);
			router.push({ name: "Chatroom" });
		};

		return { name, handleSubmit, handleChange, tempUrl };
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
		border-radius: 0.6rem;
		background-color: royalblue;
		overflow: hidden;

		img {
			width: 100%;
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
