import helper from './helper'
import fleet from './fleet'
import Game from '../factories/game'
import Component from './reusableComponents'
import Utils from '../utils/utils'

const Battle = (() => {
  function loadBattleContent() {
    helper.deleteAppContent()

    const app = document.getElementById('app')
    app.classList = ''
    app.classList.add('app', 'battle')

    app.appendChild(createMainSection())
    renderPlayerShips()
    Game.state.getCPU().autoPlace()

    helper.renderBattleStartMessage('agent')
    helper.renderBattleStartMessage('enemy')

    initBoardFields()
  }

  function createMainSection() {
    const mainSection = document.createElement('section')
    mainSection.className = 'maps-section'

    mainSection.appendChild(createPlayerMap())
    mainSection.appendChild(createComputerMap())
    mainSection.appendChild(Component.createMessageSection(['battle', 'agent']))
    mainSection.appendChild(Component.createMessageSection(['battle', 'enemy']))

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

    const board = document.getElementById('field-container-enemy')
    const cpu = Game.state.getCPU()
    const map = cpu.getMap()
    const enemyBoard = map.getBoard()

    const boardElement = enemyBoard[x][y]
    const shipName = getShipNameFromBoard(enemyBoard[x][y])
    const battleship = map.getShip(shipName)
    console.log('ENEMY MAP', map)

    if (boardElement === 'x') addMissStyle(target)
    else {
      console.log(battleship)
      battleship.hit()

      const [i, j] = findOrigin(enemyBoard, enemyBoard[x][y])
      if (battleship.isSunk) {
        fleet.loadShipOnBoard(cpu, { map, board, boardElement, i, j })
      }

      addHitStyle(target)
    }

    displayPlayerMessage(enemyBoard[x][y], battleship)

    const playerBoard = document.getElementById('field-container-friendly')
    const [row, col] = cpu.cpuPlay()
    console.log(row, col)
    const nodeIndex = helper.getIndexFromCoordinates(row, col)
    playerBoard.children[nodeIndex].classList.add('hit')
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
  function displayPlayerMessage(boardElement, ship = false) {
    const agent = document.getElementById('message-agent')
    const enemy = document.getElementById('message-enemy')

    console.log(ship, ship.isSunk)

    if (boardElement !== 'x') {
      if (ship && !ship.isSunk)
        displayMessage(agent, Utils.getNewEnemyHitMessage(agent.textContent))
      else if (ship.isSunk)
        displayMessage(agent, Utils.getNewEnemySunkMessage(agent.textContent))
    } else
      displayMessage(agent, Utils.getNewPlayerMissMessage(agent.textContent))
    console.log([Utils.getNoCommentMessage()])

    if (enemy.textContent !== '...')
      displayMessage(enemy, Utils.getNoCommentMessage()[0])
  }

  function displayMessage(node, message) {
    // REMOVE PREVIOUS TYPEWRITER
    clearTypeWriter(node)

    Component.addTypeWriterMessage(node, [message])
  }

  function clearTypeWriter(node) {
    if (node.nextElementSibling) {
      node.textContent = ''
      node.nextElementSibling.remove()
    }
  }

  function disableField(field) {
    field.classList.add('disabled')
  }

  function getShipNameFromBoard(boardElement) {
    return boardElement.slice(0, boardElement.length - 1)
  }

  function addHitStyle(node) {
    node.classList.add('hit')
  }

  function addMissStyle(node) {
    node.classList.add('miss')
  }

  return { loadBattleContent }
})()

export default Battle
