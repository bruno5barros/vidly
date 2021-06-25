import React from "react";

const Input = ({ name, label, value, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="email"
        className="form-control"
        id={name}
        aria-describedby="emailHelp"
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
