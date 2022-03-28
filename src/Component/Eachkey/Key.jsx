import React, { useContext } from "react";
import { AppContext } from "../../App";
import "./Key.css";

function Key({ value, entDel, disabled, good, almost }) {
  const {
    onSelectLetter,
    onDelete,
    onEnter,
  } = useContext(AppContext);

  const letterMap = () => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(value);
    }
  };
  return (
    <div className="keystyle" id={entDel ? "entDel": disabled && "disabled"|| good && 'good'|| almost && 'almost'} onClick={letterMap}>
      {value}
    </div>
  );
}

export default Key;
