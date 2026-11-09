import React, { useState } from "react";
import "./assets/styles/App.css";
import Footer from "./components/footer/footer.component";
import Header from "./components/header/header.component";
import GameMenu from "./components/GameMenu/GameMenu.component";
import GameBoard from "./components/gameboard/gameboard.component";

function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [mode, setMode] = useState('');
  const [playerTurn, setPlayerTurn] = useState('');
  const [pieceColor, setPieceColor] = useState('');
  const [gameStatus, setGameStatus] = useState("playing");
  const [gameWinner, setGameWinner] = useState("");
  // Timer
  const [timeLeft, setTimeLeft] = useState(10); 
  // Special Cells
  const [specialCells, setSpecialCells] = useState([]);

  //Nicknames
  const [nickname1, setNickname1] = useState('');
  const [nickname2, setNickname2] = useState('');
  const [nicknameCPU, setNicknameCPU] = useState('');
  const CPU = "CPU";

  function CleanInputs() {

    setNickname1('');
    setNickname2('');
    setNicknameCPU('');

  }

  function startGame() {

    if (mode) {

      choseWhoStarts();
      setGameStarted(true);

    }
    
    else {

      alert("Selecione um modo de jogo!");

    }

  }

  function handleResetGame() {

    setPlayerTurn('');
    setGameStatus("playing");
    setGameWinner('');
    setGameStarted(false);
    setMode('');
    setTimeLeft(10);
    setSpecialCells(''); 
    CleanInputs();
    
  }

  function choseWhoStarts() {

    if (mode === 'pvp') {

      let n = Math.floor(Math.random() * 2);
      setPlayerTurn(n === 0 ? nickname1 : nickname2);
      setPieceColor(n === 0 ? 'R' : 'Y');

    } 
    
    else if (mode === 'cpu') {

      let n = Math.floor(Math.random() * 2);
      setPlayerTurn(n === 0 ? nicknameCPU : CPU);
      setPieceColor(n === 0 ? 'R' : 'Y');

    }

  }

  return (
    <div id="container">
      {!gameStarted ? (
        <GameMenu
          mode={mode}
          setMode={setMode}
          startGame={startGame}
          nickname1={nickname1}
          setNickname1={setNickname1}
          nickname2={nickname2}
          setNickname2={setNickname2}
          nicknameCPU={nicknameCPU}
          setNicknameCPU={setNicknameCPU}
          CPU={CPU}
        />
      ) : (
        <>
          <Header playerTurn={playerTurn} onReset={handleResetGame} timeLeft={timeLeft} gameStatus={gameStatus}/>
          <GameBoard
              mode={mode}
              pieceColor={pieceColor}
              setPieceColor={setPieceColor}
              playerTurn={playerTurn}
              setPlayerTurn={setPlayerTurn}
              nickname1={nickname1}
              nickname2={nickname2}
              nicknameCPU={nicknameCPU}
              CPU={CPU}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              specialCells={specialCells}
              setSpecialCells={setSpecialCells}
              gameStatus={gameStatus} 
              setGameStatus={setGameStatus}   
              gameWinner={gameWinner}
              setGameWinner={setGameWinner} 
          />

          <Footer gameStatus={gameStatus} gameWinner={gameWinner}/>
        </>
      )}
    </div>
  );
}

export default App;
