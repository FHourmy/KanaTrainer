<template>
	<div id="app">
		<Router />
		<div id="screens">
			<router-view />
		</div>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import Router from "./router/Router.vue";
import "vue-select/dist/vue-select.css";

export default Vue.extend({
	name: "App",
	components: {
		Router
	}
});
</script>
<style>
html {
	background-color: #16161d;
	color: white;
	height: 100%;
	display: flex;
	flex-grow: 1;
	min-height: 600px;
	min-width: 600px;
}
body {
	padding: 0px;
	margin: 0px;
	flex-grow: 1;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	display: flex;
	flex-direction: row;
	flex: 1;
	height: 100%;
}
#screens {
	flex: 1;
	display: flex;
	align-content: center;
	justify-content: center;
	align-items: center;
}
.custom-button {
	color: white;
	padding: 5px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 5px;
	transition-property: background-color;
	transition-duration: 0.5s;
	display: inline-block;
	cursor: pointer;
}
.custom-button:hover {
	background-color: rgba(255, 255, 255, 0.1);
}
.vs__selected {
	color: white;
}
input.vs__search {
	color: white;
}
</style>
