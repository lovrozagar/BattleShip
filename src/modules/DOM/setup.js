/* eslint-disable no-unused-expressions */
// ASSETS
import carrier from '../../assets/images/carrierX.svg'
import battleship from '../../assets/images/battleshipX.svg'
import cruiser from '../../assets/images/cruiserX.svg'
import submarine from '../../assets/images/submarineX.svg'
import destroyer from '../../assets/images/destroyerX.svg'
import helper from './helper'
// FACTORIES
import Game from '../factories/game'
// DOM
import Battle from './battle'
import Component from './reusableComponents'
import Utils from '../utils/utils'

const setup = (() => {
  function loadSetupContent() {
    const app = document.getElementById('app')
    app.classList = ''
    app.classList.add('app', 'setup')

    app.appendChild(helper.getHeader('setup'))
    app.appendChild(Component.createMessageSection(['setup', 'agent']))
    app.appendChild(createMapFleetSection())
    app.appendChild(createResetContinueSection())

    const message = document.getElementById('message-agent')
    Component.addTypeWriterMessage(message, Utils.getWelcomeMessage())

    initButtons()
  }

  function createMapFleetSection() {
    const setupContainer = document.createElement('section')
    setupContainer.id = 'setup-container'
    setupContainer.className = 'setup-container'

    setupContainer.appendChild(createMapFleet())

    return setupContainer
  }

  function createMapFleet() {
    const boardAndFleet = document.createElement('div')
    boardAndFleet.className = 'board-fleet-container'

    boardAndFleet.appendChild(helper.createMap('setup'))
    boardAndFleet.appendChild(createFleetSelectSection())

    const boardContainer = boardAndFleet.querySelector('#board-setup')
    boardContainer.appendChild(createAxisButtons())

    return boardAndFleet
  }

  function createAxisButtons() {
    const buttonContainer = document.createElement('div')
    buttonContainer.id = 'axis-button-container'
    buttonContainer.className = 'axis-button-container'

    const buttonX = document.createElement('button')
    buttonX.id = 'x-button'
    // DEFAULT SELECTED BUTTON
    buttonX.classList.add('axis-button', 'selected')
    buttonX.textContent = 'X axis'

    const buttonY = document.createElement('button')
    buttonY.id = 'y-button'
    buttonY.className = 'axis-button'
    buttonY.textContent = 'Y axis'

    buttonContainer.appendChild(buttonX)
    buttonContainer.appendChild(buttonY)

    return buttonContainer
  }

  function createFleetSelectSection() {
    const fleetSection = document.createElement('section')
    fleetSection.id = 'fleet-setup'
    fleetSection.className = 'fleet-setup'

    const fleet = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']

    fleet.forEach((ship) => {
      const shipCard = createShipCard(ship)
      shipCard.draggable = 'true'
      fleetSection.appendChild(shipCard)
    })

    return fleetSection
  }

  function createShipCard(shipName) {
    const card = document.createElement('button')
    const content = document.createElement('div')
    const image = document.createElement('img')
    const name = document.createElement('p')

    card.className = 'ship-card'
    content.className = 'ship-content'
    image.className = 'ship-image'
    name.className = 'ship-name'

    switch (shipName) {
      case 'carrier':
        card.dataset.shipName = 'carrier'
        card.dataset.shipLength = 5
        image.src = carrier
        name.textContent = 'Carrier'
        break
      case 'battleship':
        card.dataset.shipName = 'battleship'
        card.dataset.shipLength = 4
        image.src = battleship
        name.textContent = 'Battleship'
        break
      case 'cruiser':
        card.dataset.shipName = 'cruiser'
        card.dataset.shipLength = 3
        image.src = cruiser
        name.textContent = 'Cruiser'
        break
      case 'submarine':
        card.dataset.shipName = 'submarine'
        card.dataset.shipLength = 3
        image.src = submarine
        name.textContent = 'Submarine'
        break
      case 'destroyer':
        card.dataset.shipName = 'destroyer'
        card.dataset.shipLength = 2
        image.src = destroyer
        name.textContent = 'Destroyer'
        break
      default:
    }

    content.appendChild(image)
    content.appendChild(name)

    card.appendChild(content)

    return card
  }

  function createResetContinueSection() {
    const buttonContainer = document.createElement('section')
    buttonContainer.id = 'reset-continue-section'
    buttonContainer.className = 'reset-continue-section'

    const resetButton = document.createElement('button')
    resetButton.id = 'reset-button'
    resetButton.className = 'reset-button'
    resetButton.textContent = 'Reset'

    const continueButton = document.createElement('button')
    continueButton.id = 'continue-button'
    continueButton.className = 'continue-button'
    continueButton.textContent = 'Confirm'

    buttonContainer.appendChild(resetButton)
    buttonContainer.appendChild(continueButton)

    return buttonContainer
  }

  function initButtons() {
    initAxisButtons()
    initResetContinueButtons()
  }

  function initAxisButtons() {
    const buttonX = document.getElementById('x-button')
    const buttonY = document.getElementById('y-button')

    buttonX.addEventListener('click', () => handleButton(buttonX, buttonY))
    buttonY.addEventListener('click', () => handleButton(buttonY, buttonX))
  }

  function handleButton(button, oppositeButton) {
    const map = Game.state.getPlayer().getMap()

    button.id === 'x-button' ? map.setAxisX() : map.setAxisY()
    button.classList.add('selected')
    oppositeButton.classList.remove('selected')
  }

  function initResetContinueButtons() {
    const resetButton = document.getElementById('reset-button')
    const continueButton = document.getElementById('continue-button')
    const board = Game.state.getPlayer().getMap().getBoard()

    resetButton.addEventListener('click', () => handleReset(board))
    continueButton.addEventListener('click', handleContinue)
  }

  function handleReset(board) {
    const fieldContainer = document.getElementById('field-container-setup')

    resetFleetSelect()
    resetArray(board)
    removePlacedShips(fieldContainer)
  }

  function resetFleetSelect() {
    const map = Game.state.getPlayer().getMap()

    changeMessage()
    map.getFleet().forEach((warship) => warship.resetFound())
    map.setFleetEmpty()
  }

  function changeMessage() {
    const fleet = document.getElementById('fleet-setup')
    const tipText = document.getElementById('message-text')
    const isReset = tipText.classList.contains('reset')
    let isEmpty = true

    fleet.childNodes.forEach((node) => {
      if (node.classList.contains('hidden')) {
        node.classList.remove('hidden')
        tipText.classList.add('reset')
        isEmpty = false
      }
    })

    if (isReset && !isEmpty) tipText.classList.add('take-time')
  }

  function resetArray(array) {
    for (let i = 0; i < array.length; i += 1) {
      for (let j = 0; j < array[0].length; j += 1) {
        array[i][j] = 'x'
      }
    }
  }

  function removePlacedShips(parentNode) {
    const ships = parentNode.querySelectorAll('.ship-image-container')
    ships.forEach((ship) => ship.remove())
  }

  function handleContinue() {
    // IF ALL PLACED, CONTINUE TO BATTLE
    // if (Game.state.getPlayer().getMap().areAllShipsFound())
    Battle.loadBattleContent()
  }

  return { loadSetupContent }
})()

export default setup
