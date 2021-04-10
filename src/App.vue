<template>
	<div>
		<router-view />
	</div>
</template>

<script>
import { useStore } from "vuex";
import { projectAuth } from "./firebase/config";
export default {
	setup() {
		const store = useStore();
		projectAuth.onAuthStateChanged(_user => {
			store.dispatch("userDetect");
		});
	},
};
</script>

<style lang="scss">
@import url("../src/sass/main.scss");

* {
	margin: 0;
	padding: 0;
}

*,
*::before,
*::after {
	box-sizing: inherit;
}

html {
	box-sizing: border-box;
	font-size: 62.5%;

	@media only screen and (max-width: $bp-medium) {
		font-size: 50%;
	}
}

body {
	background: var(--background);
	color: #444;
	font-family: Avenir, Arial, Helvetica, sans-serif;
	font-size: 1.6rem;
}

.container {
	width: 90%;
	max-width: 96rem;
	min-width: 10rem;
	max-height: 66rem;
	margin: 8rem auto;
	border-radius: 20px;
	box-shadow: 2px 4px 6px rgba(28, 6, 49, 0.1);
	background: white;
	position: relative;
	overflow: hidden;
}

input {
	width: 100%;
	padding: 1rem;
	border-radius: 2rem;
	border: 1px solid #eee;
	outline: none;
	color: var(--grey-light);
	margin: 1rem auto;
}

.error {
	color: #ff3f80;
	font-size: 1.4rem;
}

button {
	text-decoration: none;
	background: var(--primary);
	color: white;
	font-weight: bold;
	border: 0;
	border-radius: 20px;
	padding: 1rem 2rem;
	cursor: pointer;
}

.cover {
	overflow: hidden;
	position: relative;
	border-radius: 50px;
	height: 6rem;
	width: 6rem;
	background-color: black;
	float: left;
}

.icon {
	display: block;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	min-width: 100%;
	min-height: 100%;
	max-width: 150%;
	max-height: 150%;
}
</style>
