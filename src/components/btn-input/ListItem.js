import React from "react";

const ListItem = (props) => {

  return (
    <button
      type={props.type}
      onClick={() => {
        props.changeState({
          info: {
            show: true,
            id: props.id
          }
        });
      }}
      className={props.className}
      value={props.value}
    >
      {props.recipeName} - <span>{props.calCount}</span>
    </button>
  );
};

export default ListItem;
