import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputField from "../components/InputField";
import React from "react";
import { Todo } from "../model";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
Enzyme.configure({ adapter: new Adapter() });
afterEach(() => {
  cleanup();
});
const todo = "hello";
const todos: Todo[] = [];
const setTodo = jest.fn();
const useTodo = jest.spyOn(React, "useState");
setTodo.mockImplementation((init) => [init, useTodo]);

const setTodos = jest.fn();
const useTodos = jest.spyOn(React, "useState");
setTodos.mockImplementation((init) => [init, useTodos]);
const handleAdd: (e: React.FormEvent) => void = (e) => {
  e.preventDefault();
  if (todo) {
    setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
    setTodo("");
  }
};
const wrapper = shallow(
  <InputField todo={"hello"} setTodo={setTodo} handleAdd={handleAdd} />
);
describe("InputField Component", () => {
  it("should update state on input change", () => {
    const newInputValue = "React is Awesome";
    wrapper
      .find(".input__box")
      .simulate("change", { target: { value: newInputValue } });
    expect(setTodo).toHaveBeenCalledWith(newInputValue);
  });
});
