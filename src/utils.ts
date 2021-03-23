import Pixelmatch from "pixelmatch";
import syllabaire from "./assets/kana.json";

function getRandomKana(
	kanatype: "hira" | "kata" = "hira"
): { kana: string; romaji: string } {
	const keys = Object.keys(syllabaire);
	const randomKey = keys[Math.floor(Math.random() * keys.length)];
	return { kana: (syllabaire as any)[randomKey][kanatype], romaji: randomKey };
}

function compareCanvas(
	canvas1: HTMLCanvasElement,
	canvas2: HTMLCanvasElement,
	width: number,
	height: number
): number {
	const image1 = canvas1.getContext("2d")?.getImageData(0, 0, width, height);
	const image2 = canvas2.getContext("2d")?.getImageData(0, 0, width, height);
	if (image1 && image2) {
		const diff = Pixelmatch(image1.data, image2.data, null, width, height, {
			threshold: 0.95
		});
		return diff;
	}
	return 0;
}

function getDrawingResult(
	currentDiff: number,
	originalDiff: number,
	threshold: number = 60
): string {
	const ratioDiff = (currentDiff / originalDiff) * 100;
	if (ratioDiff < threshold * 0.6) {
		return "EXCELLENT";
	}
	if (ratioDiff < threshold * 0.8) {
		return "VERY GOOD";
	}
	if (ratioDiff < threshold) {
		return "GOOD";
	}
	return "BAD";
}

export { compareCanvas, getDrawingResult, getRandomKana };
