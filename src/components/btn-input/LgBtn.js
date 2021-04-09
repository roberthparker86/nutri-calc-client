import React from "react";

export default function LgBtn (props) {
  const { btnClass, click, text } = props;
  return (
    <button type="button" className={btnClass} onClick={click}>
      {text}
    </button>
  );
};
