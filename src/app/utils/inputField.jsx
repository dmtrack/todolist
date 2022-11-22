import React from "react";

function InputField(props) {
  const { name, label, value, placeholder, onChange, width } = props;
  return (
    <>
      {" "}
      <label>
        <input
          className="input-nav"
          style={{ marginLeft: "5px", width: width }}
          placeholder={placeholder}
          name={name}
          label={label}
          value={value}
          onChange={(e) => onChange(e.target)}
        />
      </label>
    </>
  );
}

export { InputField };
