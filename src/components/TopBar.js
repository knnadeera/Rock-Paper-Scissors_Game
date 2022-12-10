import React, { Fragment } from "react";
import classes from "./TopBar.module.css";

const TopBar = (props) => {
  return (
    <Fragment>
      <div className={classes.topBar}>
        <h1>
          BALANCE: <p>{props.balance}</p>
        </h1>
        <h1>
          BET:<p>{props.bet}</p>
        </h1>
        <h1>
          WIN:<p>{props.win}</p>
        </h1>
      </div>
    </Fragment>
  );
};

export default TopBar;
