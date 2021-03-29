<template>
	<div class="canvas">
		<div>
			<div class="selectdiv">
				You are learning
				<span
					><Select
						id="select-kana"
						:options="[
							{ label: 'Hiraganas', value: 'hira' },
							{ label: 'Katakanas', value: 'kata' }
						]"
						:reduce="(sillabary) => sillabary.value"
						v-model="kanatype"
						:clearable="false"
				/></span>
			</div>
			<div id="currentkana">
				Please draw a "
				{{ `${kanaData.romaji.toUpperCase()} ${kanaData.kana}` }}"
			</div>
			<div>
				<div
					role="button"
					class="custom-button kana-button"
					@click="getNewKana"
				>
					New kana
				</div>
				<div role="button" class="custom-button kana-button" @click="compare">
					Compare
				</div>
			</div>
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
import Select from "vue-select";

export default Vue.extend({
	name: "DrawingTraining",
	components: {
		Drawer,
		Select
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
	margin-top: 15px;
	font-size: 32px;
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
	color: white;
}
.selectdiv {
	display: inline-block;
}
.kana-button {
	margin: 5px;
}
</style>
