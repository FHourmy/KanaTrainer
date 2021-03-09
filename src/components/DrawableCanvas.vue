<template>
	<div class="canvas">
		<canvas
			id="drawablecanvas"
			width="300"
			height="300"
			@mousemove="onMouseMove"
			@mousedown="onMouseDown"
			@mouseup="onMouseUp"
			@mouseleave="onMouseUp"
		>
			Désolé, votre navigateur ne prend pas en charge &lt;canvas&gt;.
		</canvas>
		<button @click="loadPreviousCanvasState">
			Undo
		</button>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "drawablecanvas",
	props: {},
	data(): {
		canvasContext: CanvasRenderingContext2D | null;
		canvasStates: any[];
		isMouseDown: boolean;
		x: number;
		y: number;
	} {
		return {
			canvasContext: null,
			isMouseDown: false,
			x: 0,
			y: 0,
			canvasStates: []
		};
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
			this.saveCanvasState();
		},
		drawLine: function(x1: number, y1: number, x2: number, y2: number) {
			let ctx = this.canvasContext;
			if (ctx && this.isMouseDown) {
				ctx.beginPath();
				ctx.strokeStyle = "black";
				ctx.lineCap = "square";
				ctx.lineWidth = 14;
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.stroke();
				ctx.closePath();
			}
		},
		saveCanvasState: function() {
			const canvasRef = document.getElementById(
				"drawablecanvas"
			) as HTMLCanvasElement;
			if (
				canvasRef.toDataURL() !==
				this.canvasStates[this.canvasStates.length - 1]
			) {
				this.canvasStates.push(canvasRef.toDataURL());
			}
		},
		loadPreviousCanvasState: function() {
			let ctx = this.canvasContext;
			if (ctx) {
				ctx.clearRect(0, 0, 300, 300);
				// draw previous rect if the is one
				if (this.canvasStates.length - 1 > 0) {
					var canvasPic = new Image();
					canvasPic.src = this.canvasStates[this.canvasStates.length - 2];
					canvasPic.onload = function() {
						ctx?.drawImage(canvasPic, 0, 0);
					};
				}
				this.canvasStates.pop();
			}
		}
	},
	mounted() {
		const canvasRef = document.getElementById(
			"drawablecanvas"
		) as HTMLCanvasElement;
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
