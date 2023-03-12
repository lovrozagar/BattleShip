// ASSETS
import carrier from '../../assets/images/carrierX.svg'
import battleship from '../../assets/images/battleshipX.svg'
import cruiser from '../../assets/images/cruiserX.svg'
import submarine from '../../assets/images/submarineX.svg'
import destroyer from '../../assets/images/destroyerX.svg'
// FACTORIES
import Game from '../factories/game'

const fleet = (() => {
  function loadFleet(board) {
    const map = Game.state.getPlayer().getMap()
    const boardArray = map.getBoard()
    console.log(boardArray)

    for (let i = 0; i < boardArray.length; i += 1) {
      for (let j = 0; j < boardArray[0].length; j += 1) {
        // IF FIELD IS NOT EMPTY ON MAP LOAD SHIP
        if (boardArray[i][j] !== 'x') {
          loadShipOnBoard(boardArray[i][j], { map, board, i, j })
        }
      }
    }
  }

  function loadShipOnBoard(player, data) {
    const shipName = data.boardElement.slice(0, data.boardElement.length - 1)
    const ship = player.getMap().getShip(shipName)

    if (ship.isFound) return
    ship.found()

    const length = ship.getLength()
    const [height, width] = [`10%`, `${length * 10}%`]
    const [top, left] = [`${data.i * 10}%`, `${data.j * 10}%`]
    const axis = data.boardElement.at(-1)
    let rotation = 'rotate(0deg)'

    if (axis === 'Y') rotation = 'rotate(90deg) translate(0,-100%)'

    const shipDiv = document.createElement('div')
    shipDiv.style.position = 'absolute'
    shipDiv.style.zIndex = '-1'
    shipDiv.style.top = top
    shipDiv.style.left = left
    shipDiv.style.width = width
    shipDiv.style.height = height
    shipDiv.style.transform = rotation
    shipDiv.style.transformOrigin = 'top left'

    const image = document.createElement('img')
    image.src = loadShipImage(shipName)
    image.style.height = '95%'
    image.style.aspectRatio = `${length}/1`

    shipDiv.appendChild(image)
    data.board.appendChild(shipDiv)
  }

  // THIS IS FOR WEBPACK IMAGE LOADING
  function loadShipImage(shipName) {
    let shipImage
    switch (shipName) {
      case 'carrier':
        shipImage = carrier
        break
      case 'battleship':
        shipImage = battleship
        break
      case 'cruiser':
        shipImage = cruiser
        break
      case 'submarine':
        shipImage = submarine
        break
      case 'destroyer':
        shipImage = destroyer
        break
      default:
        shipImage = ''
    }
    return shipImage
  }

  return { loadFleet, loadShipOnBoard }
})()

export default fleet
