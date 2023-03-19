/* eslint-disable no-unused-expressions */
import helper from './helper'
// FACTORIES
import Game from '../factories/game'
// DOM
import Battle from './battle'
import Component from './reusableComponents'
import Message from '../utils/message'
import DragDrop from './dragDrop'

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
      const shipCard = Component.createShipCard(ship)
      section.appendChild(shipCard)
    })

    return section
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
    disableContinueButton()
    setTabIndex()
  }

  function initAxisButtons() {
    const buttonX = document.getElementById('x-button')
    const buttonY = document.getElementById('y-button')

    buttonX.addEventListener('click', () => handleButton(buttonX, buttonY))
    buttonY.addEventListener('click', () => handleButton(buttonY, buttonX))
  }

  function handleButton(button, oppositeButton) {
    const map = Game.getState().getPlayer().getMap()

    button.id === 'x-button' ? map.setAxisX() : map.setAxisY()
    button.classList.add('selected')
    oppositeButton.classList.remove('selected')
  }

  function initResetContinueButtons() {
    const resetButton = document.getElementById('reset-button')
    const continueButton = document.getElementById('continue-button')
    const board = Game.getState().getPlayer().getMap().getBoard()

    resetButton.addEventListener('click', () => handleReset(board))
    continueButton.addEventListener('click', handleContinue)
  }

  function handleReset(board) {
    const fieldContainer = document.getElementById('field-container-setup')

    resetFleetSelect()
    resetArray(board)
    removePlacedShips(fieldContainer)
    disableContinueButton()
    setTabIndex()
  }

  function resetFleetSelect() {
    const map = Game.getState().getPlayer().getMap()

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

  function setTabIndex() {
    const shipCards = document.querySelectorAll('.ship-card')
    shipCards.forEach((shipCard) => shipCard.setAttribute('tabindex', 0))
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
    if (Game.state.getPlayer().getMap().areAllShipsFound())
      Battle.loadBattleContent()
  }

  function disableContinueButton() {
    const button = document.getElementById('continue-button')

    button.classList.add('disabled')
    button.addEventListener('keydown', DragDrop.preventEnterDefault)
  }

  return { loadSetupContent }
})()

export default setup

//
