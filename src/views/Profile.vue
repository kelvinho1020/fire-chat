<template>
	<div class="container">
		<form>
			<h2>Update Profile</h2>
			<div class="profile">
				<label>
					<input type="file" />
				</label>
			</div>
			<div class="form-group">
				<label>Name</label>
				<input type="text" class="name" placeholder="your new display name" />
			</div>
			<button>Save</button>
			<button>Back</button>
		</form>
	</div>
</template>

<script>
export default {};
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
		background-color: royalblue;
		position: relative;
		border-radius: 0.6rem;
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

	& input {
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
