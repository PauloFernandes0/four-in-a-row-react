import React from "react";
import './header.css'; 
function Header({ playerTurn, onReset,timeLeft,gameStatus}) {
    return (
        <>
            <header className="header">
                <h1 className="title">4 em Linha</h1>
                <div className="status">

                    {gameStatus === 'finished' ? (<span className="turn"><strong>O jogo já acabou</strong></span>) 
                    : ( <span className="turn">Vez do Jogador: <strong>{playerTurn}</strong> | Tempo: <strong>{timeLeft}</strong></span>)}
                    <button className="reset-button" onClick={onReset}>Reiniciar</button>
                </div>
            </header>
        </>
    )
};

export default Header;