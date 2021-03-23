<template>
	<div class="canvas">
		<div>
			<select v-model="kanatype">
				<option>hira</option>
				<option>kata</option> </select
			><button @click="compare">
				Compare
			</button>
		</div>
		<div id="canvascontainer">
			<DrawableCanvas @new-line="saveCanvasState" />
			<ModelCanvas :kanatype="kanatype" />
		</div>
		<button @click="loadPreviousDrawableCanvasState">
			undo
		</button>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import DrawableCanvas from "../components/DrawableCanvas.vue";
import ModelCanvas from "../components/ModelCanvas.vue";
import pixelmatch from "pixelmatch";

export default Vue.extend({
	name: "DrawingTraining",
	components: {
		DrawableCanvas,
		ModelCanvas
	},
	props: {},
	data(): {
		drawableCanvasStates: any[];
		kanatype: "hira" | "kata";
	} {
		return {
			kanatype: "hira",
			drawableCanvasStates: []
		};
	},
	methods: {
		compare: function() {
			const drawablecanvas = document.getElementById(
				"drawablecanvas"
			) as HTMLCanvasElement;
			const modelcanvas = document.getElementById(
				"modelcanvas"
			) as HTMLCanvasElement;
			const drawableImage = drawablecanvas
				.getContext("2d")
				?.getImageData(0, 0, 300, 300);
			const modelImage = modelcanvas
				.getContext("2d")
				?.getImageData(0, 0, 300, 300);
			if (drawableImage && modelImage) {
				// const diffImage = new ImageData(300, 300);
				const diff = pixelmatch(
					drawableImage.data,
					modelImage.data,
					null,
					300,
					300,
					{ threshold: 0.5 }
				);
				console.log(diff);
			}
		},
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
				console.log(this.drawableCanvasStates.length);
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
		}
	}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#canvascontainer {
	position: relative;
	height: 300px;
}
</style>
