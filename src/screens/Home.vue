<template>
	<div id="home">
		<div id="home-text">
			<h2 id="home-title">かな ツレイナ</h2>
			<p>Welcome to KanaTrainer, start by picking an activity</p>
		</div>
		<div id="home-links">
			<router-link class="router-link" to="/drawing" role="nav-button">
				<div class="menu-item">
					<img src="../assets/brush.png" height="50px" width="50px" />
					<div>Draw</div>
				</div>
			</router-link>
			<router-link class="router-link" to="/identify" role="nav-button">
				<div class="menu-item">
					<img src="../assets/view.png" height="50px" width="50px" />
					<div>Identify</div>
				</div>
			</router-link>
			<router-link class="router-link" to="/IdentifyAndDraw" role="nav-button">
				<div class="menu-item">
					<img src="../assets/identifyAndDraw.png" height="50px" width="50px" />
					<div>Draw and Identify</div>
				</div>
			</router-link>
			<router-link class="router-link" to="/stats" role="nav-button">
				<div class="menu-item">
					<img src="../assets/stats.png" height="50px" width="50px" />
					<div>Your stats</div>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: "Home",
	components: {}
};
</script>
<style scoped>
#home {
	flex: 1;
}
#home-text {
	color: white;
	margin-bottom: 50px;
}
#home-title {
	font-size: 72px;
	margin: 0;
}
#home-links {
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}
.menu-items {
	color: white;
	text-decoration: none;
}
.router-link {
	width: 100px;
	text-decoration: none;
	color: white;
	padding: 10px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 10px;
	transition-property: background-color;
	transition-duration: 0.5s;
}
.router-link:hover {
	background-color: rgba(255, 255, 255, 0.1);
}
</style>
