import carrier from '../../assets/images/carrierX.svg'
import battleship from '../../assets/images/battleshipX.svg'
import cruiser from '../../assets/images/cruiserX.svg'
import submarine from '../../assets/images/submarineX.svg'
import destroyer from '../../assets/images/destroyerX.svg'
import helper from './helper'

const setup = (() => {
  function loadSetup() {
    helper.deleteAppContent()
    loadSetupContent()
  }

  function loadSetupContent() {
    const app = document.getElementById('app')
    const setupContainer = document.createElement('div')
    helper.loadBoard(setupContainer, 'setup')
    loadFleetSelectSection(setupContainer)

    app.appendChild(setupContainer)
  }

  function loadFleetSelectSection(container) {
    const fleetSection = document.createElement('section')

    const fleet = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']

    fleet.forEach((ship) => {
      const shipCard = loadShipCard(ship)
      fleetSection.appendChild(shipCard)
    })

    container.appendChild(fleetSection)
  }

  function loadShipCard(shipName) {
    const card = document.createElement('div')
    const image = document.createElement('img')
    const name = document.createElement('p')

    card.className = 'ship-card'
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
