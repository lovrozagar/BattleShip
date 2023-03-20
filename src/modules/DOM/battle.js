import helper from './helper'
import fleet from './fleet'
import Game from '../factories/game'
import Component from './reusableComponents'
import Message from '../utils/message'
import Sound from '../utils/sound'

const Battle = (() => {
  // MAIN CALLER
  function loadBattleContent() {
    helper.deleteAppContent()

    const app = document.getElementById('app')
    app.classList.replace('setup', 'battle')

    app.appendChild(createBattleWrapper())
    displayPlayerShips()
    Game.getState().getCPU().autoPlace()

    displayBattleStartMessage('agent')
    displayBattleStartMessage('enemy')

    initBoardFields()

    styleOnTurn(document.querySelector('.message.battle.agent'))
  }

  // COMPONENTS

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

    winModal.classList.add(data.className)

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

  function createWinOverlay() {
    const overlay = helper.create('div', { className: 'win-overlay' })

    return overlay
  }

  function showPlayerWinModal() {
    const app = document.getElementById('app')

    helper.appendAll(app, [
      createWinnerModal({
        title: 'YOU WIN!',
        id: 'agent-win',
        className: 'player',
      }),
      createWinOverlay(),
    ])

    displayWinMessage('agent-win')
    initNewGameButton()
    unInitBoardFields()

    return 'win'
  }

  function showEnemyWinModal() {
    const app = document.getElementById('app')

    helper.appendAll(app, [
      createWinnerModal({
        title: 'YOU LOSE!',
        id: 'enemy-win',
        className: 'enemy',
      }),
      createWinOverlay(),
    ])

    displayWinMessage('enemy-win')
    initNewGameButton()

    return 'win'
  }

  // LISTENERS

  function initNewGameButton() {
    const button = document.getElementById('new-game-button')
    button.addEventListener('click', () => window.location.reload())
  }

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

  // HANDLERS

  async function handleFieldClick(event) {
    const { target } = event
    disableField(target)
    // Player
    const playerTurn = await playerPlays(target)
    if (playerTurn === 'win' || playerTurn === 'hit') return
    // Cpu
    let cpuTurn = await cpuPlays()
    if (cpuTurn === 'win') return
    while (cpuTurn === 'hit') cpuTurn = await cpuPlays()
  }

  // PLAYER/CPU TURNS

  async function playerPlays(fieldNode) {
    const cpu = Game.getState().getCPU()
    const index = [...fieldNode.parentNode.children].indexOf(fieldNode)
    const [row, col] = helper.getCoordinatesFromIndex(index)

    const boardElement = cpu.getMap().getBoard()[row][col]
    const shipName = getShipNameFromBoard(boardElement)
    const battleship = cpu.getMap().getShip(shipName)

    console.log(cpu.getMap().getBoard())
    unInitBoardFields()
    await shotOnTurnPlay('player')

    if (boardElement === 'x') await playerMiss(fieldNode)
    else return await playerHit(fieldNode)

    displayPlayerMessage(boardElement, battleship)
    await timeoutOneSecond()
    await turnEnd('player')

    return 'miss'
  }

  async function cpuPlays() {
    const player = Game.getState().getPlayer()
    const [row, col] = player.cpuPlay()

    const boardElement = player.getMap().getBoard()[row][col]
    const shipName = getShipNameFromBoard(boardElement)
    const battleship = player.getMap().getShip(shipName)

    console.log(row, col)

    await shotOnTurnPlay('cpu')

    if (boardElement === 'miss') await cpuMiss(row, col)
    else return await cpuHit(row, col)

    displayEnemyMessage(boardElement, battleship)
    await timeoutOneSecond()
    await turnEnd('cpu')

    return 'miss'
  }

  // TURN HELPERS

  async function shotOnTurnPlay(playerOrCpu) {
    if (playerOrCpu === 'player') {
      Sound.shot()
      await timeoutHalfSecond()
    } else {
      displayPlayerNoCommentMessage()
      await timeoutOneSecond()
      Sound.shot()
      await timeoutHalfSecond()
    }
  }

  async function playerMiss(fieldNode) {
    addMissStyle(fieldNode)
    await timeoutMissileLength()
    Sound.miss()
  }

  async function cpuMiss(row, col) {
    const friendlyBoard = document.getElementById('field-container-friendly')
    const player = Game.getState().getPlayer()
    const index = helper.getIndexFromCoordinates(row, col)

    addMissStyle(friendlyBoard.children[index])
    player.getMap().getBoard()[row][col] = 'miss'
    await timeoutMissileLength()
    Sound.miss()
  }

  async function playerHit(fieldNode) {
    const cpu = Game.getState().getCPU()
    const index = [...fieldNode.parentNode.children].indexOf(fieldNode)
    const [row, col] = helper.getCoordinatesFromIndex(index)

    const boardElement = cpu.getMap().getBoard()[row][col]
    const shipName = getShipNameFromBoard(boardElement)
    const battleship = cpu.getMap().getShip(shipName)

    addHitStyle(fieldNode)
    loadShipIfSunk({ cpu, battleship, row, col })
    await timeoutMissileLength()
    Sound.hit()
    displayPlayerMessage(boardElement, battleship)

    await timeoutOneSecond()
    if (cpu.isLoser()) return showPlayerWinModal()
    initBoardFields()

    return 'hit'
  }

  async function cpuHit(row, col) {
    const friendlyBoard = document.getElementById('field-container-friendly')
    const player = Game.getState().getPlayer()
    const index = helper.getIndexFromCoordinates(row, col)

    const boardElement = player.getMap().getBoard()[row][col]
    const shipName = getShipNameFromBoard(boardElement)
    const battleship = player.getMap().getShip(shipName)

    addHitStyle(friendlyBoard.children[index])
    player.getMap().getBoard()[row][col] = 'hit'
    await timeoutMissileLength()
    Sound.hit()
    displayEnemyMessage(boardElement, battleship)
    if (player.isLoser()) return showEnemyWinModal()

    return 'hit'
  }

  async function turnEnd(playerOrCpu) {
    await timeoutOneAndHalfSecond()

    if (playerOrCpu === 'player') {
      styleOffTurn(document.querySelector('.message.battle.agent'))
      styleOnTurn(document.querySelector('.message.battle.enemy'))
      resizePlayerOffTurn()
    } else {
      styleOffTurn(document.querySelector('.message.battle.enemy'))
      styleOnTurn(document.querySelector('.message.battle.agent'))
      resizePlayerOnTurn()
      initBoardFields()
    }
  }

  // FLEET

  function displayPlayerShips() {
    const friendlyBoard = document.getElementById('field-container-friendly')
    Game.getState().getPlayer().getMap().setAllShipsNotFound()
    fleet.loadFleet(friendlyBoard)
  }

  function loadShipIfSunk(data) {
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

  function getShipNameFromBoard(boardElement) {
    return boardElement.slice(0, boardElement.length - 1)
  }

  // MESSAGES

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

  function displayPlayerNoCommentMessage() {
    const agent = document.getElementById('message-agent')

    displayMessage(agent, Message.getNoCommentMessage()[0])
  }

  function displayWinMessage(character) {
    const message = document.getElementById(`message-${character}`)
    if (character === 'agent-win')
      Component.addTypeWriterMessage(message, Message.getPlayerWinMessage())
    if (character === 'enemy-win')
      Component.addTypeWriterMessage(message, Message.getEnemyWinMessage())
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

  // STYLIZERS

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
