import player from './player'
import ship from './ship'

const game = (() => {
  function initializeGame(playerName) {
    const combatant = player(playerName)
    const cpu = player('cpu', true)

    combatant.placeY(ship('carrier', 5), [0, 0])
    cpu.placeX(ship('carrier', 5), [0, 0])
  }

  return { initializeGame }
})()

export default game
