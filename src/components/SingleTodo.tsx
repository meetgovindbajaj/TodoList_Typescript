// Imported necessary libraries and component
import React, { useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./style.css";
import { Draggable } from "react-beautiful-dnd";

// Defined interface for props
interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

// Main component
const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
  // Defined state management hooks
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.todo);

  // Handles completion of todo item in list
  const handleDone: (id: number) => void = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // Handles deletion of todo item in list
  const handleDelete: (id: number) => void = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Handles editing of todo item in list
  const handleEdit: (e: React.FormEvent, id: number) => void = (e, id) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editText } : todo))
    );
    setEdit(false);
  };

  // Renders the component
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="todos__single--text"
              autoFocus
            />
          ) : (
            <span className="todos__single--text" data-testid="singleTodo">
              {todo.isDone ? <s>{todo.todo}</s> : todo.todo}
            </span>
          )}

          <div className="icon__container">
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
