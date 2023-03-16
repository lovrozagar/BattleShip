import helper from './helper'
import fleet from './fleet'
import Game from '../factories/game'
import Component from './reusableComponents'
import Message from '../utils/message'

const Battle = (() => {
  function loadBattleContent() {
    helper.deleteAppContent()

    const app = document.getElementById('app')
    app.classList.replace('setup', 'battle')

    app.appendChild(createBattleWrapper())
    renderPlayerShips()
    Game.state.getCPU().autoPlace()

    helper.displayBattleStartMessage('agent')
    helper.displayBattleStartMessage('enemy')

    initBoardFields()

    styleOnTurn(document.querySelector('.message.battle.agent'))
  }

  function createBattleWrapper() {
    const wrapper = helper.create('div', { className: 'battle-wrapper' })

    helper.appendAll(wrapper, [
      createPlayerMap(),
      createComputerMap(),
      Component.createMessageSection(['battle', 'agent']),
      Component.createMessageSection(['battle', 'enemy']),
    ])

    return wrapper
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
    const container = helper.create('div', { className: 'map-title-container' })

    const title = helper.create('h3', {
      className: 'map-title',
      textContent: titleText,
    })

    container.appendChild(title)

    return container
  }

  function createWinnerModal(data) {
    const winModal = helper.create('section', {
      id: 'win-modal-container',
      className: 'win-modal-container',
    })

    const title = helper.create('h4', {
      id: `title-${data.id}`,
      className: `title-${data.id}`,
      textContent: data.title,
    })
    const message = Component.createMessageSection(['battle', data.id])

    const button = helper.create('button', {
      id: 'new-game-button',
      className: 'new-game-button',
      textContent: 'New Battle',
    })

    helper.appendAll(winModal, [title, message, button])

    return winModal
  }

  function initNewGameButton() {
    const button = document.getElementById('new-game-button')
    button.addEventListener('click', () => window.location.reload())
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

  async function handleFieldClick(event) {
    const { target } = event
    disableField(target)
    await playerPlays(target)
    await cpuPlays()
  }

  async function playerPlays(fieldNode) {
    const enemyMessage = document.querySelector('.message.battle.enemy')
    const agentMessage = document.querySelector('.message.battle.agent')

    const cpu = Game.state.getCPU()
    const index = [...fieldNode.parentNode.children].indexOf(fieldNode)
    const [row, col] = helper.getCoordinatesFromIndex(index)

    if (cpu.isLoser()) showPlayerWinModal()

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

    console.log('is player winner: ', cpu.isLoser())
    // console.log(cpu.getMap())

    displayPlayerMessage(boardElement, battleship)
    // await timeoutTwoAndHalfSeconds()
    styleOfTurn(agentMessage)
    styleOnTurn(enemyMessage)
  }

  function showPlayerWinModal() {
    const app = document.getElementById('app')
    app.appendChild(
      createWinnerModal({ title: 'Enemy fleet defeated!', id: 'agent-win' })
    )
    helper.displayWinMessage('agent-win')
    initNewGameButton()
  }

  function showEnemyWinModal() {
    const app = document.getElementById('app')
    app.appendChild(
      createWinnerModal({ title: 'Your fleet is gone!', id: 'enemy-win' })
    )
    helper.displayWinMessage('enemy-win')
    initNewGameButton()
  }

  async function cpuPlays() {
    const enemyMessage = document.querySelector('.message.battle.enemy')
    const agentMessage = document.querySelector('.message.battle.agent')

    displayPlayerNoCommentMessage()

    const friendlyBoard = document.getElementById('field-container-friendly')
    const player = Game.state.getPlayer()
    const [row, col] = player.cpuPlay()

    if (player.isLoser()) showEnemyWinModal()

    const boardElement = player.getMap().getBoard()[row][col]
    const shipName = getShipNameFromBoard(boardElement)
    const battleship = player.getMap().getShip(shipName)
    const index = helper.getIndexFromCoordinates(row, col)

    switch (boardElement) {
      case 'miss':
        addMissStyle(friendlyBoard.children[index])
        player.getMap().getBoard()[row][col] = 'miss'
        break
      default:
        player.getMap().getBoard()[row][col] = 'hit'
        addHitStyle(friendlyBoard.children[index])
    }

    console.log('is cpu winner: ', player.isLoser())

    displayEnemyMessage(boardElement, battleship)
    // console.log(player.getMap())

    // await timeoutTwoAndHalfSeconds()
    styleOfTurn(enemyMessage)
    styleOnTurn(agentMessage)
  }

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
        displayMessage(agent, Message.getNewEnemyHitMessage(agent.textContent))
      else if (ship.isSunk)
        displayMessage(agent, Message.getNewEnemySunkMessage(agent.textContent))
    } else {
      displayMessage(agent, Message.getNewPlayerMissMessage(agent.textContent))
    }

    if (enemy.textContent !== '...')
      displayMessage(enemy, Message.getNoCommentMessage()[0])
  }

  function displayEnemyMessage(boardElement, ship = false) {
    const enemy = document.getElementById('message-enemy')

    if (boardElement !== 'x' && boardElement !== 'miss') {
      if (ship && !ship.isSunk)
        displayMessage(enemy, Message.getNewPlayerHitMessage(enemy.textContent))
      else if (ship.isSunk)
        displayMessage(enemy, Message.getNewPlayerSunkMessage(enemy.textContent))
    } else {
      displayMessage(enemy, Message.getNewEnemyMissMessage(enemy.textContent))
    }
  }

  function displayPlayerNoCommentMessage() {
    const agent = document.getElementById('message-agent')

    displayMessage(agent, Message.getNoCommentMessage()[0])
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

  function styleOnTurn(node) {
    node.classList.add('on-turn')
  }

  function styleOfTurn(node) {
    node.classList.remove('on-turn')
  }

  function timeoutTwoAndHalfSeconds() {
    return new Promise((resolve) => setTimeout(resolve, 2500))
  }

  function timeoutSecond() {
    return new Promise((resolve) => setTimeout(resolve, 1000))
  }

  function timeoutHalfSecond() {
    return new Promise((resolve) => setTimeout(resolve, 500))
  }

  return { loadBattleContent }
})()

export default Battle
