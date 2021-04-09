import React from "react";

export default function InfoField (props) {
  const { name, value, unit } = props;
  
  return (
    <div className="window__stat">
      <p>
        {name} <span>{value}</span> {unit}
      </p>
    </div>
  );
};
