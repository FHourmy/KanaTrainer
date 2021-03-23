<template>
	<div class="canvas">
		<canvas id="modelcanvas" :class="canvasStyle" width="300" height="300">
			Désolé, votre navigateur ne prend pas en charge &lt;canvas&gt;.
		</canvas>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "ModelCanvas",
	props: {
		canvasStyle: {
			type: String,
			default: "modelcanvasdefault",
			required: false
		},
		kana: String
	},
	watch: {
		kana: function() {
			this.drawKana();
		}
	},
	data(): {
		canvasContext: CanvasRenderingContext2D | null;
	} {
		return { canvasContext: null };
	},
	methods: {
		drawKana: function() {
			if (this.canvasContext) {
				this.canvasContext.clearRect(0, 0, 300, 300);
				this.canvasContext.font = "350px Arial";
				this.canvasContext.fillText(this.kana, -25, 280);
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
.modelcanvasdefault {
	background-color: white;
	position: absolute;
	margin: auto;
	left: 0;
	right: 0;
}
</style>
