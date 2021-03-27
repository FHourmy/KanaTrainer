<template>
	<div id="nav">
		<router-link class="router-link" to="/" role="nav-button">
			<div class="menu-item">
				<img src="../assets/home.png" height="50px" width="50px" />
			</div>
		</router-link>
		<router-link class="router-link" to="/drawing" role="nav-button">
			<div class="menu-item">
				<img src="../assets/brush.png" height="50px" width="50px" />
			</div>
		</router-link>
		<router-link class="router-link" to="/identify" role="nav-button">
			<div class="menu-item">
				<img src="../assets/view.png" height="50px" width="50px" />
			</div>
		</router-link>
		<router-link class="router-link" to="/IdentifyAndDraw" role="nav-button">
			<div class="menu-item">
				<img src="../assets/identifyAndDraw.png" height="50px" width="50px" />
			</div>
		</router-link>
		<router-link class="router-link" to="/stats" role="nav-button">
			<div class="menu-item">
				<img src="../assets/stats.png" height="50px" width="50px" />
			</div>
		</router-link>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "Router"
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nav {
	width: 100px;
	box-shadow: 3px -5px 5px 0px black;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
.router-link {
	flex: 0 0 100%;
	opacity: 0.4;
	display: flex;
	justify-content: center;
}
.router-link-exact-active {
	opacity: 0.8;
}
.router-link:hover {
	opacity: 1;
}
.menu-item {
	padding-top: 30px;
}
</style>
