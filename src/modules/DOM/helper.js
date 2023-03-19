// ASSETS
import carrier from '../../assets/images/carrierX.svg'
import battleship from '../../assets/images/battleshipX.svg'
import cruiser from '../../assets/images/cruiserX.svg'
import submarine from '../../assets/images/submarineX.svg'
import destroyer from '../../assets/images/destroyerX.svg'
/* eslint-disable no-restricted-syntax */
const helper = (() => {
  // DOM

  function deleteAppContent() {
    const app = document.getElementById('app')
    app.replaceChildren('')
  }

  function getHeader(className) {
    const header = document.createElement('header')
    header.classList.add('header', `${className}`)

    const title = document.createElement('h1')
    title.textContent = 'BATTLESHIP'

    header.appendChild(title)

    return header
  }

  const BOARD_SIZE = 10

  function createMap(description) {
    const map = document.createElement('div')
    map.id = `board-${description}`
    map.classList.add('board', description)

    map.appendChild(createLettersSection())
    map.appendChild(createNumbersSection())
    map.appendChild(createBoard(description))

    return map
  }

  function createLettersSection() {
    const letterContainer = document.createElement('div')
    letterContainer.classList = 'letter-container'
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

    letters.forEach((element) => {
      const letter = document.createElement('div')
      letter.className = 'letter'
      letter.textContent = element
      letterContainer.appendChild(letter)
    })

    return letterContainer
  }

  function createNumbersSection() {
    const numberContainer = document.createElement('div')
    numberContainer.id = 'number-container'
    numberContainer.classList = 'number-container'
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    numbers.forEach((element) => {
      const number = document.createElement('div')
      number.classList = 'number'
      number.textContent = element
      numberContainer.appendChild(number)
    })

    return numberContainer
  }

  function createBoard(description) {
    const board = document.createElement('div')
    board.id = `field-container-${description}`
    board.className = `field-container`

    for (let i = 0; i < BOARD_SIZE; i += 1) {
      for (let j = 0; j < BOARD_SIZE; j += 1) {
        const field = document.createElement('div')
        field.className = 'field'
        board.appendChild(field)
      }
    }

    return board
  }

  function create(type, data) {
    if (!type) console.log('missing type')

    const element = document.createElement(type)

    for (const [key, value] of Object.entries(data)) {
      element[key] = value
    }

    return element
  }

  function createShipCard(shipName) {
    const card = helper.create('button', {
      className: 'ship-card',
      draggable: 'true',
    })
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

    appendAll(content, [image, name])

    card.appendChild(content)

    return card
  }

  // OTHER
  function getCoordinatesFromIndex(index) {
    const x = parseInt(index / BOARD_SIZE, 10)
    const y = index % BOARD_SIZE

    return [x, y]
  }

  function getIndexFromCoordinates(x, y) {
    return x * BOARD_SIZE + y
  }

  function roundNearestTenExceptZero(num) {
    while (num % 10 !== 0) {
      num += 1
    }
    return num
  }

  function appendAll(container, nodeArray) {
    nodeArray.forEach((node) => container.appendChild(node))
  }

  return {
    create,
    createShipCard,
    appendAll,
    deleteAppContent,
    getHeader,
    createMap,
    getCoordinatesFromIndex,
    getIndexFromCoordinates,
    roundNearestTenExceptZero,
  }
})()

export default helper
