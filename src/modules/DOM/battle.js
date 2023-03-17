import helper from './helper'
import fleet from './fleet'
import Game from '../factories/game'
import Component from './reusableComponents'
import Message from '../utils/message'
import Sound from '../utils/sound'

const Battle = (() => {
  function loadBattleContent() {
    helper.deleteAppContent()

    const app = document.getElementById('app')
    app.classList.replace('setup', 'battle')

    app.appendChild(createBattleWrapper())
    displayPlayerShips()
    Game.state.getCPU().autoPlace()

    displayBattleStartMessage('agent')
    displayBattleStartMessage('enemy')

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

  function displayPlayerShips() {
    const friendlyBoard = document.getElementById('field-container-friendly')
    Game.state.getPlayer().getMap().setAllShipsNotFound()
    fleet.loadFleet(friendlyBoard)
  }

  async function handleFieldClick(event) {
    const { target } = event
    disableField(target)
    await playerPlays(target)
    await cpuPlays()
  }

  async function playerPlays(fieldNode) {
    unInitBoardFields()

    const enemyMessage = document.querySelector('.message.battle.enemy')
    const agentMessage = document.querySelector('.message.battle.agent')

    Sound.shot()
    await timeoutHalfSecond()

    const cpu = Game.state.getCPU()
    const index = [...fieldNode.parentNode.children].indexOf(fieldNode)
    const [row, col] = helper.getCoordinatesFromIndex(index)

    const boardElement = cpu.getMap().getBoard()[row][col]
    const shipName = getShipNameFromBoard(boardElement)
    const battleship = cpu.getMap().getShip(shipName)

    console.log(cpu.getMap().getBoard())

    switch (boardElement) {
      case 'x':
        addMissStyle(fieldNode)
        await timeoutMissileLength()
        Sound.miss()
        break
      default:
        addHitStyle(fieldNode)
        playerHits({ cpu, battleship, row, col })
        await timeoutMissileLength()
        Sound.hit()
    }

    console.log('is player winner: ', cpu.isLoser())
    console.log(cpu.getMap())

    displayPlayerMessage(boardElement, battleship)

    await timeoutOneSecond()
    if (cpu.isLoser()) showPlayerWinModal()
    await timeoutOneAndHalfSecond()

    styleOffTurn(agentMessage)
    styleOnTurn(enemyMessage)
    resizePlayerOffTurn()
  }

  function displayBattleStartMessage(character) {
    const message = document.getElementById(`message-${character}`)
    if (character === 'agent')
      Component.addTypeWriterMessage(message, Message.getBattleStartMessage())
    else
      Component.addTypeWriterMessage(
        message,
        Message.getNewEnemyBattleStartMessage()
      )
  }

  function displayWinMessage(character) {
    const message = document.getElementById(`message-${character}`)
    if (character === 'agent-win')
      Component.addTypeWriterMessage(message, Message.getPlayerWinMessage())
    if (character === 'enemy-win')
      Component.addTypeWriterMessage(message, Message.getEnemyWinMessage())
  }

  async function cpuPlays() {
    const enemyMessage = document.querySelector('.message.battle.enemy')
    const agentMessage = document.querySelector('.message.battle.agent')

    displayPlayerNoCommentMessage()

    await timeoutOneSecond()
    Sound.shot()
    await timeoutHalfSecond()

    const friendlyBoard = document.getElementById('field-container-friendly')
    const player = Game.state.getPlayer()
    const [row, col] = player.cpuPlay()

    const boardElement = player.getMap().getBoard()[row][col]
    const shipName = getShipNameFromBoard(boardElement)
    const battleship = player.getMap().getShip(shipName)
    const index = helper.getIndexFromCoordinates(row, col)

    switch (boardElement) {
      case 'miss':
        addMissStyle(friendlyBoard.children[index])
        player.getMap().getBoard()[row][col] = 'miss'
        await timeoutMissileLength()
        Sound.miss()
        break
      default:
        addHitStyle(friendlyBoard.children[index])
        player.getMap().getBoard()[row][col] = 'hit'
        await timeoutMissileLength()
        Sound.hit()
    }

    console.log('is cpu winner: ', player.isLoser())

    displayEnemyMessage(boardElement, battleship)

    await timeoutOneSecond()
    if (player.isLoser()) showEnemyWinModal()
    await timeoutOneAndHalfSecond()

    styleOffTurn(enemyMessage)
    styleOnTurn(agentMessage)
    resizePlayerOnTurn()
    initBoardFields()
  }

  function showPlayerWinModal() {
    const app = document.getElementById('app')
    app.appendChild(
      createWinnerModal({ title: 'Enemy fleet defeated!', id: 'agent-win' })
    )
    displayWinMessage('agent-win')
    initNewGameButton()
  }

  function showEnemyWinModal() {
    const app = document.getElementById('app')
    app.appendChild(
      createWinnerModal({ title: 'Your fleet is gone!', id: 'enemy-win' })
    )
    displayWinMessage('enemy-win')
    initNewGameButton()
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
        displayMessage(
          enemy,
          Message.getNewPlayerSunkMessage(enemy.textContent)
        )
    } else {
      displayMessage(enemy, Message.getNewEnemyMissMessage(enemy.textContent))
    }
  }

  function playerHits(data) {
    const board = document.getElementById('field-container-enemy')
    const map = data.cpu.getMap()
    const boardArray = map.getBoard()

    map.receiveAttack([data.row, data.col])
    if (data.battleship.isSunk) {
      const element = boardArray[data.row][data.col]
      const [row, col] = findOrigin(boardArray, boardArray[data.row][data.col])
      fleet.loadShipOnBoard(data.cpu, { map, board, element, row, col })
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

  // INITS / UnINITS

  function initBoardFields() {
    const enemyMap = document.getElementById('board-enemy')
    const enemyBoard = enemyMap.querySelector('.field-container')
    enemyBoard.childNodes.forEach((field) => {
      field.addEventListener('click', handleFieldClick)
    })
    addFieldHoverWhenOnTurn()
  }

  function unInitBoardFields() {
    const fields = document.querySelectorAll('.field')
    fields.forEach((field) =>
      field.removeEventListener('click', handleFieldClick)
    )
    removeFieldHoverWhenOffTurn()
  }

  // MESSAGES

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

  function getShipNameFromBoard(boardElement) {
    return boardElement.slice(0, boardElement.length - 1)
  }

  function removeFieldHoverWhenOffTurn() {
    const container = document.getElementById('field-container-enemy')
    disableField(container)
  }

  function resizePlayerOnTurn() {
    styleOffTurn(document.getElementById('board-enemy'))
    styleOnTurn(document.getElementById('board-friendly'))
  }

  function resizePlayerOffTurn() {
    styleOffTurn(document.getElementById('board-friendly'))
    styleOnTurn(document.getElementById('board-enemy'))
  }

  function addFieldHoverWhenOnTurn() {
    const container = document.getElementById('field-container-enemy')
    enableField(container)
  }

  function enableField(field) {
    field.classList.remove('disabled')
  }

  function disableField(field) {
    field.classList.add('disabled')
  }

  function addHitStyle(node) {
    node.classList.add('hit')
  }

  function addMissStyle(node) {
    node.classList.add('miss')
  }

  function styleOnTurn(node) {
    node.classList.remove('off-turn')
    node.classList.add('on-turn')
  }

  function styleOffTurn(node) {
    node.classList.remove('on-turn')
    node.classList.add('off-turn')
  }

  // TIMEOUTS

  function timeoutOneAndHalfSecond() {
    return new Promise((resolve) => setTimeout(resolve, 1500))
  }

  function timeoutOneSecond() {
    return new Promise((resolve) => setTimeout(resolve, 1000))
  }

  function timeoutHalfSecond() {
    return new Promise((resolve) => setTimeout(resolve, 500))
  }

  function timeoutMissileLength() {
    return new Promise((resolve) => setTimeout(resolve, 300))
  }

  return { loadBattleContent }
})()

export default Battle
