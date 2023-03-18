import player from './player'

const Game = (() => {
  const state = initializeGame()

  function initializeGame() {
    const combatant = player('Captain')
    const cpu = player('cpu', true)

    return { combatant, cpu, getPlayer, getCPU }
  }

  // GETTERS

  function getState() {
    return this.state
  }

  function getPlayer() {
    return this.combatant
  }

  function getCPU() {
    return this.cpu
  }

  function setPlayerName(name = 'Captain') {
    getState().getPlayer().setName(name)
  }

  return { state, getState, setPlayerName }
})()

export default Game
