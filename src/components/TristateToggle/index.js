import { useState, useEffect } from "react";
import style from "./index.module.css";

export function TristateToggle({ onChange, defaultValue, label, className }) {
  const states = [0, 1, -1];
  const colors = ["#e5e7eb", "#e05858", "#58b358"];

  const [value, setValue] = useState(defaultValue || states[0]);
  const [position, setPosition] = useState(undefined);
  const [bgColor, setBgColor] = useState(colors[0]);

  // trigger onChange callback on value change
  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  // cycle between toggle states
  function onToggle() {
    const nextState = getNextState(value);
    setValue(nextState);

    // map and update position and bgColor
    let pos;
    let bgIndex;
    switch (nextState) {
      case -1:
        pos = "left";
        bgIndex = 1;
        break;
      case 1:
        pos = "right";
        bgIndex = 2;
        break;
      default:
        pos = undefined;
        bgIndex = 0;
    }
    setPosition(pos);
    setBgColor(colors[bgIndex]);
  }

  // retrieve next state, given current state
  function getNextState(currentState) {
    const nextStateIndex = states.indexOf(currentState) + 1;
    return states[nextStateIndex % states.length];
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`${className} flex w-full`}
    >
      <div className={`${style.toggle}`} style={{ backgroundColor: bgColor }}>
        <div
          className={`${style.buttonInnerCircle} ${
            position && style[position]
          }`}
        />
        {states.map((state) => (
          <input
            className="hidden"
            key={state}
            type="radio"
            checked={state === value}
          />
        ))}
      </div>
      {label && <span className="ml-3 text-sm text-left">{label}</span>}
    </button>
  );
}
