<template>
	<div class="canvas">
		<select v-model="kanatype">
			<option>hira</option>
			<option>kata</option>
		</select>
		<DrawableCanvas />
		<canvas id="modelcanvas" width="300" height="300">
			Désolé, votre navigateur ne prend pas en charge &lt;canvas&gt;.
		</canvas>
		<button>
			Compare
		</button>
	</div>
</template>

<script lang="ts">
import { getRandomKana } from "@/utils";
import Vue from "vue";
import DrawableCanvas from "../components/DrawableCanvas.vue";
export default Vue.extend({
	name: "DrawingTraining",
	components: {
		DrawableCanvas
	},
	props: {},
	data(): {
		canvasContext: CanvasRenderingContext2D | null;
		kanatype: "hira" | "kata";
	} {
		return {
			kanatype: "hira",
			canvasContext: null
		};
	},
	methods: {
		drawKana: function() {
			if (this.canvasContext) {
				this.canvasContext.clearRect(0, 0, 300, 300);
				this.canvasContext.font = "350px Arial";
				this.canvasContext.fillText(getRandomKana(this.kanatype), -25, 280);
			}
		}
	},
	updated() {
		this.drawKana();
	},
	mounted() {
		const canvasRef = document.getElementById(
			"modelcanvas"
		) as HTMLCanvasElement;
		this.canvasContext = canvasRef.getContext("2d") as CanvasRenderingContext2D;
		this.drawKana();
	}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#modelcanvas {
	background-color: antiquewhite;
}
</style>
