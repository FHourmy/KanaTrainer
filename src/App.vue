<template>
	<div id="app">
		<div id="nav">
			<div class="rlink">
				<router-link to="/">Home</router-link>
			</div>
			<div class="rlink">
				<router-link class="router-link" to="/drawing">Drawing</router-link>
			</div>
		</div>
		<div id="screens">
			<router-view />
		</div>
	</div>
</template>

<style>
html {
	background-color: #16161d;
	color: white;
	height: 100%;
	display: flex;
	flex-grow: 1;
	min-height: 600px;
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

#nav {
	width: 100px;
	box-shadow: 3px -5px 5px 0px black;
}

#screens {
	flex: 1;
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
}
</style>
