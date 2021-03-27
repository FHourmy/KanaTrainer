import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import DrawingTraining from "../DrawingTraining.vue";
import "@testing-library/jest-dom";
import { compareCanvas, getRandomKana } from "@/utils";

//const spy = jest.spyOn(utils, "getRandomKana");
jest.mock("../../utils", () => {
	const utils = jest.requireActual("../../utils");
	return {
		...utils,
		getRandomKana: jest.fn(utils.getRandomKana),
		compareCanvas: jest.fn().mockReturnValue(30)
	};
});
const getLastKana = () =>
	(getRandomKana as jest.Mock).mock.results[
		(getRandomKana as jest.Mock).mock.results.length - 1
	].value.kana;

const getDrawCallsLength = (canvasId: string = "drawablecanvas") => {
	return (document.getElementById(canvasId) as any)
		.getContext("2d")
		.__getDrawCalls().length;
};

describe("Drawing Training", () => {
	beforeAll(() => {});
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("compare button triggers comparison and display a result string", async () => {
		expect(compareCanvas).not.toHaveBeenCalled();
		render(DrawingTraining);
		// called once on render
		expect(compareCanvas).toHaveBeenCalledTimes(1);
		fireEvent.click(screen.getByRole("button", { name: "Compare" }));
		expect(compareCanvas).toHaveBeenCalledTimes(2);
		// wait for to wait state update
		await waitFor(() => screen.getByText("BAD"));
	});

	test("New kana cleans everything and changes displayed kana", async () => {
		expect(getRandomKana).not.toHaveBeenCalled();
		render(DrawingTraining);
		// at render a kana is get
		expect(getRandomKana).toHaveBeenCalledTimes(1);
		expect(screen.getByText(getLastKana(), { exact: false }));

		// draw on canvas
		fireEvent.mouseDown(screen.getByRole("drawablecanvas"));
		fireEvent.mouseMove(screen.getByRole("drawablecanvas"), {
			offsetX: 30,
			offsetY: 30
		});
		const originalDrawsNumber = getDrawCallsLength();

		// trigger new kana
		fireEvent.click(screen.getByRole("button", { name: "new kana" }));

		// new kana get and found
		await waitFor(() => expect(getRandomKana).toHaveBeenCalledTimes(2));
		const afterUndoDrawsNumber = getDrawCallsLength();
		// clear triggered by new kana
		expect(afterUndoDrawsNumber).toBe(originalDrawsNumber + 1);
		expect(screen.getByText(getLastKana(), { exact: false }));
	});

	test("changing kanatype generate a new kana", async () => {
		expect(getRandomKana).not.toHaveBeenCalled();
		render(DrawingTraining);
		// at render a kana is get
		expect(getRandomKana).toHaveBeenCalledTimes(1);
		expect(screen.getByText(getLastKana(), { exact: false }));

		await fireEvent.update(screen.getByRole("select-kana"), "kata");

		expect(getRandomKana).toHaveBeenCalledTimes(2);
		expect(screen.getByText(getLastKana(), { exact: false }));

		await fireEvent.update(screen.getByRole("select-kana"), "hira");

		expect(getRandomKana).toHaveBeenCalledTimes(3);
		expect(screen.getByText(getLastKana(), { exact: false }));
	});
});
