<template>
	<div>
		<canvas
			role="drawablecanvas"
			id="drawablecanvas"
			:class="canvasStyle"
			width="300"
			height="300"
			@mousemove="onMouseMove"
			@mousedown="onMouseDown"
			@mouseup="onMouseUp"
			@mouseleave="onMouseUp"
		>
			Désolé, votre navigateur ne prend pas en charge &lt;canvas&gt;.
		</canvas>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "drawablecanvas",
	props: {
		canvasStyle: {
			type: String,
			default: "drawablecanvasdefault",
			required: false
		}
	},
	data(): {
		canvasContext: CanvasRenderingContext2D | null;
		isMouseDown: boolean;
		x: number;
		y: number;
	} {
		return {
			canvasContext: null,
			isMouseDown: false,
			x: 0,
			y: 0
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
				ctx.lineCap = "round";
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

			this.$emit("new-line", canvasRef.toDataURL());
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
.drawablecanvasdefault {
	position: absolute;
	background-color: rgba(255, 255, 255, 0.8);
	margin: auto;
	left: 0;
	right: 0;
	z-index: 2;
}
</style>
