import carrier from '../../assets/images/carrierX.svg'
import battleship from '../../assets/images/battleshipX.svg'
import cruiser from '../../assets/images/cruiserX.svg'
import submarine from '../../assets/images/submarineX.svg'
import destroyer from '../../assets/images/destroyerX.svg'
import helper from './helper'
import tip from '../../assets/images/tip.svg'

const setup = (() => {
  function loadSetup() {
    helper.deleteAppContent()
    loadSetupContent()
  }

  function loadSetupContent() {
    const app = document.getElementById('app')
    app.classList.add('setup')

    const setupContainer = document.createElement('div')
    setupContainer.id = 'setup-container'
    setupContainer.className = 'setup-container'

    helper.loadHeader(app, 'setup')
    loadTip(app)

    helper.loadBoard(setupContainer, 'setup')
    loadFleetSelectSection(setupContainer)

    app.appendChild(setupContainer)
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
      'Drag the ship on the board to place it, double click on the ship to rotate axis.'

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

    card.classList.add('ship-card', shipName)
    image.className = 'ship-image'
    name.className = 'ship-name'

    switch (shipName) {
      case 'carrier':
        image.src = carrier
        name.textContent = 'Carrier'
        break
      case 'battleship':
        image.src = battleship
        name.textContent = 'Battleship'
        break
      case 'cruiser':
        image.src = cruiser
        name.textContent = 'Cruiser'
        break
      case 'submarine':
        image.src = submarine
        name.textContent = 'Submarine'
        break
      case 'destroyer':
        image.src = destroyer
        name.textContent = 'Destroyer'
        break
      default:
    }

    card.appendChild(image)
    card.appendChild(name)

    return card
  }

  return { loadSetup }
})()

export default setup
