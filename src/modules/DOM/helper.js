const helper = (() => {
  function deleteAppContent() {
    const app = document.getElementById('app')
    app.replaceChildren('')
  }

  const BOARD_SIZE = 10

  function loadBoard(container, friendlyOrEnemy) {
    const board = document.createElement('div')
    board.id = `board-${friendlyOrEnemy}`
    board.classList.add('board', friendlyOrEnemy)

    for (let i = 0; i < BOARD_SIZE; i += 1) {
      for (let j = 0; j < BOARD_SIZE; j += 1) {
        const field = document.createElement('div')
        field.className = 'field'

        board.appendChild(field)
      }
    }

    container.appendChild(board)
  }

  return { deleteAppContent, loadBoard }
})()

export default helper
