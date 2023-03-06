const battle = (() => {
  const BOARD_SIZE = 10

  function loadBoardsSection() {
    const app = document.getElementById('app')

    const boardsSection = document.createElement('section')
    boardsSection.className = 'boards-section'

    const friendlyBoardContainer = document.createElement('div')
    const enemyBoardContainer = document.createElement('div')

    loadBoardTitle(friendlyBoardContainer, 'FRIENDLY WATERS')
    loadBoardTitle(enemyBoardContainer, 'ENEMY WATERS')

    loadBoard(friendlyBoardContainer, 'friendly')
    loadBoard(enemyBoardContainer, 'enemy')

    boardsSection.appendChild(friendlyBoardContainer)
    boardsSection.appendChild(enemyBoardContainer)

    app.appendChild(boardsSection)
  }

  function loadBoardTitle(container, title) {
    const boardTitle = document.createElement('h2')
    boardTitle.className = 'board-title'
    boardTitle.textContent = title

    container.appendChild(boardTitle)
  }

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

  return { loadBoardsSection }
})()

export default battle
