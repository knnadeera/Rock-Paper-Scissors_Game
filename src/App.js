import { Fragment, useState } from "react";
import "./App.css";
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
  const [pcPosition, setPcPosition]= useState('')

  const gameValue = ["ROCK", "PAPER", "SCISSORS"];

  const initialBalance = 5000;
  let balance = initialBalance - rBetValue - pBetValue - sBetValue;

  let totalBet = rBetValue + pBetValue + sBetValue;

  const initialWin = 0;
  let totalWin = initialWin;

  const rockPositionHandler = () => {
    if (!!paperState && !!scissorsState && !played) {
      setError(true);
    } else if (!played) {
      setRockState(true);
      setRBetValue(rBetValue + 500);
    }
  };

  const paperPositionHandler = () => {
    if (!!rockState && !!scissorsState && !played) {
      setError(true);
    } else if (!played) {
      setPBetValue(pBetValue + 500);
      setPaperState(true);
    }
  };

  const scissorsPositionHandler = () => {
    if (!!rockState && !!paperState && !played) {
      setError(true);
    } else if (!played) {
      setSBetValue(sBetValue + 500);
      setScissorsState(true);
    }
  };

  const playButtonHandler = () => {
    const random = Math.floor(Math.random() * gameValue.length);

    if (
      rockState &&
      (gameValue[random] === "ROCK" || gameValue[random] === "PAPER")
    ) {
      setPcWin(true);
    } else if (rockState && gameValue[random] === "SCISSORS") {
      setPlayerWin(true);
    }

    if (
      paperState &&
      (gameValue[random] === "PAPER" || gameValue[random] === "SCISSORS")
    ) {
      setPcWin(true);
    } else if (paperState && gameValue[random] === "ROCK") {
      setPlayerWin(true);
    }

    if (
      scissorsState &&
      (gameValue[random] === "SCISSORS" || gameValue[random] === "ROCK")
    ) {
      setPcWin(true);
    } else if (scissorsState && gameValue[random] === "PAPER") {
      setPlayerWin(true);
    }

    setPcPosition(gameValue[random])

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
    setPlayerWin(false)
    setPcPosition('')
  };

  const result = (
    <Fragment>
      <div className="result">
        <section className="Positions">
          {rockState && <h1 className="Rock">ROCK</h1>}
          {paperState && <h1 className="Paper">PAPER</h1>}
          {scissorsState && <h1 className="Scissors">SCISSORS</h1>}
          {!rockState && !paperState && !scissorsState && <h1>___________</h1>}
        </section>
        <section><h1 className="Vs">vs</h1></section>
        
        <section>
          {!pcPosition && <h1>___________</h1>}
          {pcPosition && <h1>{pcPosition}</h1>}
        </section>
      </div>
      <div>
        <p>{pcPosition}</p>
        {playerWin && <p>YOU WON</p>}
        {pcWin && <p>you loose</p>}
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
    <div className="App">
      <header className="App-header">
        <TopBar balance={balance} bet={totalBet} pcWin={totalWin} />
      </header>
      {result}
      <div className="Position">
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
