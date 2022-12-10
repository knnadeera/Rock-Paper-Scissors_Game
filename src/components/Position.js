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

  const cssClasses = `${classes.silection} ${dynmcClasse}`;

  return (
    <div className={cssClasses} onClick={props.onClick}>
      {amount>0 && <p>{amount}</p>}
      <h2>{props.position}</h2>
    </div>
  );
};

export default Position;
