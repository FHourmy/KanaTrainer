<template>
	<div class="canvas">
		<div>
			<div>
				<select role="select-kana" v-model="kanatype">
					<option>hira</option>
					<option>kata</option>
				</select>
			</div>
			<div>
				<button @click="getNewKana">
					new kana
				</button>
			</div>

			<button @click="compare">
				Compare
			</button>
		</div>
		<div id="currentkana">
			{{ `${kanaData.romaji.toUpperCase()} ${kanaData.kana}` }}
		</div>
		<Drawer :kanaData="kanaData" />
		<div :class="drawingResult === 'BAD' ? 'bad' : 'good'">
			{{ drawingResult }}
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Drawer from "../components/Drawer.vue";
import { compareCanvas, getDrawingResult, getRandomKana } from "@/utils";

export default Vue.extend({
	name: "DrawingTraining",
	components: {
		Drawer
	},
	props: {},
	data(): {
		kanatype: "hira" | "kata";
		originalDiff: number;
		currentDiff: number;
		drawingResult: string;
	} {
		return {
			kanatype: "hira",
			originalDiff: -1,
			currentDiff: -1,
			drawingResult: ""
		};
	},
	computed: {
		kanaData(): { kana: string; romaji: string } {
			return getRandomKana(this.kanatype);
		}
	},
	methods: {
		// hacky way to retrigger computation of kana (we fake a change in kanatype)
		getNewKana: function() {
			if (this.kanatype === "hira") {
				this.kanatype = "kata";
				this.kanatype = "hira";
			} else {
				this.kanatype = "hira";
				this.kanatype = "kata";
			}
			this.resetState();
		},
		compare: function() {
			// eslint-disable-next-line
			this.currentDiff = compareCanvas(
				document.getElementById("drawablecanvas") as HTMLCanvasElement,
				document.getElementById("modelcanvas") as HTMLCanvasElement,
				300,
				300
			);
			this.drawingResult = getDrawingResult(
				this.currentDiff,
				this.originalDiff
			);
		},
		resetState: function() {
			this.originalDiff = compareCanvas(
				document.getElementById("drawablecanvas") as HTMLCanvasElement,
				document.getElementById("modelcanvas") as HTMLCanvasElement,
				300,
				300
			);
			this.drawingResult = "";
		}
	},
	mounted() {
		this.originalDiff = compareCanvas(
			document.getElementById("drawablecanvas") as HTMLCanvasElement,
			document.getElementById("modelcanvas") as HTMLCanvasElement,
			300,
			300
		);
	}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
