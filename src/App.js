import { Fragment, useState } from "react";
import classes from "./App.module.css";
import Position from "./components/Position";
import TopBar from "./components/TopBar";

function App() {
  const [rockState, setRockState] = useState(false);
  const [paperState, setPaperState] = useState(false);
  const [scissorsState, setScissorsState] = useState(false);
  const [error, setError] = useState(false);
  const [played, setPlayed] = useState(false);
  const [rBetValue, setRBetValue] = useState(0);
  const [pBetValue, setPBetValue] = useState(0);
  const [sBetValue, setSBetValue] = useState(0);
  const [pcWin, setPcWin] = useState(false);
  const [playerWin, setPlayerWin] = useState(false);
  const [pcPosition, setPcPosition] = useState("");
  const [winValue, setWinValue] = useState(0);
  const [balance, setBalance] = useState(5000);

  const gameValue = ["ROCK", "PAPER", "SCISSORS"];

  let totalBet = rBetValue + pBetValue + sBetValue;

  //winning states

  const rockPositionHandler = () => {
    if (!!paperState && !!scissorsState && !played) {
      setError(true);
    } else if (!played && balance !== totalBet) {
      setRockState(true);
      setRBetValue(rBetValue + 500);
    }
  };

  const paperPositionHandler = () => {
    if (!!rockState && !!scissorsState && !played) {
      setError(true);
    } else if (!played && balance !== totalBet) {
      setPaperState(true);
      setPBetValue(pBetValue + 500);
    }
  };

  const scissorsPositionHandler = () => {
    if (!!rockState && !!paperState && !played) {
      setError(true);
    } else if (!played && balance !== totalBet) {
      setScissorsState(true);
      setSBetValue(sBetValue + 500);
    }
  };

  const playButtonHandler = () => {
    const random = Math.floor(Math.random() * gameValue.length);

    if (!error && !rockState && !paperState && !scissorsState) {
      return;
    }

    // winning comparison

    if (
      rockState &&
      (gameValue[random] === "ROCK" || gameValue[random] === "PAPER")
    ) {
      setPcWin(true);
      setBalance(balance - +totalBet);
    } else if (rockState && gameValue[random] === "SCISSORS") {
      setPlayerWin(true);

      (scissorsState || paperState) &&
        setWinValue(winValue + +rBetValue * 3) &&
        setBalance(balance - +rBetValue + +rBetValue * 3);

      !scissorsState &&
        !paperState &&
        setWinValue(winValue + +rBetValue * 14) &&
        setBalance(balance - +rBetValue + +rBetValue * 14);
    }

    if (
      paperState &&
      (gameValue[random] === "PAPER" || gameValue[random] === "SCISSORS")
    ) {
      setPcWin("paper");
      setBalance(balance - +pBetValue);
    } else if (paperState && gameValue[random] === "ROCK") {
      setPlayerWin("paper");

      (rockState || scissorsState) &&
        setWinValue(winValue + +pBetValue * 3) &&
        setBalance(balance - +pBetValue + +pBetValue * 3);

      !rockState &&
        !scissorsState &&
        setWinValue(winValue + +pBetValue * 14) &&
        setBalance(balance - +pBetValue + +pBetValue * 14);
    }

    if (
      scissorsState &&
      (gameValue[random] === "SCISSORS" || gameValue[random] === "ROCK")
    ) {
      setPcWin("scissors");
      setBalance(balance - +sBetValue);
    } else if (scissorsState && gameValue[random] === "PAPER") {
      setPlayerWin("scissors");

      (paperState || rockState) &&
        setWinValue(winValue + +sBetValue * 3) &&
        setBalance(balance - +sBetValue + +sBetValue * 3);

      !paperState &&
        !rockState &&
        setWinValue(winValue + +sBetValue * 14) &&
        setBalance(balance - +sBetValue + +sBetValue * 14);
    }
    setPcPosition(gameValue[random]);

    setPlayed(true);
  };

  const clearButtonHandler = () => {
    setRBetValue(0);
    setPBetValue(0);
    setSBetValue(0);
    setError(false);
    setRockState(false);
    setPaperState(false);
    setScissorsState(false);
    setPlayed(false);
    setPcWin(false);
    setPlayerWin(false);
    setPcPosition("");
  };

  const result = (
    <Fragment>
      <div>
        {playerWin && (
          <div>
            <h2 className={classes.won}>YOU WON</h2>
            <p>YOU WIN:</p>
          </div>
        )}
        {pcWin && !playerWin && <h2 className={classes.loose}>YOU LOOSE</h2>}{" "}
        <div className={classes.result}>
          {(rockState || paperState || scissorsState) && (
            <div className={classes.result}>
              <section className={classes.Positions}>
                {rockState && <h1>ROCK</h1>}
                {paperState && <h1>PAPER</h1>}
                {scissorsState && <h1>SCISSORS</h1>}
              </section>
              <section>
                <h1 className={classes.Vs}>vs</h1>
              </section>
              <section className={classes.Positions}>
                {pcPosition && <h1>{pcPosition}</h1>}
              </section>
            </div>
          )}
        </div>
        {!error && !rockState && !paperState && !scissorsState && (
          <p>PICK YOUR POSITION</p>
        )}
        {!error && rockState && paperState && scissorsState && (
          <p>PICK YOUR POSITION</p>
        )}
        {error && <p>YOU CAN ONLY SELECT TWO POSITIONS</p>}
      </div>
    </Fragment>
  );

  return (
    <div className={classes.App}>
      <header>
        <TopBar balance={balance} bet={totalBet} winValue={winValue} />
      </header>
      {result}
      <div className={classes.Position}>
        <Position
          amount={rBetValue}
          position={"ROCK"}
          onClick={rockPositionHandler}
        />
        <Position
          amount={pBetValue}
          position={"PAPER"}
          onClick={paperPositionHandler}
        />
        <Position
          amount={sBetValue}
          position={"SCISSORS"}
          onClick={scissorsPositionHandler}
        />
      </div>
      {!played && <button onClick={playButtonHandler}>PLAY</button>}
      {played && <button onClick={clearButtonHandler}>CLEAR</button>}
    </div>
  );
}

export default App;
