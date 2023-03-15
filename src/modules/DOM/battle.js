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
    playerPlays(target)
    cpuPlays()
  }

  function playerPlays(fieldNode) {
    const cpu = Game.state.getCPU()
    const index = [...fieldNode.parentNode.children].indexOf(fieldNode)
    const [row, col] = helper.getCoordinatesFromIndex(index)

    const boardElement = cpu.getMap().getBoard()[row][col]
    const shipName = getShipNameFromBoard(boardElement)
    const battleship = cpu.getMap().getShip(shipName)

    switch (boardElement) {
      case 'x':
        addMissStyle(fieldNode)
        break
      default:
        addHitStyle(fieldNode)
        playerHits({ cpu, battleship, row, col })
    }

    displayPlayerMessage(boardElement, battleship)
  }

  async function cpuPlays() {
    await timeout()

    const friendlyBoard = document.getElementById('field-container-friendly')
    const player = Game.state.getPlayer()
    const [row, col] = player.cpuPlay()
    console.log(row, col)

    const boardElement = player.getMap().getBoard()[row][col]
    const index = helper.getIndexFromCoordinates(row, col)
    console.log(boardElement)
    switch (boardElement) {
      case 'miss':
        addMissStyle(friendlyBoard.children[index])
        player.getMap().getBoard()[row][col] = 'miss'
        break
      default:
        player.getMap().getBoard()[row][col] = 'hit'
        addHitStyle(friendlyBoard.children[index])
    }

    console.log(player.getMap())
  }

  function cpuShot(player) {}

  function playerHits(data) {
    const enemyBoardNode = document.getElementById('field-container-enemy')
    const map = data.cpu.getMap()
    const board = map.getBoard()
    // rename to rowOrigin, colOrigin
    map.receiveAttack([data.row, data.col])
    if (data.battleship.isSunk) {
      const [i, j] = findOrigin(board, board[data.row][data.col])
      fleet.loadShipOnBoard(data.cpu, {
        map,
        board: enemyBoardNode,
        boardElement: board[data.row][data.col],
        i,
        j,
      })
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
  function displayPlayerMessage(boardElement, ship = false) {
    const agent = document.getElementById('message-agent')
    const enemy = document.getElementById('message-enemy')

    if (boardElement !== 'x') {
      if (ship && !ship.isSunk)
        displayMessage(agent, Utils.getNewEnemyHitMessage(agent.textContent))
      else if (ship.isSunk)
        displayMessage(agent, Utils.getNewEnemySunkMessage(agent.textContent))
    } else
      displayMessage(agent, Utils.getNewPlayerMissMessage(agent.textContent))

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

  function timeout() {
    return new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return { loadBattleContent }
})()

export default Battle
