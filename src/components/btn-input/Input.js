import React from "react";

const Input = (props) => {
  const { id, name, value, update, label, spanID, unit } = props;
  
  return (
    <div className="window__input-container">
      <label htmlFor={id} className="window__label--lg">
        {label}
      </label>
      <input
        type="number"
        id={id}
        name={name}
        value={value}
        onChange={update}
        className="window__input window__input--stat"
        placeholder="0"
      ></input>
      <label id={spanID} className="window__label--sm">
        {unit}
      </label>
    </div>
  );
};

export default Input;
