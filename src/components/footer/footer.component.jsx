import React from "react";
import './footer.css';

function Footer( { gameStatus, gameWinner }) {
    return (
        <>
            <footer className="footer">
                <p className="status-message">
                    {gameStatus === 'playing' && 'Jogo em andamento...'}
                    {gameStatus === 'finished' && gameWinner === "draw" && 'Empate!'}
                    {gameStatus === 'finished' && gameWinner !== "draw" && `Vencedor: Jogador ${gameWinner}`}
                </p>
                <small className="credits">Autores [Tomás Silva] [Paulo Fernandes] • TP 4 em Linha</small>
            </footer>
        </>
    )
};

export default Footer;