<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png" />
		<Canvas id="canvasId" />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Canvas from "@/components/Canvas.vue";

export default Vue.extend({
	name: "App",
	components: {
		Canvas
	}
});
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
html {
	background-color: #16161d;
	color: white;
}
</style>
