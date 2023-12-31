// Imported necessary libraries and component
import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

// Main component
const App: React.FC = () => {
  // Defined necessary variables and state management hooks
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  // Handles the inputs
  const handleAdd: (e: React.FormEvent) => void = (e) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  // Handles drag and drop operations
  const onDragEnd: (result: DropResult) => void = (result) => {
    const { source, destination } = result;
    // returning on no output
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    // cloning states
    let add: Todo,
      active: Todo[] = todos,
      complete: Todo[] = completedTodos;
    // removing dragged todo from source
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    // adding dragged todo to destination
    if (destination.droppableId === "TodosList")
      active.splice(destination.index, 0, add);
    else complete.splice(destination.index, 0, add);
    // applying results to actual states
    setTodos(active);
    setCompletedTodos(complete);
  };

  // Renders the component
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading" data-testid="TodoListHeading">
          Taskify
        </span>

        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
