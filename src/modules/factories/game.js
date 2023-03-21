import Player from './player'

const Game = (() => {
  const state = initializeGame()

  function initializeGame() {
    const player = Player.createPlayer('Captain', 'player')
    const cpu = Player.createPlayer('cpu', 'cpu')

    return { player, cpu, getPlayer, getCPU }
  }

  // GETTERS

  function getState() {
    return this.state
  }

  function getPlayer() {
    return this.player
  }

  function getCPU() {
    return this.cpu
  }

  // SETTERS

  function setPlayerName(name = 'Captain') {
    getState().getPlayer().setName(name)
  }

  return { state, getState, setPlayerName }
})()

export default Game
