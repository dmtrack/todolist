import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleFinishTodo, handleRemoveTodo } from "./store/slices/todoSlice";

function Todo(props) {
  const { id, name, description = "", finishDate = "", completed } = props;
  const dispatch = useDispatch();
  return (
    <>
      <tr>
        <td className="todo">
          <input
            type={"checkbox"}
            className="checkbox"
            checked={completed}
            onChange={() =>
              dispatch(
                handleFinishTodo({
                  id,
                  completed,
                  name,
                  description,
                  finishDate,
                })
              )
            }
          />
        </td>
        <td style={{ textAlign: "center" }}>{name}</td>
        <td style={{ textAlign: "center" }}>{description}</td>
        <td style={{ textAlign: "center" }}>
          {finishDate === "Invalid Date" ? "" : finishDate}
        </td>
        <td style={{ textAlign: "center" }}>
          <button
            className="delete-button-small"
            onClick={() => dispatch(handleRemoveTodo(id))}
          >
            X
          </button>
        </td>
      </tr>
    </>
  );
}

export { Todo };

// return (
//     <div className="todo">
//         <input
//             type={"checkbox"}
//             className="checkbox"
//             checked={completed}
//             onChange={() =>
//                 dispatch(handleFinishTodo({ id, completed, name, description }))
//             }
//         />
//         <div style={{ display: "flex" }}>
//             <div style={{ marginLeft: "15px" }}>{name}</div>
//             <div style={{ marginLeft: "15px" }}>{description.slice(0, 20)}</div>
//             <div style={{ marginLeft: "15px" }}>{finishDate}</div>
//         </div>
//         <button
//             className="delete-button-small"
//             onClick={() => dispatch(handleRemoveTodo(id))}
//         >
//             X
//         </button>
//     </div>
// );
