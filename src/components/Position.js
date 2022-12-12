import React from "react";
import classes from "./Position.module.css";

const Position = (props) => {
  let dynmcClasse = "";

  const amount = props.amount;

  if (props.position === "ROCK") {
    dynmcClasse = classes.rock;
  }

  if (props.position === "PAPER") {
    dynmcClasse = classes.paper;
  }

  if (props.position === "SCISSORS") {
    dynmcClasse = classes.scissors;
  }

  const cssClasses = `${classes.selection} ${dynmcClasse}`;

  return (
    <div className={cssClasses} onClick={props.onClick}>
      {amount>0 && <h1>{amount}</h1>}
      <h2>{props.position}</h2>
    </div>
  );
};

export default Position;
