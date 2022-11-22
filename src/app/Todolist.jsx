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
            <thead style={{ color: "cadetblue" }}>
              <tr>
                <th></th>
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

// <table className="centered">
//   <thead>
//   <tr>
//     <th>Ingredients</th>
//     <th>Measure</th>
//   </tr>
//   </thead>
//
//   <tbody>
//   {Object.keys(recipe).map((key) => {
//     if (key.includes("Ingredient") && recipe[key]) {
//       return (
//           <tr key={key}>
//             <td>{recipe[key]}</td>
//             <td>{recipe[`strMeasure${key.slice(13)}`]}</td>
//           </tr>
//       );
//     }
//     return null;
//   })}
//   </tbody>
// </table>
