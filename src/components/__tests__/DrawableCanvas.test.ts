import { fireEvent, render, screen } from "@testing-library/vue";
import DrawableCanvas from "../DrawableCanvas.vue";
import "@testing-library/jest-dom";

describe("DrawableCanvas Component", () => {
	it("Canvas is rendered", () => {
		render(DrawableCanvas);
		expect(screen.getByRole("drawablecanvas")).not.toBeNull();
	});
	test("Clicking + moving draws on canvas", () => {
		render(DrawableCanvas);
		// sadly canvases must be tested this way because we have to use a mock that doesn't change the dom
		const originalDraws = (document.getElementById("drawablecanvas") as any)
			.getContext("2d")
			.__getDrawCalls();
		fireEvent.mouseDown(screen.getByRole("drawablecanvas"));
		fireEvent.mouseMove(screen.getByRole("drawablecanvas"), {
			offsetX: 30,
			offsetY: 30
		});
		const newDraws = (document.getElementById("drawablecanvas") as any)
			.getContext("2d")
			.__getDrawCalls();
		expect(originalDraws.length).toBe(0);
		expect(newDraws.length).toBe(1);
	});
	test("moving without clicking doesn't draw on canvas", () => {
		render(DrawableCanvas);
		const originalDraws = (document.getElementById("drawablecanvas") as any)
			.getContext("2d")
			.__getDrawCalls();
		fireEvent.mouseMove(screen.getByRole("drawablecanvas"), {
			offsetX: 30,
			offsetY: 30
		});
		const newDraws = (document.getElementById("drawablecanvas") as any)
			.getContext("2d")
			.__getDrawCalls();
		expect(originalDraws.length).toBe(0);
		expect(newDraws.length).toBe(0);
	});
});
