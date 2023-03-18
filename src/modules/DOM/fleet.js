// ASSETS
import carrier from '../../assets/images/carrierX.svg'
import battleship from '../../assets/images/battleshipX.svg'
import cruiser from '../../assets/images/cruiserX.svg'
import submarine from '../../assets/images/submarineX.svg'
import destroyer from '../../assets/images/destroyerX.svg'
// FACTORIES
import Game from '../factories/game'
import helper from './helper'

const fleet = (() => {
  // USED FOR SYNCING SHIP RADAR BEEP ANIMATION
  let startTime = null

  function loadFleet(board) {
    const player = Game.getState().getPlayer()
    const map = player.getMap()
    const boardArray = map.getBoard()

    for (let row = 0; row < boardArray.length; row += 1) {
      for (let col = 0; col < boardArray[0].length; col += 1) {
        // IF FIELD IS NOT EMPTY ON MAP LOAD SHIP
        if (boardArray[row][col] !== 'x') {
          const element = boardArray[row][col]
          loadShipOnBoard(player, { map, board, element, row, col })
        }
      }
    }
  }

  function getCurrentTime() {
    if (startTime === null) {
      startTime = new Date().getTime()
    }
    return (new Date().getTime() - startTime) / 1000 // convert to seconds
  }

  function loadShipOnBoard(player, data) {
    const shipName = data.element.slice(0, -1)
    const ship = player.getMap().getShip(shipName)

    if (ship.isFound) return
    ship.found()

    const length = ship.getLength()
    const [height, width] = [`10%`, `${length * 10}%`]
    const [top, left] = [`${data.row * 10}%`, `${data.col * 10}%`]
    const axis = data.element.at(-1)

    let rotation = 'rotate(0deg)'

    if (axis === 'Y') rotation = 'rotate(90deg) translate(0,-100%)'

    const currentTime = getCurrentTime()

    const container = helper.create('div', {
      className: 'ship-image-container',
    })

    container.classList.add('bleep')
    container.style.position = 'absolute'
    container.style.zIndex = '-1'
    container.style.top = top
    container.style.left = left
    container.style.width = width
    container.style.height = height
    container.style.transform = rotation
    container.style.transformOrigin = 'top left'
    container.style.maskImage = carrier
    container.style.animationDelay = `${-currentTime}s`

    const image = helper.create('img', {
      className:
        player.isCpu === true ? `${shipName}-cpu` : `${shipName}-player`,
    })
    image.src = loadShipImage(shipName)
    image.style.height = '95%'
    image.style.aspectRatio = `${length}/1`

    container.appendChild(image)
    data.board.appendChild(container)
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
