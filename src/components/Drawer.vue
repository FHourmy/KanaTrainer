<template>
	<div class="canvas">
		<div id="canvascontainer">
			<img
				alt="undo-button"
				role="button"
				id="undo-button"
				src="../assets/undo.png"
				height="30px"
				width="30px"
				@click="loadPreviousDrawableCanvasState"
			/>
			<DrawableCanvas @new-line="saveCanvasState" />
			<ModelCanvas :kana="kanaData.kana" />
		</div>
	</div>
</template>

<script lang="ts">
// eslint-disable-next-line
import Vue, { PropType } from "vue";
import DrawableCanvas from "../components/DrawableCanvas.vue";
import ModelCanvas from "../components/ModelCanvas.vue";

export default Vue.extend({
	name: "Drawer",
	components: {
		DrawableCanvas,
		ModelCanvas
	},
	props: {
		kanaData: Object as PropType<{
			romaji: String;
			kana: String;
		}>
	},
	data(): {
		drawableCanvasStates: any[];
	} {
		return {
			drawableCanvasStates: []
		};
	},
	methods: {
		saveCanvasState: function(canvasState: any) {
			if (
				canvasState !==
				this.drawableCanvasStates[this.drawableCanvasStates.length - 1]
			) {
				this.drawableCanvasStates.push(canvasState);
			}
		},
		loadPreviousDrawableCanvasState: function() {
			let ref = document.getElementById("drawablecanvas") as HTMLCanvasElement;
			const ctx = ref.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, 300, 300);
				// draw previous rect if there is one
				if (this.drawableCanvasStates.length - 1 > 0) {
					var canvasPic = new Image();
					canvasPic.src = this.drawableCanvasStates[
						this.drawableCanvasStates.length - 2
					];
					canvasPic.onload = function() {
						ctx?.drawImage(canvasPic, 0, 0);
					};
				}
				this.drawableCanvasStates.pop();
			}
		},
		resetState: function() {
			let ref = document.getElementById("drawablecanvas") as HTMLCanvasElement;
			const ctx = ref.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, 300, 300);
			}
			this.drawableCanvasStates = [];
		}
	},
	watch: {
		kanaData: function() {
			this.resetState();
		}
	}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#undo-button {
	position: absolute;
	z-index: 3;
	margin-left: 120px;
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Old versions of Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none;
}
img {
	margin: auto;
}
#currentkana {
	color: white;
}
#canvascontainer {
	position: relative;
	height: 300px;
}
.good {
	color: green;
}
.bad {
	color: red;
}
.canvas {
	flex: 1;
}
</style>
