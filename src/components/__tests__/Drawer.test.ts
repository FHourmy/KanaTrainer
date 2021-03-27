import { fireEvent, render, screen } from "@testing-library/vue";
import Drawer from "../Drawer.vue";
import "@testing-library/jest-dom";

const getDrawCallsLength = (canvasId: string = "drawablecanvas") => {
	return (document.getElementById(canvasId) as any)
		.getContext("2d")
		.__getDrawCalls().length;
};
const mockProps = {
	props: {
		kanaData: {
			romaji: "test-romaji",
			kana: "test-kana"
		}
	}
};
describe("Drawer component", () => {
	test("both canvases are rendered", () => {
		render(Drawer, mockProps);
		expect(screen.getByRole("modelcanvas")).not.toBeNull();
		expect(screen.getByRole("drawablecanvas")).not.toBeNull();
	});
	test("undo trigger a clear rect", () => {
		render(Drawer, mockProps);
		fireEvent.mouseDown(screen.getByRole("drawablecanvas"));
		fireEvent.mouseMove(screen.getByRole("drawablecanvas"), {
			offsetX: 30,
			offsetY: 30
		});
		fireEvent.mouseUp(screen.getByRole("drawablecanvas"));
		const originalDrawsNumber = getDrawCallsLength();

		fireEvent.click(screen.getByAltText("undo-button"));
		const afterUndoDrawsNumber = getDrawCallsLength();

		// clear being a "draw call" we compare the number of draws. Can't find a better way
		expect(afterUndoDrawsNumber).toBeGreaterThan(originalDrawsNumber);
	});
});
