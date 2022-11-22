import React, { useEffect, useState } from "react";
import { TodoList } from "./Todolist";
import { InputField } from "./utils/inputField";
import { useDispatch } from "react-redux";
import { fetchTodos, handleAddTodo } from "./store/slices/todoSlice";

function MainPage() {
  const [data, setData] = useState({
    name: "",
    description: "",
    finishDate: "",
    file: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
    // eslint-disable-next-line
  }, []);

  const addTask = () => {
    if (data.name) {
      dispatch(handleAddTodo(data));
      setData({ name: "", description: "", finishDate: "", file: "" });
    }
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
          <h1>todoList</h1>
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
          <input
            className="input-nav"
            style={{ fontSize: "13px", marginLeft: "5px" }}
            type="date"
            id="finishDate"
            name="finishDate"
            value={data.finishDate}
            label="finishDate"
            onChange={(event) => handleChange(event.target)}
          />
          <input
            className="file-input"
            style={{
              fontSize: "15px",
              marginLeft: "5px",
              color: "#ccc",
            }}
            type="file"
            id="file"
            name="file"
            value={data.file}
            label="file"
            onChange={(event) => handleChange(event.target)}
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
