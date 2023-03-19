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
