import React from "react";

const SmBtn = (props) => {
  return (
    <div type="button" className={props.class} onClick={props.click}>
      {props.text}
    </div>
  );
};

export default SmBtn;
