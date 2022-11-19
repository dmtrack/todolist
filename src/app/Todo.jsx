import React, { useState } from "react";

function Todo(props) {
  const { id, name, date, finished } = props;
  const [text, setText] = useState("");

  const handleChange = (target) => {
    setText((prevState) => target.value);
    console.log(text);
  };
  return (
    <div className="todo">
      <div>{name}</div>
      <label>
        <input value={text} onChange={() => handleChange} />
      </label>
    </div>
  );
}

export { Todo };
