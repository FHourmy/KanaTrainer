<template>
	<div class="canvas">
		<canvas
			:id="id"
			width="300"
			height="300"
			@mousemove="onMouseMove"
			@mousedown="onMouseDown"
			@mouseup="onMouseUp"
			@mouseleave="onMouseUp"
		>
			{{ id }} Désolé, votre navigateur ne prend pas en charge &lt;canvas&gt;.
		</canvas>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "Canvas",
	props: {
		id: String
	},
	data(): {
		canvasContext: CanvasRenderingContext2D | null;
		isMouseDown: boolean;
		x: number;
		y: number;
	} {
		return { canvasContext: null, isMouseDown: false, x: 0, y: 0 };
	},
	methods: {
		onMouseMove: function(e: MouseEvent) {
			this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
			this.x = e.offsetX;
			this.y = e.offsetY;
		},
		onMouseDown: function() {
			this.isMouseDown = true;
		},

		onMouseUp: function() {
			this.isMouseDown = false;
		},
		drawLine: function(x1: number, y1: number, x2: number, y2: number) {
			let ctx = this.canvasContext;
			if (ctx && this.isMouseDown) {
				ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.lineWidth = 1;
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.stroke();
				ctx.closePath();
			}
		}
	},
	mounted() {
		var canvasRef = document.getElementById(this.id) as HTMLCanvasElement;
		this.canvasContext = canvasRef.getContext("2d") as CanvasRenderingContext2D;
	}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
	background-color: antiquewhite;
}
</style>
