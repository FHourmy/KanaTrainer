import { render, screen } from "@testing-library/vue";
import ModelCanvas from "../ModelCanvas.vue";
import "@testing-library/jest-dom";

describe("ModelCanvas Component", () => {
	test("Canvas is rendered", () => {
		render(ModelCanvas);
		expect(screen.getByRole("modelcanvas")).not.toBeNull();
	});
});
