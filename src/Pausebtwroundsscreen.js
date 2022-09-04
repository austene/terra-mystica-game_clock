import './Pausebtwroundsscreen.css';
import React from "react";

const Pausebtwroundsscreen = ({
  playersArray,
  setPlayersArray,
  setIsGameRunning,
  currentRound,
  setCurrentRound,
  setCurrentScreen,
}) => {

  let nextRound = currentRound + 1;

  const handleStartRound = () => {
    //handle first player to turn out of previous round
    let updatedArray = playersArray.map(player => {
      return (player.isFirstToTurnOutOfCurrRound === true) ?
      {...player,
        isTimerRunning: true,
        isFirstToTurnOutOfCurrRound: false,
      } :
      player
    })
    //handle last player to turn out of previous round
    updatedArray = updatedArray.map(player => {
      return (player.isLastPlayerInRound === true) ?
      {...player,
        isLastPlayerInRound: false,
      } :
      player
    })
    //reset all players who still have time left to play in next round
    updatedArray = updatedArray.map(player => {
      return (player.isPlayerTimeZero === false) ?
      {...player,
        isPlayerInCurrRound: true,
      } :
      player
    })
    setPlayersArray(updatedArray)
    setCurrentRound(nextRound)
    setIsGameRunning(true)
    setCurrentScreen('PlayingScreen')
  }

  return(
    <div className='pause-btw-rounds-screen'>
      <header className='header'>
        <h1>Terra Mystica Game Clock</h1>
        <h2>Timer Paused</h2>
      </header>
      <div id='pause-container'>
        <p>Round {currentRound} complete.</p>
        <p>Distribute income and reset board for Round {nextRound}.</p>
        <button
          id='start-next-round-btn'
          onClick={() => handleStartRound()}
        >
          Start Round {nextRound}
        </button>
      </div>
    </div>
  )
}

export default Pausebtwroundsscreen;
