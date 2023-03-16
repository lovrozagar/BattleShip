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
import Message from '../utils/message'

const setup = (() => {
  function loadSetupContent() {
    const app = document.getElementById('app')
    app.classList.replace('pregame', 'setup')

    app.appendChild(createSetupWrapper())

    displayWelcomeMessage()
    initButtons()
  }

  function createSetupWrapper() {
    const wrapper = helper.create('div', { className: 'setup-wrapper' })

    helper.appendAll(wrapper, [
      Component.createMessageSection(['setup', 'agent']),
      createMapFleetSection(),
      createResetContinueSection(),
    ])

    return wrapper
  }

  function createMapFleetSection() {
    const section = helper.create('section', {
      id: 'setup-container',
      className: 'setup-container',
    })

    section.appendChild(createMapFleet())

    return section
  }

  function createMapFleet() {
    const container = helper.create('div', {
      className: 'board-fleet-container',
    })

    helper.appendAll(container, [
      helper.createMap('setup'),
      createFleetSelectSection(),
    ])

    container.querySelector('#board-setup').appendChild(createAxisButtons())

    return container
  }

  function createAxisButtons() {
    const container = helper.create('div', {
      id: 'axis-button-container',
      className: 'axis-button-container',
    })

    const buttonX = helper.create('button', {
      id: 'x-button',
      className: 'axis-button',
      textContent: 'X axis',
    })
    const buttonY = helper.create('button', {
      id: 'y-button',
      className: 'axis-button',
      textContent: 'Y axis',
    })

    buttonX.classList.add('selected')

    helper.appendAll(container, [buttonX, buttonY])

    return container
  }

  function createFleetSelectSection() {
    const section = helper.create('section', {
      id: 'fleet-setup',
      className: 'fleet-setup',
    })

    const fleet = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']

    fleet.forEach((ship) => {
      const shipCard = createShipCard(ship)
      shipCard.draggable = 'true'
      section.appendChild(shipCard)
    })

    return section
  }

  function createShipCard(shipName) {
    const card = helper.create('button', { className: 'ship-card' })
    const content = helper.create('div', { className: 'ship-content' })
    const image = helper.create('img', { className: 'ship-image' })
    const name = helper.create('p', { className: 'ship-name' })

    switch (shipName) {
      case 'carrier':
        card.dataset.shipName = 'carrier'
        card.dataset.shipLength = 5
        image.src = carrier
        name.textContent = 'Carrier (5f)'
        break
      case 'battleship':
        card.dataset.shipName = 'battleship'
        card.dataset.shipLength = 4
        image.src = battleship
        name.textContent = 'Battleship (4f)'
        break
      case 'cruiser':
        card.dataset.shipName = 'cruiser'
        card.dataset.shipLength = 3
        image.src = cruiser
        name.textContent = 'Cruiser (3f)'
        break
      case 'submarine':
        card.dataset.shipName = 'submarine'
        card.dataset.shipLength = 3
        image.src = submarine
        name.textContent = 'Submarine (3f)'
        break
      case 'destroyer':
        card.dataset.shipName = 'destroyer'
        card.dataset.shipLength = 2
        image.src = destroyer
        name.textContent = 'Destroyer (2f)'
        break
      default:
    }

    helper.appendAll(content, [image, name])

    card.appendChild(content)

    return card
  }

  function createResetContinueSection() {
    const container = helper.create('section', {
      id: 'reset-continue-section',
      className: 'reset-continue-section',
    })

    const resetButton = helper.create('button', {
      id: 'reset-button',
      className: 'reset-button',
      textContent: 'Reset',
    })

    const continueButton = helper.create('button', {
      id: 'continue-button',
      className: 'continue-button',
      textContent: 'Confirm',
    })

    helper.appendAll(container, [resetButton, continueButton])

    return container
  }

  function displayWelcomeMessage() {
    const message = document.getElementById('message-agent')

    Component.addTypeWriterMessage(message, Message.getWelcomeMessage())
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

    resetFleetSelectMenu()
    map.getFleet().forEach((warship) => warship.resetFound())
    map.setFleetEmpty()
  }

  function resetFleetSelectMenu() {
    const fleet = document.getElementById('fleet-setup')
    const message = document.getElementById('message-agent')

    fleet.childNodes.forEach((node) => {
      if (node.classList.contains('hidden')) {
        node.classList.remove('hidden')
        message.classList.add('reset')
      }
    })
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
