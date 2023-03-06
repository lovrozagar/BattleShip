// FACTORIES
import pregame from './pregame'
import battle from './battle'
import Game from '../factories/game'
// VIEWS

const view = (() => {
  const game = Game.initializeGame()

  function loadContent() {
    pregame.loadCard()
    initPlayButton()
  }

  function initPlayButton() {
    const button = document.getElementById('play-now-button')
    button.addEventListener('click', loadBattle)
  }

  function loadBattle() {
    deleteAppContent()
    battle.loadBoardsSection()
  }

  function deleteAppContent() {
    const app = document.getElementById('app')
    app.replaceChildren('')
  }

  return { loadContent }
})()

export default view
