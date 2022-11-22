import React from "react";
import { Todo } from "./Todo";
import { useSelector } from "react-redux";
import { Preloader } from "./utils/Preloader";

function TodoList() {
  const todos = useSelector((state) => state.todos.entities);
  const loading = useSelector((state) => state.todos.loading);
  return (
    <div className="todo-list">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <table>
            <thead style={{ color: "#ccc" }}>
              <tr>
                <th>Completed</th>
                <th>Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>File</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export { TodoList };
