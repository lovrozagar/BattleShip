import player from './player'

const Game = (() => {
  const state = initializeGame()

  function initializeGame(playerName) {
    const combatant = player(playerName)
    const cpu = player('cpu', true)

    return { combatant, cpu, getPlayer }
  }

  function getPlayer() {
    return this.combatant
  }

  return { state }
})()

export default Game
