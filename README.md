# Terra Mystica Game Clock

## Identified Need
The Terra Mystica board game is awesome.  If you haven't played it, I recommend that you give it a shot - (there even online tournaments!)\
Those who _have_ enjoyed this complex and inheritly long game, know that it can drag on, especially if one or more players decide to compute all possible future variations before they make each and every move.\
Thus, a 2-3 hour game magically becames a 5-6 hour affair!  Now, I'm up for an occasional all-day game, but sometimes you've got places to be, like Comic-Con or Dance class.

__NEED IDENTIFIED - a way to keep the game moving at a reasonable pace.__

## The Problem - specifics
* Customize for more than 2 players
* A player able to turn out of round while other players keep going
* Pause between rounds
* Re-order player order based on who first turned out of previous round (that player goes first next round)

## The Solution?
The Terra Mystica Game Clock!\
Here you will find a game clock built based on the concept of a chess clock without its limitations.

### Solution Description
1. First Phase
* Central application on a desktop computer to control all players' times
* support a give (input) number of players (in this phase - support at least 3)
* Label or name for each player
* Every player receives a specified (input) amount of time (same for each player)
* Control for starting Game
* Control for starting Round
* Control for Player ending his participation in Round (will also end his Turn)
* Control for starting/ending a Turn

### Current Features
* Add multiple players with personalized names
* Customize amount of game time per player
* Re-order players game play order before Start
* Setting to turn on Grace Period or not (pre-set to On)
* Customize amount of Grace Period time
* End Turn button to stop player's clock countdown and start next player's clock countdown
* End Round button to take player's clock out of the current round and start the next player's clock
* Automatically takes out-of-time player out of round and starts the player's clock
* If Grace Period setting is on, automatically adds switches player to grace time when they run out of game time
* Grace Period per player resets after they turn out (as long as they still have time left.  If no time left, program will automatically take player out of round/game)
* Text-To-Voice message will announce that a 'player(name) is out of time' when the player runs out of time.
* Program pauses when all players turn out of current round to collect earned income and reset board before restarted when Start Round button is clicked
* Re-order player order based on who turned out of previous round first
* Displays time stats for all players when game is over
* Option to play again with same settings and players or customize a new game


## Get Started
Pull git repository

In the project directory:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open browser  to [http://localhost:3000](http://localhost:3000)

The page will reload when you make changes.\
You may also see any lint errors in the console.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).