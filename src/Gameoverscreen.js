import './Gameoverscreen.css';
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

  const displayPlayersTimes = (player) => {
    return player.isPlayerTimeZero ? 'Ran out of Time' : player.time
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
        <h1>Terra Mystica Game Clock</h1>
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
          className='results-flex-item'
          id='play-again-btn'
          title='Play again with same players and time'
          onClick={() => handlePlayAgain()}
        >
          Play Again
        </button>
        <button
          className='results-flex-item'
          id='reset-game-btn'
          title='Change players and time to start a new game'
          onClick={() => handleResetGame()}
        >
          Reset Game
        </button>
      </div>
    </div>
  )
}

export default Gameoverscreen;
