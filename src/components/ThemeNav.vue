<template>
	<div class="palette">
		<font-awesome-icon icon="palette" style="color:#777" size="2x" class="palette-icon" />
		<ul @click="themeHandler">
			<li class="colors" id="grey" data-color="#e3e1ff"></li>
			<li class="colors" id="blue" data-color="#3498db"></li>
			<li class="colors" id="red" data-color="#e74c3c"></li>
			<li class="colors" id="yellow" data-color="#f1c40f"></li>
			<li class="colors" id="orange" data-color="#e67e22"></li>
			<li class="colors" id="green" data-color="#2ecc71"></li>
		</ul>
	</div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from "vue";
export default {
	setup() {
		const secretCode = [38, 38, 40, 40, 37, 39, 37, 39];
		const input = ref([]);

		// Just for fun
		function changeStyle(e) {
			console.log("add");
			input.value.push(e.keyCode);

			// reset
			input.value.forEach((_, i) => {
				if (secretCode[i] !== input.value[i]) {
					input.value = [];
				}
			});

			if (secretCode.join("") === input.value.join("")) {
				input.value = [];
				const randomColor = "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
				document.documentElement.style.setProperty("--background", randomColor);
				localStorage.setItem("color", randomColor);
			}
		}

		const themeHandler = function(e) {
			if (!e.target.dataset.color) return;
			document.documentElement.style.setProperty("--background", e.target.dataset.color);
			localStorage.setItem("color", e.target.dataset.color);
		};

		onMounted(() => {
			window.addEventListener("keyup", changeStyle);
			document.documentElement.style.setProperty("--background", localStorage.getItem("color"));
		});

		onBeforeUnmount(() => {
			window.removeEventListener("keyup", changeStyle);
		});

		return { themeHandler };
	},
};
</script>

<style lang="scss" scoped>
.palette {
	background-color: #fff;
	height: 6rem;
	min-width: 6rem;
	border-radius: 50px;
	position: relative;
	cursor: pointer;
	margin-left: 4rem;
	margin-top: 4rem;

	@media only screen and (max-width: $bp-medium) {
		margin-right: 2rem;
	}

	@media only screen and (max-width: $bp-small) {
		display: none;
	}

	.palette-icon {
		position: absolute;
		top: 25%;
		right: 23%;
	}

	&:hover ul {
		display: block;
	}

	ul {
		padding-top: 6rem;
		display: none;
	}

	.colors {
		list-style: none;
		width: 5rem;
		height: 5rem;
		margin: 2.5rem auto;
		border-radius: 50px;
		border: 4px solid #fff;
	}

	#grey {
		background-color: #e3e1ff;
	}
	#blue {
		background-color: #3498db;
	}
	#red {
		background-color: #e74c3c;
	}
	#yellow {
		background-color: #f1c40f;
	}
	#orange {
		background-color: #e67e22;
	}
	#green {
		background-color: #2ecc71;
	}
}
</style>
