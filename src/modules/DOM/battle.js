import helper from './helper'
import fleet from './fleet'
import Game from '../factories/game'
import component from './reusableComponents'

const Battle = (() => {
  function loadBattleContent() {
    helper.deleteAppContent()

    const app = document.getElementById('app')
    app.classList = ''
    app.classList.add('app', 'battle')

    app.appendChild(createMainSection())
    renderPlayerShips()
    Game.state.getCPU().autoPlace()
    initBoardFields()
  }

  function createMainSection() {
    const mainSection = document.createElement('section')
    mainSection.className = 'maps-section'

    mainSection.appendChild(createPlayerMap())
    mainSection.appendChild(createComputerMap())
    mainSection.appendChild(component.createMessageSection('battle'))

    return mainSection
  }

  function createPlayerMap() {
    const map = helper.createMap('friendly')
    map.appendChild(createMapTitle('FRIENDLY WATERS'))

    return map
  }

  function createComputerMap() {
    const map = helper.createMap('enemy')
    map.appendChild(createMapTitle('ENEMY WATERS'))

    return map
  }

  function createMapTitle(titleText) {
    const titleContainer = document.createElement('div')
    titleContainer.className = 'map-title-container'

    const title = document.createElement('h3')
    title.className = 'map-title'
    title.textContent = titleText

    titleContainer.appendChild(title)

    return titleContainer
  }

  function renderPlayerShips() {
    const friendlyBoard = document.getElementById('field-container-friendly')
    Game.state.getPlayer().getMap().setAllShipsNotFound()
    fleet.loadFleet(friendlyBoard)
  }

  function initBoardFields() {
    const enemyMap = document.getElementById('board-enemy')
    const enemyBoard = enemyMap.querySelector('.field-container')
    enemyBoard.childNodes.forEach((field) => {
      field.addEventListener('click', handleFieldClick)
    })
  }

  function handleFieldClick(event) {
    const { target } = event
    disableField(target)

    const index = [...target.parentNode.children].indexOf(target)
    const x = parseInt(index / 10, 10)
    const y = index % 10

    const enemyBoard = Game.state.getCPU().getMap().getBoard()
    const enemyMap = Game.state.getCPU().getMap()
    console.log('ENEMY MAP', enemyMap)

    if (enemyBoard[x][y] === 'hit' || enemyBoard[x][y] === 'missed') return

    if (enemyBoard[x][y] === 'x') {
      displayMissMessage()
      target.classList.add('miss')
    } else {
      const shipName = getShipNameFromBoard(enemyBoard[x][y])
      const battleship = enemyMap.getShip(shipName)

      battleship.hit()
      displayHitMessage(battleship)
      const enemyFields = document.getElementById('field-container-enemy')
      const [i, j] = findOrigin(enemyBoard, enemyBoard[x][y])
      if (battleship.isSunk) {
        fleet.loadShipOnBoard(Game.state.getCPU(), {
          map: enemyMap,
          board: enemyFields,
          boardElement: enemyBoard[x][y],
          i,
          j,
        })
      }
      target.classList.add('hit')
    }
  }

  function findOrigin(board, element) {
    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[0].length; j += 1) {
        if (board[i][j] === element) return [i, j]
      }
    }
    return [0, 0]
  }

  // TODO: dont allow same class
  function displayHitMessage(ship) {
    const messageElement = document.getElementById('message-text')
    const messageCurrentNumber = getMessageNumber(messageElement)
    let messageNewNumber = messageCurrentNumber

    while (messageCurrentNumber === messageNewNumber) {
      messageNewNumber = helper.randomOneToTen().toString()
    }

    if (!ship.isSunk) {
      messageElement.className = 'message-text'
      messageElement.classList.add(`hit-${helper.randomOneToTen()}`)
      messageNewNumber = `hit-${helper.randomOneToTen()}`
    }
    if (ship.isSunk) {
      messageElement.className = 'message-text'
      messageElement.classList.add(`sunk-${helper.randomOneToTen()}`)
      messageNewNumber = `hit-${helper.randomOneToTen()}`
    }
  }

  function displayMissMessage() {
    const messageElement = document.getElementById('message-text')
    const messageCurrentNumber = getMessageNumber(messageElement)
    let messageNewNumber = messageCurrentNumber

    while (messageCurrentNumber === messageNewNumber) {
      messageNewNumber = helper.randomOneToTen().toString()
    }

    messageElement.className = 'message-text'
    messageElement.classList.add(`miss-${messageNewNumber}`)
  }

  function getMessageNumber(node) {
    return node.className.split('-')[2] // GET MESSAGE NUMBER
  }

  function hitMessage() {}

  function disableField(field) {
    field.classList.add('disabled')
  }

  function getShipNameFromBoard(boardElement) {
    return boardElement.slice(0, boardElement.length - 1)
  }

  return { loadBattleContent }
})()

export default Battle
