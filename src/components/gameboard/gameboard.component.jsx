import React, { useState, useEffect,useCallback } from "react";
import './gameboard.css'; 
import Notification from "../notification/notification.component"

function GameBoard( { mode, pieceColor, setPieceColor,playerTurn, setPlayerTurn, nickname1, nickname2, nicknameCPU, CPU,timeLeft,setTimeLeft,specialCells,setSpecialCells,gameStatus,setGameStatus,gameWinner,setGameWinner}) {

    const [board, setBoard] = useState(Array.from({ length: 6 }, () => Array(7).fill(null))); 
    const [hoveredCol, setHoveredCol] = useState(0); 
    const [fallingPiece, setFallingPiece] = useState(null); // ADICIONADO: guarda a peça em animação de queda

    const [notification, setNotification] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const checkWinner = useCallback((currentBoard) => {

        for (let row = 5; row >= 0; row--) {

            for (let col = 6; col >= 0; col--) {

                const current = currentBoard[row][col];
                if (!current) continue;

                if (col + 3 < 7 && currentBoard[row][col + 1] === current && currentBoard[row][col + 2] === current && currentBoard[row][col + 3] === current) {
                    const winnerName = current === 'R' ? (mode === 'pvp' ? nickname1 : nicknameCPU) : (mode === 'pvp' ? nickname2 : CPU);
                    setGameWinner(winnerName);
                    setGameStatus("finished");
                    return;
                }

                if (row + 3 < 6 && currentBoard[row + 1][col] === current && currentBoard[row + 2][col] === current && currentBoard[row + 3][col] === current) {
                    const winnerName = current === 'R' ? (mode === 'pvp' ? nickname1 : nicknameCPU) : (mode === 'pvp' ? nickname2 : CPU);
                    setGameWinner(winnerName);
                    setGameStatus("finished");
                    return;
                }

                if (row + 3 < 6 && col + 3 < 7 && currentBoard[row + 1][col + 1] === current && currentBoard[row + 2][col + 2] === current && currentBoard[row + 3][col + 3] === current) {
                    const winnerName = current === 'R' ? (mode === 'pvp' ? nickname1 : nicknameCPU) : (mode === 'pvp' ? nickname2 : CPU);
                    setGameWinner(winnerName);
                    setGameStatus("finished");
                    return;
                }

                if (row + 3 < 6 && col - 3 >= 0 && currentBoard[row + 1][col - 1] === current && currentBoard[row + 2][col - 2] === current && currentBoard[row + 3][col - 3] === current) {
                    const winnerName = current === 'R' ? (mode === 'pvp' ? nickname1 : nicknameCPU) : (mode === 'pvp' ? nickname2 : CPU);
                    setGameWinner(winnerName);
                    setGameStatus("finished");
                    return;
                }

            }
        }

        const isBoardFull = currentBoard.every(row => row.every(cell => cell !== null));
        if (isBoardFull && gameWinner === '') {
            setGameWinner("draw");
            setGameStatus("finished");
        }
    }, [mode, nickname1, nickname2, nicknameCPU, CPU, setGameStatus, gameWinner, setGameWinner]);

    const verifyCols= useCallback((colIndex) => {

        for (let row = 5; row >= 0; row--) {
            if (board[row][colIndex] === null) {
                return row;
            }
        }

        return false; 
    }, [board]);

    const checkNextPlayer = useCallback(() =>{

        const nextColor = pieceColor === 'R' ? 'Y' : 'R';
        setPieceColor(nextColor);

        if(mode === 'pvp') {
            setPlayerTurn(nextColor === 'R' ? nickname1 : nickname2);
        }

        else if(mode === 'cpu') {
            const nextPlayer = nextColor === 'R' ? nicknameCPU : CPU;
            setPlayerTurn(nextPlayer);
        }

        setTimeLeft(10);

    }, [pieceColor, setPieceColor, mode, nickname1, nickname2, nicknameCPU, CPU, setPlayerTurn, setTimeLeft]);

    const animateDrop = useCallback ((col, row, color, isSpecial) => {

        setFallingPiece({ row: 0, col, color });

        const dropInterval = setInterval(() => {

            setFallingPiece(prev => {

                if (!prev || prev.row === row) {
                    clearInterval(dropInterval);
                    setBoard(prevBoard => {
                        const newBoard = prevBoard.map(r => [...r]);
                        newBoard[row][col] = color;
                        if (!isSpecial) checkNextPlayer();
                        else setTimeLeft(10);
                        return newBoard;
                    });
                    return null;
                }
                return { ...prev, row: prev.row + 1 };

            });
        }, 50);
    }, [checkNextPlayer,setTimeLeft]);

    const CPUturn = useCallback(() => {
        
        let col = Math.floor(Math.random() * 7);
        while (!verifyCols(col)) {
            col = Math.floor(Math.random() * 7);
        }

        const row = verifyCols(col);
        const cellPos = `${row}-${col}`;
        const isSpecial = specialCells.includes(cellPos);
        const cpuLogic = playerTurn === CPU ? pieceColor : (pieceColor === 'R' ? 'Y' : 'R');
        animateDrop(col, row, cpuLogic, isSpecial);

    }, [verifyCols,specialCells, pieceColor, CPU, playerTurn,animateDrop]);

    useEffect(() => {

        if (mode === 'cpu' && playerTurn === CPU && gameStatus === 'playing') {
            const timer = setTimeout(() => { CPUturn();}, 5000);
            return () => clearTimeout(timer);
        }

    }, [playerTurn, mode,CPU, CPUturn,gameStatus]);

    useEffect(() => {
        const specials = new Set();

        while (specials.size < 5) {

            const row = Math.floor(Math.random() * 6);
            const col = Math.floor(Math.random() * 7);
            specials.add(`${row}-${col}`);

        }

        setSpecialCells([...specials]);
    }, [setSpecialCells])

    useEffect(() => {

        while(gameStatus === 'playing'){

            if (timeLeft=== 0) {
                setNotification(`Tempo esgotado! O jogador ${playerTurn} perdeu a vez!`);
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 4000);
                checkNextPlayer();
                setTimeLeft(10);
                return;
            }

            const timer = setTimeout(() => {
                setTimeLeft(prev=> prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
            
        }
    }, [timeLeft, playerTurn, checkNextPlayer, setTimeLeft,gameStatus,setShowNotification,setNotification]);

    useEffect(() => {

        if (gameStatus === 'finished' && gameWinner !== '' && gameWinner !== "draw") {
            setNotification(`O jogador ${gameWinner} ganhou!`);
            setShowNotification(true);
        } 
        else if (gameStatus === 'finished' && gameWinner === 'draw') {
            setNotification(`Empate!`);
            setShowNotification(true);
        }

    }, [gameStatus, gameWinner]);

    useEffect(() => {
        if (gameStatus === 'playing') {
            checkWinner(board);
        }
    }, [board, checkWinner, gameStatus]);

    return (
        <>
            <div className="Select-col">
                {Array.from({ length: 7 }).map((_, colIndex) => (
                    <div key={colIndex} className="topcell" onMouseEnter={() => {if (!(mode === 'cpu' && playerTurn === CPU)) {setHoveredCol(colIndex);}}} onMouseLeave={() => setHoveredCol(null)} onClick={() => {
                        if (gameStatus === "finished") return;
                        if (mode === 'cpu' && playerTurn === CPU) return;
                        const row = verifyCols(colIndex);
                        if (row !== false) {
                            const cellPos = `${row}-${colIndex}`;
                            const isSpecial = specialCells.includes(cellPos); 
                            animateDrop(colIndex, row, pieceColor, isSpecial);
                        }
                    }}>
                        {hoveredCol  === colIndex && pieceColor === 'R' && (<div className="piece-red"></div>)}
                        {hoveredCol  === colIndex && pieceColor === 'Y' && (<div className="piece-yellow"></div>)}
                    </div>
                ))}
            </div>

            <div className="board" >
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        const cellPos = `${rowIndex}-${colIndex}`;
                        const isSpecial = specialCells.includes(cellPos);
                        const isFalling = fallingPiece && fallingPiece.row === rowIndex && fallingPiece.col === colIndex;
                        const pieceClass = isFalling
                            ? `piece-${fallingPiece.color === 'R' ? 'red' : 'yellow'}`
                            : (cell === 'R' ? 'piece-red' : cell === 'Y' ? 'piece-yellow' : '');
                        return (
                            <div key={cellPos} className={`cell ${isSpecial ? 'special-cell' : ''} ${pieceClass}`}></div>
                        );   
                    })
                )}
            </div>

            <Notification message={notification} visible={showNotification}/>
        </>
    );
};

export default GameBoard;
