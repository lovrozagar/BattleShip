// ASSETS
import carrierX from '../../assets/images/carrierX.svg'
import carrierY from '../../assets/images/carrierY.svg'
import battleshipX from '../../assets/images/battleshipX.svg'
import battleshipY from '../../assets/images/battleshipY.svg'
import cruiserX from '../../assets/images/cruiserX.svg'
import cruiserY from '../../assets/images/cruiserY.svg'
import submarineX from '../../assets/images/submarineX.svg'
import submarineY from '../../assets/images/submarineY.svg'
import destroyerX from '../../assets/images/destroyerX.svg'
import destroyerY from '../../assets/images/destroyerY.svg'
// FACTORIES
import Game from '../factories/game'

const fleet = (() => {
  function loadFleet() {
    const board = document.getElementById('field-container')
    const map = Game.state.getPlayer().getMap()
    const boardArray = map.getBoard()

    for (let i = 0; i < boardArray.length; i += 1) {
      for (let j = 0; j < boardArray[0].length; j += 1) {
        // IF FIELD IS NOT EMPTY ON MAP LOAD SHIP
        if (boardArray[i][j] !== 'x') {
          loadShipOnBoard(boardArray[i][j], { board, i, j })
        }
      }
    }
  }

  function loadShipOnBoard(boardElement, data) {
    const map = Game.state.getPlayer().getMap()
    switch (boardElement) {
      case 'carrierX':
        if (map.getShip('carrier').isFound) return
        loadCarrierX(data)
        break
      case 'carrierY':
        if (map.getShip('carrier').isFound) return
        loadCarrierY(data)
        break
      case 'battleshipX':
        if (map.getShip('battleship').isFound) return
        loadBattleshipX(data)
        break
      case 'battleshipY':
        if (map.getShip('battleship').isFound) return
        loadBattleshipY(data)
        break
      case 'cruiserX':
        if (map.getShip('cruiser').isFound) return
        loadCruiserX(data)
        break
      case 'cruiserY':
        if (map.getShip('cruiser').isFound) return
        loadCruiserY(data)
        break
      case 'submarineX':
        if (map.getShip('submarine').isFound) return
        loadSubmarineX(data)
        break
      case 'submarineY':
        if (map.getShip('submarine').isFound) return
        loadSubmarineY(data)
        break
      case 'destroyerX':
        if (map.getShip('destroyer').isFound) return
        loadDestroyerX(data)
        break
      case 'destroyerY':
        if (map.getShip('destroyer').isFound) return
        loadDestroyerY(data)
        break
      default:
        break
    }
  }

  function loadCarrierX(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${carrierX})`
        : `, url(${carrierX})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '50% 10%' : ', 50% 10%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 20}% ${info.i * 11 + info.i / 10}%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    Game.state.getPlayer().getMap().getShip('carrier').found()
  }

  function loadCarrierY(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${carrierY})`
        : `, url(${carrierY})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '10% 50%' : ', 10% 50%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 11 + info.j / 10}% ${info.i * 20}%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    Game.state.getPlayer().getMap().getShip('carrier').found()
  }

  function loadBattleshipX(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${battleshipX})`
        : `, url(${battleshipX})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '40% 9.5%' : ', 40% 9.5%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 17.5 - (info.j / 2 + info.j / 5)}% ${
      info.i * 11 + info.i / 10
    }%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    Game.state.getPlayer().getMap().getShip('battleship').found()
  }

  function loadBattleshipY(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${battleshipY})`
        : `, url(${battleshipY})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '9.5% 40%' : ', 9.5% 40%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 11 + info.j / 10 + 0.5}% ${
      info.i * 17.5 - (info.i / 2 + info.i / 5)
    }%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    Game.state.getPlayer().getMap().getShip('battleship').found()
  }

  function loadCruiserX(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${cruiserX})`
        : `, url(${cruiserX})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '30% 10%' : ', 30% 10%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 15 - (info.j / 2 + info.j / 5)}% ${
      info.i * 11 + info.i / 10
    }%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    Game.state.getPlayer().getMap().getShip('cruiser').found()
  }

  function loadCruiserY(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${cruiserY})`
        : `, url(${cruiserY})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '10% 30%' : ', 10% 30%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 11 + info.j / 10}% ${
      info.i * 15 - (info.i / 2 + info.i / 5)
    }%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    Game.state.getPlayer().getMap().getShip('cruiser').found()
  }

  function loadSubmarineX(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${submarineX})`
        : `, url(${submarineX})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '30% 10%' : ', 30% 10%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 15 - (info.j / 2 + info.j / 5)}% ${
      info.i * 11 + info.i / 10 + 1
    }%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    Game.state.getPlayer().getMap().getShip('submarine').found()
  }

  function loadSubmarineY(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${submarineY})`
        : `, url(${submarineY})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '10% 30%' : ', 10% 30%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 11 + info.j / 10}% ${
      info.i * 15 - (info.i / 2 + info.i / 5)
    }%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    Game.state.getPlayer().getMap().getShip('submarine').found()
  }

  function loadDestroyerX(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${destroyerX})`
        : `, url(${destroyerX})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '20% 9%' : ', 20% 9%'

    // BACKGROUND POSITION
    const backgroundPosition = `${
      info.j * 13.25 - (info.j / 2 + info.j / 5)
    }% ${info.i * 11 + info.i / 10}%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    Game.state.getPlayer().getMap().getShip('destroyer').found()
  }

  function loadDestroyerY(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${destroyerY})`
        : `, url(${destroyerY})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '9% 20%' : ', 9% 20%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 11 + info.j / 10}% ${
      info.i * 13.25 - (info.i / 2 + info.i / 5)
    }%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    Game.state.getPlayer().getMap().getShip('destroyer').found()
  }

  return { loadFleet, loadShipOnBoard }
})()

export default fleet
