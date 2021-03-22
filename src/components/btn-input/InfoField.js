import React from "react";

const InfoField = (props) => {
  return (
    <div className="window__stat">
      <p>
        {props.name} <span>{props.value}</span> {props.unit}
      </p>
    </div>
  );
};

export default InfoField;
