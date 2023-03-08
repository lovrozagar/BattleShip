import carrier from '../../assets/images/carrierX.svg'
import battleship from '../../assets/images/battleshipX.svg'
import cruiser from '../../assets/images/cruiserX.svg'
import submarine from '../../assets/images/submarineX.svg'
import destroyer from '../../assets/images/destroyerX.svg'
import helper from './helper'
import tip from '../../assets/images/tip.svg'
import reset from '../../assets/images/reset.svg'

const setup = (() => {
  // function loadSetup() {
  //   helper.deleteAppContent()
  //   loadSetupContent()
  //   draggableFields()
  // }

  function loadSetupContent() {
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
    loadResetAndContinueButtons(app)

    const boardContainer = document.getElementById('board-setup')
    addAxisButtons(boardContainer)
  }

  function addAxisButtons(container) {
    const buttonContainer = document.createElement('div')
    buttonContainer.className = 'axis-button-container'

    const buttonX = document.createElement('button')
    buttonX.id = 'x-button'
    buttonX.className = 'axis-button'
    buttonX.textContent = 'X axis'

    const buttonY = document.createElement('button')
    buttonY.id = 'y-button'
    buttonY.className = 'axis-button'
    buttonY.textContent = 'Y axis'

    buttonContainer.appendChild(buttonX)
    buttonContainer.appendChild(buttonY)

    container.appendChild(buttonContainer)
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

  function loadResetAndContinueButtons(container) {
    const buttonContainer = document.createElement('section')
    buttonContainer.id = 'reset-continue-section'
    buttonContainer.className = 'reset-continue-section'

    const resetButton = document.createElement('button')
    resetButton.className = 'reset-button'
    resetButton.textContent = 'Reset'

    const continueButton = document.createElement('button')
    continueButton.className = 'continue-button'
    continueButton.textContent = 'Confirm'


    buttonContainer.appendChild(resetButton)
    buttonContainer.appendChild(continueButton)

    container.appendChild(buttonContainer)
  }

  return { loadSetupContent }
})()

export default setup
