// FACTORIES
import Game from '../factories/game'
// VIEWS
import pregame from './pregame'
import setup from './setup'
import battle from './battle'
import fleet from './fleet'
import helper from './helper'
import ship from '../factories/ship'
import DragDrop from './dragDrop'

// TODO: destroyer Y fix

const view = (() => {
  const game = Game.initializeGame()

  const found = {
    carrier: false,
    battleship: false,
  }

  const shipOnDrag = {
    name: '',
    length: '',
  }

  function loadContent() {
    pregame.loadCard()
    initPlayButton()
  }

  function initPlayButton() {
    const button = document.getElementById('play-now-button')
    button.addEventListener('click', loadSetup)
  }

  function loadSetup() {
    helper.deleteAppContent()
    setup.loadSetupContent()
    console.log(game.combatant.getMap())
    DragDrop.initDraggableFields(shipOnDrag, found, game.combatant.getMap())
  }

  // function loadBattle() {
  //   helper.deleteAppContent()
  //   battle.loadBoardsSection()
  //   loadFleet()
  // }

  function initBoardFields(boardNode) {
    boardNode.childNodes.forEach((field) => {
      field.addEventListener('click', handleFieldClick)
    })
  }

  function handleFieldClick(event) {
    const { target } = event

    const index = [...target.parentNode.children].indexOf(target)
    const x = parseInt(index / 10, 10)
    const y = index % 10

    const friendlyMap = game.combatant.board.getBoard()
    const enemyMap = game.cpu.board.getBoard()

    if (friendlyMap[x][y] === 'hit' || friendlyMap[x][y] === 'missed') return

    if (friendlyMap[x][y] === 'x') {
      console.log('b')
      target.style.backgroundColor = 'lightblue'
    } else {
      console.log('r')
      target.classList.add('hit')
    }
  }

  function styleFieldOnChange(field) {}

  return { loadContent }
})()

export default view
