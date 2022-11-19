import React, { useState } from "react";
import { TodoList } from "./Todolist";

function MainPage() {
  const [todos, setTodos] = useState([
    { id: 1, date: "19.11.2022", name: "todo 1", finished: false },
    { id: 2, date: "19.11.2022", name: "todo 2", finished: false },
  ]);

  return (
    <>
      <div className="main-content">
        <div className="container">
          <div className="navi-bar">
            {" "}
            <h1>my todoList</h1>
          </div>
          <div className="first-container">
            <TodoList todos={todos} />
          </div>
        </div>
      </div>
    </>
  );
}
export { MainPage };
