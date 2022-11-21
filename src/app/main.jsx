import React, { useEffect, useState } from "react";
import { TodoList } from "./Todolist";
import { InputField } from "./utils/inputField";
import { useDispatch } from "react-redux";
import { addTodo, fetchTodos } from "./store/slices/todoSlice";

function MainPage() {
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const addTask = () => {
    if (data.name) dispatch(addTodo(data));
    setData({ name: "", description: "" });
  };

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  return (
    <>
      <div className="main-content">
        <div className="navi-bar">
          {" "}
          <h1>my todoList</h1>
        </div>
        <div className="first-container">
          <button className="button-small" onClick={() => addTask()}>
            add todo
          </button>
          <InputField
            name="name"
            placeholder="name"
            value={data.name}
            label="name"
            onChange={handleChange}
            width="200px"
          />
          <InputField
            name="description"
            placeholder="description"
            value={data.description}
            label="description"
            onChange={handleChange}
            width="270px"
          />
        </div>
        <div className="second-container">
          <TodoList />
        </div>
      </div>
    </>
  );
}
export { MainPage };
