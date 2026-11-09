import React, {useState} from 'react';
import './GameMenu.css';
import Notification from "../notification/notification.component"

function GameMenu ({ mode, setMode, startGame,
  nickname1, setNickname1,
  nickname2, setNickname2,
  nicknameCPU, setNicknameCPU }) {

    const [notification, setNotification] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    function handleStartGame() {

      if(mode === 'pvp') {

          if(nickname1.trim() === '' || nickname2.trim() === '') {

           
            setNotification(`Insira os nicknames dos jogadores!`);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
            return;

          }

      }

      else if(mode === 'cpu') {

        if(nicknameCPU.trim() === '') {

          setNotification(`Insira o seu nickname`);
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 2000);
          return;

        }

      }

      startGame();

    }

    return (
        <>
      <div className="game-menu">

        <h1>4 em Linha</h1>
        <p>Selecione o modo de jogo:</p>

        <div className="buttons">

          <button className={mode === 'pvp' ? 'selected' : ''} onClick={() => setMode('pvp')}> Jogador vs Jogador </button>

          <button className={mode === 'cpu' ? 'selected' : ''} onClick={() => setMode('cpu')}> Jogador vs Computador </button>
          
        </div>

        { mode === 'pvp' && ( 

            <>

            <div className="nickname-inputs">

              <div className="info"> Nickname do Jogador 1:
                <input type="text" id="inputNick1" value={nickname1} onChange={(e => setNickname1(e.target.value))} placeholder="Nickname (Jogador 1)"/>
              </div>

              <div className="info"> Nickname do Jogador 2:
                <input type="text" id="inputNick2" value={nickname2} onChange={(e => setNickname2(e.target.value))} placeholder="Nickname (Jogador 2)"/>
              </div>

            </div>

            </>

        )}

        { mode === 'cpu' && (

            <>
            
              <div className="info" id="nickname"> Nickname: 
                <input type="text" id="inputNick" value={nicknameCPU} onChange={(e => setNicknameCPU(e.target.value))} placeholder="Introduza o seu Nickname"/>
              </div>

            </>

        )}

          <button className="start-btn" onClick={handleStartGame}> Começar Jogo </button>

    

      </div>

      <Notification message={notification} visible={showNotification}/> 
      
      </>

    ); 
  
} export default GameMenu;