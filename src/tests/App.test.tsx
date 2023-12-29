import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

afterEach(() => {
  cleanup();
});
describe("App Component", () => {
  test("renders taskify heading", () => {
    render(<App />);
    const headingElement = screen.getByTestId("TodoListHeading");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Taskify");
  });
});
