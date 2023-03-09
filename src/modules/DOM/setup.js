import carrier from '../../assets/images/carrierX.svg'
import battleship from '../../assets/images/battleshipX.svg'
import cruiser from '../../assets/images/cruiserX.svg'
import submarine from '../../assets/images/submarineX.svg'
import destroyer from '../../assets/images/destroyerX.svg'
import helper from './helper'
import tip from '../../assets/images/tip.svg'
import Game from '../factories/game'

const setup = (() => {
  // function loadSetup() {
  //   helper.deleteAppContent()
  //   loadSetupContent()
  //   draggableFields()
  // }
  function loadSetupContent(map) {
    const app = document.getElementById('app')
    app.classList.add('setup')

    const setupContainer = document.createElement('div')
    setupContainer.id = 'setup-container'
    setupContainer.className = 'setup-container'

    helper.loadHeader(app, 'setup')
    loadTip(app)

    const boardAndFleet = document.createElement('div')
    boardAndFleet.className = 'board-fleet-container'
    helper.loadBoard(boardAndFleet, 'setup')
    loadFleetSelectSection(boardAndFleet)

    setupContainer.appendChild(boardAndFleet)

    app.appendChild(setupContainer)
    loadResetContinueButtons(app)

    const boardContainer = document.getElementById('board-setup')

    addAxisButtons(boardContainer)
    initAxisButtons()
    initResetContinueButtons(map)
  }

  function addAxisButtons(container) {
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

    container.appendChild(buttonContainer)
  }

  function initAxisButtons() {
    const buttonX = document.getElementById('x-button')
    const buttonY = document.getElementById('y-button')

    buttonX.addEventListener('click', () => handleButton(buttonX, buttonY))
    buttonY.addEventListener('click', () => handleButton(buttonY, buttonX))
  }

  function handleButton(button, oppositeButton) {
    button.classList.add('selected')
    oppositeButton.classList.remove('selected')
  }

  function loadTip(container) {
    const tipSection = document.createElement('section')
    tipSection.className = 'tip-setup'

    const tipImage = document.createElement('img')
    tipImage.className = 'tip-image'
    tipImage.src = tip

    const text = document.createElement('div')
    text.className = 'tip-text'
    text.textContent =
      'Click on the axis button to change the placement axis, drag and drop the ship on the board.'

    tipSection.appendChild(tipImage)
    tipSection.appendChild(text)

    container.appendChild(tipSection)
  }

  function loadFleetSelectSection(container) {
    const fleetSection = document.createElement('section')
    fleetSection.id = 'fleet-setup'
    fleetSection.className = 'fleet-setup'

    const fleet = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']

    fleet.forEach((ship) => {
      const shipCard = loadShipCard(ship)
      shipCard.draggable = 'true'
      fleetSection.appendChild(shipCard)
    })

    container.appendChild(fleetSection)
  }

  function loadShipCard(shipName) {
    const card = document.createElement('button')
    const image = document.createElement('img')
    const name = document.createElement('p')

    card.className = 'ship-card'
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

    card.appendChild(image)
    card.appendChild(name)

    return card
  }

  function loadResetContinueButtons(container) {
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

    container.appendChild(buttonContainer)
  }

  function initResetContinueButtons(map) {
    const resetButton = document.getElementById('reset-button')
    const continueButton = document.getElementById('continue-button')

    resetButton.addEventListener('click', () => handleReset(map))
    continueButton.addEventListener('click', handleContinue)
  }

  function handleReset(map) {
    const fieldContainer = document.getElementById('field-container')
    const { board } = map

    resetFleetSelect()
    resetArray(board)
    resetBackground(fieldContainer)
  }

  function resetFleetSelect() {
    const map = Game.state.getPlayer().getMap()
    const fleet = document.getElementById('fleet-setup')

    fleet.childNodes.forEach((node) => (node.style.visibility = 'visible'))
    map.getFleet().forEach((warship) => warship.resetFound())
    map.setFleetEmpty()
  }

  function resetArray(array) {
    for (let i = 0; i < array.length; i += 1) {
      for (let j = 0; j < array[0].length; j += 1) {
        array[i][j] = 'x'
      }
    }
  }

  function resetBackground(node) {
    node.style.backgroundImage = ''
    node.style.backgroundSize = ''
    node.style.backgroundPosition = ''
  }

  function handleContinue() {}

  return { loadSetupContent }
})()

export default setup
