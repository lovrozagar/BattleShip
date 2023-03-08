const helper = (() => {
  function deleteAppContent() {
    const app = document.getElementById('app')
    app.replaceChildren('')
  }

  function loadHeader(container, className) {
    const header = document.createElement('header')
    header.classList.add('header', `${className}`)

    const title = document.createElement('h1')
    title.textContent = 'BATTLESHIP'

    header.appendChild(title)

    container.appendChild(header)
  }

  const BOARD_SIZE = 10

  function loadBoard(container, friendlyOrEnemy) {
    const board = document.createElement('div')
    board.id = `board-${friendlyOrEnemy}`
    board.classList.add('board', friendlyOrEnemy)

    loadLetters(board)
    loadNumbers(board)
    loadFields(board)

    container.appendChild(board)
  }

  function loadLetters(container) {
    const letterContainer = document.createElement('div')
    letterContainer.classList = 'letter-container'
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

    letters.forEach((element) => {
      const letter = document.createElement('div')
      letter.className = 'letter'
      letter.textContent = element
      letterContainer.appendChild(letter)
    })

    container.appendChild(letterContainer)
  }

  function loadNumbers(container) {
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

    container.appendChild(numberContainer)
  }

  function loadFields(container) {
    const fieldContainer = document.createElement('div')
    fieldContainer.id = 'field-container'
    fieldContainer.className = 'field-container'

    for (let i = 0; i < BOARD_SIZE; i += 1) {
      for (let j = 0; j < BOARD_SIZE; j += 1) {
        const field = document.createElement('div')
        field.className = 'field'
        fieldContainer.appendChild(field)
      }
    }

    container.appendChild(fieldContainer)
  }

  return { deleteAppContent, loadHeader, loadBoard }
})()

export default helper
