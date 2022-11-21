import React from "react";
import { Todo } from "./Todo";
import { useSelector } from "react-redux";
import { Preloader } from "./utils/Preloader";

function TodoList({ remove, checked }) {
  const todos = useSelector((state) => state.todos.entities);
  const loading = useSelector((state) => state.todos.loading);

  return (
    <div className="todo-list">
      {loading ? (
        <Preloader />
      ) : (
        todos.map((todo) => (
          <Todo key={todo.id} {...todo} remove={remove} checked={checked} />
        ))
      )}
    </div>
  );
}

export { TodoList };
