import React from "react";
import classes from "./Input.module.css";
const Input = props => {
  return (
    <input
      className={classes.Input}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      style={props.style}
      value={props.value}
      onChange={props.onChange}
      id={props.id}
      checked={props.checked}
      onClick={props.onClick}
    />
  );
};

export default Input;
