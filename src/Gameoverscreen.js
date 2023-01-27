import './Gameoverscreen.css';
import './buttons.css';
import React from 'react';

const Gameoverscreen = ({
  playersArray,
  setPlayersArray,
  initialStartingTime,
  startingTimePerPlayer,
  setStartingTimePerPlayer,
  setIsGracePeriodOn,
  initialGracePeriod,
  gracePeriodPerPlayer,
  setGracePeriodPerPlayer,
  setCurrentScreen,
  setIsGameRunning,
  setCurrentRound,
}) => {

    //BREAK SECONDS INTO HR/MIN/SEC DISPLAY
    const prettyTime = (timeInSecs) => {
      const hours = Math.floor(timeInSecs / (60 * 60));
      const minutes = Math.floor((timeInSecs % (60 * 60)) / 60);
      const seconds = Math.floor(timeInSecs % 60);
      
      const twoDigits = (number) => 
        (number).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
      const display = `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`
      return display
    }

  //SWITCH CASE
  const displayPlayersTimes = (player) => {
    if (player.isPlayerTimeZero) {
      //display ran out of time
      return 'Ran out of Time'
    } else if (player.time <= 0 && player.graceTimeRemaining > 0){
      //display using grace period
      return 'Grace Period'
    } else {
      //display time left
      return prettyTime(player.time)
    }
    
  }
   

  //GO TO PLAYING SCREEN, RESTARTS GAME WITH SAME SETUP DETAILS ie names, times, and grace settings
  const handlePlayAgain = () => {
    let updatedArray = playersArray.map(player => {
      return (player.playerOrder === 1) ?
      {...player,
        time: startingTimePerPlayer,
        isTimerRunning: true,
        isPlayerTimeZero: false,
        isPlayerInCurrRound: true,
        isFirstToTurnOutOfCurrRound: false,
        isLastPlayerInRound: false,
        graceTimeRemaining: gracePeriodPerPlayer,
      } :
      {...player,
        time: startingTimePerPlayer,
        isTimerRunning: false,
        isPlayerTimeZero: false,
        isPlayerInCurrRound: true,
        isFirstToTurnOutOfCurrRound: false,
        isLastPlayerInRound: false,
        graceTimeRemaining: gracePeriodPerPlayer,
      }
    })
    setPlayersArray(updatedArray)

    setCurrentRound(1)
    setIsGameRunning(true)
    setCurrentScreen('PlayingScreen')
  }

  //GO TO SETUP SCREEN
  const handleResetGame = () => {
    setStartingTimePerPlayer(initialStartingTime)
    setIsGracePeriodOn(true)
    setGracePeriodPerPlayer(initialGracePeriod)
    setPlayersArray([])
    setCurrentRound(1)
    setCurrentScreen('SetupScreen')
  }


  

  return(
    <div className='game-over-screen'>
      <header className='header'>
        <h2>Game Over</h2>
      </header>
      <div id='results-container'>
        <div className='results-flex-item'>Time Left</div>
        <ul className='results-flex-item'>
          {playersArray.map(player => {
            return <li className='results-flex-item' key={player.id}>{player.name}: {displayPlayersTimes(player)}</li>
          })}
        </ul>
        <button
          className='results-flex-item standard-btn primary-color-btn short-btn'
          id='play-again-btn'
          title='Play again with same players and time settings'
          onClick={() => handlePlayAgain()}
        >
          Play Again
        </button>
        <button
          className='results-flex-item standard-btn primary-color-btn short-btn'
          id='reset-game-btn'
          title='Change player and time settings to start a new game'
          onClick={() => handleResetGame()}
        >
          Reset Game
        </button>
      </div>
    </div>
  )
}

export default Gameoverscreen;
