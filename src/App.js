import './App.css';
import Setupscreen from './Setupscreen.js';
import Playingscreen from './Playingscreen.js';
import Pausebtwroundsscreen from './Pausebtwroundsscreen.js'
import React, { useState } from 'react';
import Gameoverscreen from './Gameoverscreen';


function App() {
  const [currentScreen, setCurrentScreen] = useState('SetupScreen');
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const maxRounds = 6; 

  const initialStartingTime = 60 //minutes
  const [startingTimePerPlayer, setStartingTimePerPlayer] = useState(initialStartingTime);
  
  const initialGracePeriod = 60 //seconds
  const [gracePeriodPerPlayer, setGracePeriodPerPlayer] = useState(initialGracePeriod);
  const [isGracePeriodOn, setIsGracePeriodOn] = useState(true);
  
  const [playersArray, setPlayersArray] = useState([]);
  
  //fake player data - %remove when using setupscreen data%
  // const [playersArray, setPlayersArray] = useState([
  //   {'id': 1, 'name': 'Adam', 'playerOrder': 1, 'time': 10, 'isTimerRunning': true, 'isPlayerTimeZero': false, 'isPlayerInCurrRound': true, 'isFirstToTurnOutOfCurrRound': false, 'isLastPlayerInRound': false, 'graceTimeRemaining': 5},
  //   {'id': 2, 'name': 'Bob', 'playerOrder': 2, 'time': 0, 'isTimerRunning': false, 'isPlayerTimeZero': true, 'isPlayerInCurrRound': true, 'isFirstToTurnOutOfCurrRound': false, 'isLastPlayerInRound': false, 'graceTimeRemaining': 5},
  //   {'id': 3, 'name': 'Callen', 'playerOrder': 3, 'time': 10, 'isTimerRunning': false, 'isPlayerTimeZero': false, 'isPlayerInCurrRound': true, 'isFirstToTurnOutOfCurrRound': false, 'isLastPlayerInRound': false, 'graceTimeRemaining': 5},
  //   {'id': 4, 'name': 'Derick', 'playerOrder': 4, 'time': 10, 'isTimerRunning': false, 'isPlayerTimeZero': false, 'isPlayerInCurrRound': true, 'isFirstToTurnOutOfCurrRound': false, 'isLastPlayerInRound': false, 'graceTimeRemaining': 5}
  // ]);


  return (
    <div className='app'>
      <header className="header" id='title'>
        <h1>Terra Mystica Game Clock</h1>
      </header>

      {(() => {
        switch(currentScreen){
          case 'SetupScreen': 
            return <Setupscreen
              startingTimePerPlayer={startingTimePerPlayer}
              setStartingTimePerPlayer={setStartingTimePerPlayer}
              isGracePeriodOn={isGracePeriodOn}
              setIsGracePeriodOn={setIsGracePeriodOn}
              gracePeriodPerPlayer={gracePeriodPerPlayer}
              setGracePeriodPerPlayer={setGracePeriodPerPlayer}
              playersArray={playersArray}
              setPlayersArray={setPlayersArray}
              setCurrentScreen={setCurrentScreen}
              setIsGameRunning={setIsGameRunning}
            />

          case 'PlayingScreen':
            return <Playingscreen
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

          case 'PauseBtwRoundsScreen':
            return <Pausebtwroundsscreen
              playersArray={playersArray}
              setPlayersArray={setPlayersArray}
              setIsGameRunning={setIsGameRunning}
              currentRound={currentRound}
              setCurrentRound={setCurrentRound}
              setCurrentScreen={setCurrentScreen}
            />

          case 'GameOverScreen':
            return <Gameoverscreen
              playersArray={playersArray}
              initialStartingTime={initialStartingTime}
              startingTimePerPlayer={startingTimePerPlayer}
              setStartingTimePerPlayer={setStartingTimePerPlayer}
              setPlayersArray={setPlayersArray}
              setIsGameRunning={setIsGameRunning}
              setIsGracePeriodOn={setIsGracePeriodOn}
              initialGracePeriod={initialGracePeriod}
              gracePeriodPerPlayer={gracePeriodPerPlayer}
              setGracePeriodPerPlayer={setGracePeriodPerPlayer}
              setCurrentRound={setCurrentRound}
              setCurrentScreen={setCurrentScreen}
            />
          
          default:
            return console.log('error in screen switch case')
        }
      })()}
    </div>
  );
}

export default App;
