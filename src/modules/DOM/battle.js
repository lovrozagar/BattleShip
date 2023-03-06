import helper from './helper'

const battle = (() => {
  function loadBoardsSection() {
    const app = document.getElementById('app')

    const boardsSection = document.createElement('section')
    boardsSection.className = 'boards-section'

    const friendlyBoardContainer = document.createElement('div')
    const enemyBoardContainer = document.createElement('div')

    loadBoardTitle(friendlyBoardContainer, 'FRIENDLY WATERS')
    loadBoardTitle(enemyBoardContainer, 'ENEMY WATERS')

    helper.loadBoard(friendlyBoardContainer, 'friendly')
    helper.loadBoard(enemyBoardContainer, 'enemy')

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

  return { loadBoardsSection }
})()

export default battle
