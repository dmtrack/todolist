import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  handleRemoveTodo,
  removeTodo,
  toggleTodo,
} from "./store/slices/todoSlice";

function Todo(props) {
  const { id, name, description = "", finishDate = null, completed } = props;

  const dispatch = useDispatch();

  return (
    <div className="todo">
      <input
        type={"checkbox"}
        className="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleTodo(id))}
      />
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "15px" }}>{name}</div>
        <div style={{ marginLeft: "15px" }}>{description.slice(0, 20)}</div>
      </div>
      <button
        className="delete-button-small"
        onClick={() => dispatch(handleRemoveTodo(id))}
      >
        X
      </button>
    </div>
  );
}

export { Todo };
