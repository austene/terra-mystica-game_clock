import './Setupscreen.css';
import ToggleButton from './ToggleButton';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const Setupscreen = ({ 
  startingTimePerPlayer,
  setStartingTimePerPlayer,
  isGracePeriodOn,
  setIsGracePeriodOn,
  gracePeriodPerPlayer,
  setGracePeriodPerPlayer,
  playersArray,
  setPlayersArray,
  setCurrentScreen,
  setIsGameRunning,
}) => {
  const [dragItemIndex, setDragItemIndex] = useState();
  
  //Update Time Per Player
  const handleChangeStartingTime = (e) => {
    setStartingTimePerPlayer(e.target.value)
  }
  //Update Grace Period Amt Per Player
  const handleChangeGracePeriod = (e) => {
    setGracePeriodPerPlayer(e.target.value)
  }
  //Updates Grace Period Toggle (Boolean)
  const handleGracePeriodToggle = () => {
    setIsGracePeriodOn(!isGracePeriodOn)
  }

  //%re-factor (either switchcase and/useReducer...%)
  //Players Reducer???

  //Add Player
  const handleAddPlayer = () => {
    let newPlayer = {
      'id': uuidv4(),
      'name': '',
      'playerOrder': playersArray.length + 1,
      'time': null,
      'isTimerRunning': (playersArray.length === 0) ? true : false,
      'isPlayerTimeZero': false,
      'isPlayerInCurrRound': true,
      'isFirstToTurnOutOfCurrRound': false,
      'isLastPlayerInRound': false,
      'graceTimeRemaining': null, 
    }
    setPlayersArray(playersArray.concat(newPlayer))
  }
  //Update Player Name
  const handleUpdatePlayer = (e, id) => {
    const updatedArray = playersArray.map(player => {
     return (player.id === id) ? {...player, name: e.target.value} : player
    })
    setPlayersArray(updatedArray)
  }
  //Delete Player
  const handleDeletePlayer = (id) => {
    const updatedArray = playersArray.filter(player => player.id !== id)
    updatedArray.map((player, i) => player.playerOrder = i + 1)
    setPlayersArray(updatedArray)
  }

  //DND - Drag N Drop Player to Re-order
  //%%re-factor (either switchcase and/useReducer...%%)
  const handleDragStart = (index) => {
    setDragItemIndex(index);
  };
  
  const handleDragEnter = (e, targetIndex) => {
    e.target.style.backgroundColor = "#6286a6";
    const newPlayersArray = [...playersArray]
    let player = newPlayersArray[dragItemIndex];
    newPlayersArray.splice(dragItemIndex, 1);
    newPlayersArray.splice(targetIndex, 0, player);

    let updatedPlayersArray = newPlayersArray.map((player, i) => {
      return {...player,
        playerOrder: i + 1,
        isTimerRunning: (i === 0) ? true : false,
      }
    })

    setDragItemIndex(targetIndex);
    setPlayersArray(updatedPlayersArray);
    console.log(playersArray)
  };
  
  const handleDragLeave = (e) => {
    e.target.style.backgroundColor = "#466783";
  };
  
  const handleDrop = (e) => {
    e.target.style.backgroundColor = "#466783";
  };

  //START GAME
  const handleStartGame = () => {
    //update all players with decided time(playertime) and grace amount (or no grace time if grace setting is off)
    let updatedArray = playersArray.map(player => {
      return (isGracePeriodOn) ? 
        {...player,
        //convert time (mins) into seconds
         time: (startingTimePerPlayer * 60),
         graceTimeRemaining: gracePeriodPerPlayer,
        }
      :
      {...player,
        //convert time (mins) into seconds
        time: (startingTimePerPlayer * 60),
        graceTimeRemaining: 0,
      }
    })
    setPlayersArray(updatedArray)
    setCurrentScreen('PlayingScreen');
    setIsGameRunning(true);
  };

  return (
    <div className="setup-screen">
      <header className="header">
        <h1>Terra Mystica Game Clock</h1>
        <h2>Set-up</h2>
      </header>

      <div id='inputs-container'>
        <div className='inputs-flex-item'>
          <label htmlFor='time-per-player'>Time Per Player (min) </label>
          <input
            id='time-per-player-input'
            type='number'
            maxLength={25}
            placeholder='enter amount'
            value={startingTimePerPlayer}
            onChange={(e) => handleChangeStartingTime(e)}
          />
        </div>

        <div className='inputs-flex-item grace-period-container'>
          {isGracePeriodOn ? 
            <span className='grace-period-item'>
              <label htmlFor='time-per-player'>Grace Period Per Player (sec) </label>
              <input
                id='grace-period-per-player-input'
                type='number'
                maxLength={25}
                placeholder='enter amount'
                value={gracePeriodPerPlayer}
                onChange={(e) => handleChangeGracePeriod(e)}
              />
            </span>
          :
            <span className='grace-period-item'>(No Grace Period)</span>
          }
          <span className='grace-period-item'>
            <ToggleButton
              // id='grace-period-toggle'
              className='grace-period-toggle'
              onToggle={handleGracePeriodToggle}
            />
            {isGracePeriodOn ? <span>On</span> : <span>Off</span>}
          </span>
        </div>
          
        <div className='inputs-flex-item players-container'>
          <ul className='players-flex-item dnd'>
          {playersArray.length === 0 ? 
            <p>Add a player to get started</p> :
            <div>
              {playersArray.map((player, index) => 
                <li
                  draggable
                  key={player.id}
                  id={player.id}
                  className='player'
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  onDrop={(e) => handleDrop(e)}
                  onDragOver={(e) => e.preventDefault()}
                  >
                  <input
                    className='player-name-input'
                    placeholder='Enter Name'
                    value={playersArray.name}
                    onChange={(e) => {handleUpdatePlayer(e, player.id)}}
                  />
                  <span>Order: {player.playerOrder}</span>
                  <span
                    className='delete-player-icon'
                    onClick={() => handleDeletePlayer(player.id)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </span>
                </li>
                
              )}
              <p>(drag to re-order)</p>
            </div>
          }
          </ul>
          <div className='players-flex-item'>
            <button
              id='add-player-btn'
              onClick={() => handleAddPlayer()}
            >
              Add Player
            </button>
          </div>
        </div>

        <div className='inputs-flex-item'>
          <button
            id='start-game-btn'
            disabled={playersArray.length === 0}
            onClick={() => handleStartGame()}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  )
};

export default Setupscreen;
