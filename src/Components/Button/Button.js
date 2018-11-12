import React from "react";
import classes from "./Button.module.css";
const Button = props => {
  return (
    <button className={classes.Button} type={props.type}>
      {props.value}
    </button>
  );
};

export default Button;
