import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import Key from "../Eachkey/Key";
import "./Keyboard.css";

function Keyboard() {

  const {onEnter, onDelete, onSelectLetter, disabledLetters, goodLetters, almostLetters, currentAttempt} = useContext(AppContext);
  const topKey = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const midKey = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomKey = ["Z", "X", "C", "V", "B", "N", "M"];

  const [_disabled, setDisabled] = useState([])
  const [_good, setGood] = useState([])
  const [_almost, setAlmost] = useState([])
  const handleKeyboard = useCallback((e) => {
    switch (e.key) {
      case "Enter" :
        onEnter();
        break;
      case "Backspace" :
        onDelete();
        break;
      default :
      if ([...topKey, ...midKey, ...bottomKey].includes(e.key.toUpperCase())) {
        onSelectLetter(e.key.toUpperCase());
      }
    }
  })

  useEffect(() => {
    setDisabled(disabledLetters);
    setGood(goodLetters);
    setAlmost(almostLetters);
  }, [currentAttempt.attempt])

  useEffect(()=> {
    document.addEventListener("keydown", handleKeyboard)

    return () => {
      document.removeEventListener("keydown", handleKeyboard)
    }
  },[handleKeyboard]);
  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="qwerty">
        {topKey.map((key) => {
          return <Key value={key} disabled = {_disabled.includes(key)} good = {_good.includes(key)} almost = {_almost.includes(key)}/>;
        })}
      </div>
      <div className="asdfgh">
        {midKey.map((key) => {
          return <Key value={key} disabled = {_disabled.includes(key)} good = {_good.includes(key)} almost = {_almost.includes(key)}/>;
        })}
      </div>
      <div className="zxcvbn">
        <Key value = {"ENTER"} entDel />
        {bottomKey.map((key) => {
          return <Key value={key} disabled = {_disabled.includes(key)} good = {_good.includes(key)} almost = {_almost.includes(key)}/>;
        })}
        <Key value = {"DELETE"} entDel/>
      </div>
    </div>
  );
}

export default Keyboard;
