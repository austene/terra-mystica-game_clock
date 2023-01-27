import './Controlcenter.css';
import './App.css';
import React from 'react';
import useInterval from './CustomHooks.js';
import DisplayTime from './DisplayTime.js';

const Controlcenter = ({
  player,
  playersArray,
  setPlayersArray,
  isGameRunning,
  setIsGameRunning,
  isGracePeriodOn, //%%may remove this thread all the way back up to app.js%%
  gracePeriodPerPlayer,
  setCurrentScreen,
  currentRound,
  maxRounds,
}) => {

  //TEXT TO SPEECH
  //text to voice speak provided speechText message
  const speakMessage = (speechText) => {
    let msg = new SpeechSynthesisUtterance(speechText);
      speechSynthesis.speak(msg); 
  };

  //NEXT PLAYER IN ROUND
  //Returns next player ID who is still in round or the current player ID
  const nextPlayerInRoundId = (currPlayerId, updatedArray) => {
    let currPlayerIndex = updatedArray.findIndex(player => player.id === currPlayerId)
    while(true){
      let nextPlayerIndex = currPlayerIndex < updatedArray.length - 1 ? currPlayerIndex + 1 : 0
      //returns next player Id who is still in current round
      if(updatedArray[nextPlayerIndex].isPlayerInCurrRound){
        return playersArray[nextPlayerIndex].id;
      };
      //returns current player Id who is only player still in current round
      if(updatedArray[nextPlayerIndex].id === currPlayerId){
        return currPlayerId;
      };
      //otherwise, continue while loop
      currPlayerIndex = nextPlayerIndex
    }
  }

  //PLAYER IS OUT OF TIME
  const playerOutOfTime = (currPlayerId) => {
    //update player who ran out of time
    let updatedArray = playersArray.map(player => {
      return (player.id === currPlayerId) ?
      {...player,
          isTimerRunning: false,
          isPlayerTimeZero: true,
          isPlayerInCurrRound: false,
        } :
        player
      })
    //text to speech: '{player's Name} is out of time'
    let currPlayer = updatedArray.filter(player => player.id === currPlayerId)
    let currPlayerName = currPlayer[0].name
    speakMessage(`${currPlayerName} is out of time`)
    
    let nextPlayerId = nextPlayerInRoundId(currPlayerId, updatedArray)
    //pause screen if current player (who is out of time) is only player left in current round
    if(nextPlayerId === currPlayerId){
      setPlayersArray(updatedArray)
      setCurrentScreen('PauseBtwRoundsScreen')
    //updates next player still in current round to isTimerRunning: true
    } else {
      updatedArray = updatedArray.map(player => {
        return (player.id === nextPlayerId) ? {...player, isTimerRunning: true} : player
      })
      setPlayersArray(updatedArray)
    }
  }

  //COUNTDOWN FUNCTION
  const countDownCallback = () => {
    if (player.time > 0) {
      let updatedArray = playersArray.map(mapPlayer => {
        return (mapPlayer.id === player.id) ? 
        {...mapPlayer, time: (mapPlayer.time - 1)} 
        : 
        mapPlayer
      })
      setPlayersArray(updatedArray);
    } else if (player.time >= 0 && player.graceTimeRemaining > 0) {
        let updatedArray = playersArray.map(mapPlayer => {
          return (mapPlayer.id === player.id) ? 
          {...mapPlayer, graceTimeRemaining: (mapPlayer.graceTimeRemaining - 1)} 
          : 
          mapPlayer
      })
      setPlayersArray(updatedArray);
    } else {
      playerOutOfTime(player.id)
    };
  };
  //runs countdown timer/clock
  useInterval(countDownCallback, player.isTimerRunning && isGameRunning ? 1000: null)

  //PLAYER ENDS TURN
  const handleEndTurn = (currPlayerId) => {
    //find current player
    let currPlayer = playersArray.find(player => {
      return player.id === currPlayerId
    })
    let updatedArray = [];
    //updates current player to isTimerRunning: false
    if (currPlayer.time > 0) {
      updatedArray = playersArray.map(player => {
        return (player.id === currPlayerId) ? {...player, isTimerRunning: false} : player
      })
    } else if (currPlayer.graceTimeRemaining > 0) {
      //updates current player to isTimerRunning: false & graceTimeRemaining to original gracePeriodPerPlayer
      updatedArray = playersArray.map(player => {
        return (player.id === currPlayerId) ? 
        {...player,
          isTimerRunning: false,
          graceTimeRemaining: gracePeriodPerPlayer
        }
        : 
        player
      })
    }
    //updates next player to isTimerRunning: true
    let nextPlayerId = nextPlayerInRoundId(currPlayerId, updatedArray)
    updatedArray = updatedArray.map(player => {
      return (player.id === nextPlayerId) ? {...player, isTimerRunning: true} : player
    })
    setPlayersArray(updatedArray)
  }

  //counts values total of specified value-type by specified key, in specified array of objects
  let countValue = (arr, key, value) => arr.filter(object => object[key] === value).length

  //PLAYER ENDS ROUND INVOLVEMENT
  const handleEndRound = (currPlayerId) => {  
    //find current player
    let currPlayer = playersArray.find(player => {
      return player.id === currPlayerId
    })
    let updatedArray = [];
    //removes current player from current round
    if (currPlayer.time > 0) {
      updatedArray = playersArray.map(player => {
        return (player.id === currPlayerId) ?
        {...player,
          isTimerRunning: false,
          isPlayerInCurrRound: false
        } : 
        player
      })
    } else if (currPlayer.graceTimeRemaining > 0){
      updatedArray = playersArray.map(player => {
        return (player.id === currPlayerId) ?
        {...player,
          isTimerRunning: false,
          isPlayerInCurrRound: false,
          graceTimeRemaining: gracePeriodPerPlayer
        } : 
        player
      })
    }

    let nextPlayerId = nextPlayerInRoundId(currPlayerId, updatedArray)
    let totalPlayersNotInRound = countValue(updatedArray, 'isPlayerInCurrRound', false)
    //updates current player if player is first to turn out of current round
    if(totalPlayersNotInRound === 1){
      updatedArray = updatedArray.map(player => {
        return (player.id === currPlayerId) ?
        {...player,
          isFirstToTurnOutOfCurrRound: true,
        } :
        player
      })
    }

    //updates which next player to run Timer
      //check if next player is only player left in current round
    if(totalPlayersNotInRound === updatedArray.length - 1){
      //updates player if player is only player left in current round
      updatedArray = updatedArray.map(player => {
        return (player.id === nextPlayerId) ?
        {...player,
          isTimerRunning: true,
          isLastPlayerInRound: true
        } :
        player
      })
      //if last player in current round clicked end round - update array and change screen
    } else if(totalPlayersNotInRound === updatedArray.length){
      updatedArray = updatedArray.map(player => {
        return (player.id === nextPlayerId) ? {...player, isTimerRunning: false} : player
      })
      setIsGameRunning(false)
      setPlayersArray(updatedArray)
      currentRound < maxRounds ? setCurrentScreen('PauseBtwRoundsScreen') : setCurrentScreen('GameOverScreen')
    } else {
      //if 2 or more players are still left in current round - update next player in current round -> isTimerRunning: true
      updatedArray = updatedArray.map(player => {
        return (player.id === nextPlayerId) ? {...player, isTimerRunning: true} : player
      })
    }
    setPlayersArray(updatedArray)
  }

  //DISPLAY TO USE GAMETIME OR GRACETIME
  const playerTimeOrGrace = (player) => {
    return player.time > 0 ? player.time : player.graceTimeRemaining
  }
  

  return (
    <div className='control-center-container'>
      <h2>{player.name}</h2>
      <div className='big-timer-container'>
        {
          player.isPlayerTimeZero?
          <p>You Are Out Of Time</p> 
          :
          <DisplayTime timeInSecs={playerTimeOrGrace(player)}/>
        }
      </div>
      <div className='lowerhalf-container'>
        <div className='lowerhalf-item left-column'>
          <button
            id='end-turn-btn'
            className='standard-btn secondary-color-btn short-btn'
            disabled={!player.isTimerRunning || player.isLastPlayerInRound}
            onClick={() => handleEndTurn(player.id)}
          > 
            End Turn
          </button>
            {player.isLastPlayerInRound && <div>Click End Round when ready.  All other players have turned out of current round.</div>}
          <button
            id='end-round-btn'
            className='standard-btn primary-color-btn short-btn'
            disabled={!player.isTimerRunning}
            onClick={() => handleEndRound(player.id)}
          >
            End Round
          </button>
        </div>
        <div className='lowerhalf-item right-column'>
          <ul className='players-time-list'>
            {playersArray.map(player => 
              <li
                key={player.id}
                className='playerTime'
              >
                {/* %%fix list - want in-line for name and time display%% */}
                <span id='player-name'>{player.name}</span>
                <DisplayTime className='player-display' timeInSecs={playerTimeOrGrace(player)} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>  
  )
};

export default Controlcenter;