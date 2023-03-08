import player from './player'
import ship from './ship'

const Game = (() => {
  function initializeGame(playerName) {
    const combatant = player(playerName)
    const cpu = player('cpu', true)

    // combatant.board.placeX(ship('battleship', 4), [4, 4])
    // combatant.board.placeX(ship('carrier', 5), [5, 0])
    // combatant.board.placeY(ship('cruiser', 3), [7, 5])
    // combatant.board.placeX(ship('submarine', 3), [0, 0])
    // combatant.board.placeX(ship('destroyer', 2), [5, 8])

    // cpu.board.placeX(ship('carrier', 5), [0, 0])

    return { combatant, cpu }
  }

  return { initializeGame }
})()

export default Game
