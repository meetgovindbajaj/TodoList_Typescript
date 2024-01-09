import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Todo } from "../model";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import SingleTodo from "../components/SingleTodo";
Enzyme.configure({ adapter: new Adapter() });
afterEach(() => {
  cleanup();
});
const todo = { id: 1, todo: "hello", isDone: false };
const todos: Todo[] = [];
const setTodo = jest.fn();
const useTodo = jest.spyOn(React, "useState");
setTodo.mockImplementation((init) => [init, useTodo]);

const setTodos = jest.fn();
const useTodos = jest.spyOn(React, "useState");
setTodos.mockImplementation((init) => [init, useTodos]);

const wrapper = shallow(
  <SingleTodo todo={todo} setTodos={setTodos} todos={todos} index={1} />
);
// describe("InputField Component", () => {
//   it("should update state on input change", () => {
//     const newInputValue = "React is Awesome";
//     wrapper
//       .find(".input__box")
//       .simulate("change", { target: { value: newInputValue } });
//     expect(setTodo).toHaveBeenCalledWith(newInputValue);
//   });
// });
describe("Single Todo Component", () => {
  test("should have todo item", () => {
    render(
      <SingleTodo todo={todo} setTodos={setTodos} todos={todos} index={1} />
    );
    const singleTodo = screen.getByTestId("singleTodo");
    expect(singleTodo).toBeInTheDocument();
    expect(singleTodo).toHaveTextContent("/hello/i");
  });
});
