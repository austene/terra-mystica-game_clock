import './Playingscreen.css';
import Controlcenter from './Controlcenter.js';
import React from 'react';


const Playingscreen = ({
  playersArray,
  setPlayersArray,
  isGameRunning,
  setIsGameRunning,
  isGracePeriodOn,
  gracePeriodPerPlayer,
  setCurrentScreen,
  currentRound,
  maxRounds,
}) => {

  return(
    <div className='playing-screen'>
      <header className='header'>
        <h1>Terra Mystica Game Clock</h1>
        <h2>Playing Round {currentRound}</h2>
      </header>
      {playersArray.map(player =>
        <Controlcenter 
          key={player.id}
          player={player}
          playersArray={playersArray}
          setPlayersArray={setPlayersArray}
          isGameRunning={isGameRunning}
          setIsGameRunning={setIsGameRunning}
          isGracePeriodOn={isGracePeriodOn}
          gracePeriodPerPlayer={gracePeriodPerPlayer}
          setCurrentScreen={setCurrentScreen}
          currentRound={currentRound}
          maxRounds={maxRounds}
        />
      )}
    </div>  
  )
};

export default Playingscreen;
