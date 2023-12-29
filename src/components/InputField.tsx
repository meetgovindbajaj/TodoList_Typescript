// Imported necessary libraries and component
import React, { useRef } from "react";
import "./style.css";

// Defined interface for props
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

// Main component
const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  // Defined necessary variables
  const inputRef = useRef<HTMLInputElement>(null);
  // Renders the component
  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        data-testid="TodoListInput"
        type="text"
        ref={inputRef}
        placeholder="Enter a task"
        className="input__box"
        autoFocus
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      <button type="submit" className="input__submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
