import { compareCanvas, getDrawingResult, getRandomKana } from "@/utils";
import syllabaire from "../assets/kana.json";
import Pixelmatch from "pixelmatch";

jest.mock("PixelMatch", () => ({
	__esModule: true,
	default: jest.fn().mockReturnValue(0)
}));
describe("getRandomKana function", () => {
	test("returns a single kana of the desired type", () => {
		const result = getRandomKana();
		const exists = Object.values(syllabaire).find(
			(value) => value.kata === result.kana || value.hira === result.kana
		);
		expect(result.kana).not.toBeNull();
		expect(result.romaji).not.toBeNull();
		expect(exists).not.toBeUndefined();
	});
});

describe("compareCanvas function", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("2 equals canvas returns 0", () => {
		(Pixelmatch as jest.Mock).mockReturnValue(0);
		// setup canvas, no really usefull because we mock PixelMatch
		const canvas = document.createElement("canvas");
		canvas.width = 300;
		canvas.height = 300;
		expect(Pixelmatch).not.toHaveBeenCalled();
		expect(compareCanvas(canvas, canvas, 300, 300)).toBe(0);
		expect(Pixelmatch).toHaveBeenCalled();
	});

	test("2 different canvas returns a diff", () => {
		const expectedDiff = 9999;

		// setup different canvas, not really usefull as i can't get PixelMatch to give a different result than 0
		const canvas1 = document.createElement("canvas");
		let canvas1Value = new ImageData(300, 300);
		for (let i = 0; i < canvas1Value.data.length; i++) {
			canvas1Value.data[i] = Math.random() * 255;
		}
		const canvas2 = document.createElement("canvas");
		let canvas2Value = new ImageData(300, 300);
		for (let i = 0; i < canvas2Value.data.length; i++) {
			canvas2Value.data[i] = Math.random() * 255;
		}
		canvas2.getContext = jest.fn().mockReturnValue({
			getImageData: jest.fn().mockReturnValue(canvas2Value)
		});
		canvas1.getContext = jest.fn().mockReturnValue({
			getImageData: jest.fn().mockReturnValue(canvas1Value)
		});

		// We mock Pixelmatch because i can't get to get another result than 0 in jest tests
		(Pixelmatch as jest.Mock).mockReturnValue(expectedDiff);

		expect(Pixelmatch).not.toHaveBeenCalled();
		expect(compareCanvas(canvas1, canvas2, 300, 300)).toBe(expectedDiff);
		expect(Pixelmatch).toHaveBeenCalled();
	});

	test.each([
		[
			{ ...document.createElement("canvas"), getContext: jest.fn() },
			document.createElement("canvas")
		],
		[
			document.createElement("canvas"),
			{ ...document.createElement("canvas"), getContext: jest.fn() }
		],
		[
			{ ...document.createElement("canvas"), getContext: jest.fn() },
			{ ...document.createElement("canvas"), getContext: jest.fn() }
		]
	])(
		"if can't get context of one or both canvas returns 0",
		(canvas1, canvas2) => {
			canvas1.getContext = jest.fn();
			canvas1.getContext = jest.fn();
			expect(Pixelmatch).not.toHaveBeenCalled();
			expect(compareCanvas(canvas1, canvas2, 300, 300)).toBe(0);
			// in those cases Pixelmatch shouldn't be called
			expect(Pixelmatch).not.toHaveBeenCalled();
		}
	);
});

describe("getDrawingResult function", () => {
	test("if ratio < threshold * 0.6 returns EXCELLENT", () => {
		expect(getDrawingResult(350, 1000, 60)).toBe("EXCELLENT");
	});
	test("if ratio < threshold * 0.8 returns Very Good", () => {
		expect(getDrawingResult(470, 1000, 60)).toBe("VERY GOOD");
	});
	test("if ratio < threshold * 1 returns Excellent", () => {
		expect(getDrawingResult(590, 1000, 60)).toBe("GOOD");
	});
	test("if ratio > threshold returns Bad", () => {
		expect(getDrawingResult(1000, 1000, 60)).toBe("BAD");
	});
});
