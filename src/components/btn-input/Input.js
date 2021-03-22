import React from "react";

const Input = (props) => {
  return (
    <div className="window__input-container">
      <label htmlFor={props.id} className="window__label--lg">
        {props.label}
      </label>
      <input
        type="number"
        id={props.id}
        className="window__input window__input--stat"
        placeholder="0"
      ></input>
      <label id={props.spanID} className="window__label--sm">
        {props.unit}
      </label>
    </div>
  );
};

export default Input;
