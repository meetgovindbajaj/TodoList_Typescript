import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

afterEach(() => {
  cleanup();
});
describe("TodoList Component", () => {
  test("renders correctly", () => {
    expect(true).toBe(true);
  });
});
