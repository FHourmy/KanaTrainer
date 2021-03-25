import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import DrawingTraining from "../DrawingTraining.vue";
import "@testing-library/jest-dom";
import { compareCanvas, getDrawingResult } from "@/utils";

jest.mock("../../utils", () => ({
	...jest.requireActual("../../utils"),
	compareCanvas: jest.fn().mockReturnValue(30)
}));

describe("Drawing Training", () => {
	beforeAll(() => {});
	beforeEach(() => {
		jest.clearAllMocks();
	});
	test("both canvases are rendered", () => {
		render(DrawingTraining);
		expect(screen.getByRole("modelcanvas")).not.toBeNull();
		expect(screen.getByRole("drawablecanvas")).not.toBeNull();
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
	test.todo("undo trigger a clear rect");
	test.todo("New kana cleans everything and changes displayed kana");
});
