import React from "react";

export default function SmBtn (props) {
  return (
    <div type="button" className={props.class} onClick={props.click}>
      {props.text}
    </div>
  );
};
