import React from "react";
import { useDispatch } from "react-redux";
import { handleFinishTodo, handleRemoveTodo } from "./store/slices/todoSlice";
import dayjs from "dayjs";

function Todo(props) {
  const {
    id,
    name,
    description = "",
    finishDate = "",
    completed,
    url = "",
  } = props;
  const dispatch = useDispatch();
  const taskStatus = (status, date) => {
    let style = null;
    if (dayjs().format("DD.MM.YY") > date) {
      style = { color: "red" };
    }
    if (status === true) {
      style = { textDecoration: "line-through" };
    }
    return style;
  };
  const taskStyle = taskStatus(completed, finishDate);
  return (
    <>
      <tr style={taskStyle}>
        <td className="todo">
          <input
            type="checkbox"
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
                  url,
                })
              )
            }
          />
        </td>
        <td style={{ textAlign: "center", width: "350px" }}>{name}</td>
        <td style={{ textAlign: "center", width: "450px" }}>{description}</td>
        <td style={{ textAlign: "center", width: "50px" }}>
          {finishDate === "Invalid Date" ? "" : finishDate}
        </td>
        <td style={{ textAlign: "center", width: "100px" }}>
          <a href={url}>{url.length > 0 ? "link" : ""}</a>
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
