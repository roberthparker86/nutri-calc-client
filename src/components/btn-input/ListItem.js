import React from "react";

export default function ListItem (props) {
  const { id, type, changeUI, className, recipeName, calCount, value } = props;

  return (
    <button
      type={type}
      onClick={() => {
        changeUI({
          info: {
            show: true,
            id: id
          }
        });
      }}
      className={className}
      value={value}
    >
      {recipeName} - <span>{calCount}</span>
    </button>
  );
};
