import player from './player'

const Game = (() => {
  const state = initializeGame()

  function initializeGame() {
    const combatant = player('Captain')
    const cpu = player('cpu', true)

    return { combatant, cpu, getPlayer, getCPU }
  }

  // GETTERS

  function getPlayer() {
    return this.combatant
  }

  function getCPU() {
    return this.cpu
  }

  return { state }
})()

export default Game
