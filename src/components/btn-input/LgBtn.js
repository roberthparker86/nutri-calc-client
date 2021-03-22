import React from "react";

const LgBtn = (props) => {
  const { btnClass, click, text } = props;
  return (
    <button type="button" className={btnClass} onClick={click}>
      {text}
    </button>
  );
};

export default LgBtn;
