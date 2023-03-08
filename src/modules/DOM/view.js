// FACTORIES
import Game from '../factories/game'
// VIEWS
import pregame from './pregame'
import setup from './setup'
import battle from './battle'
import fleet from './fleet'
import helper from './helper'
import ship from '../factories/ship'

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
    draggableFields()
  }

  function draggableFields() {
    const fleetContainer = document.getElementById('fleet-setup')
    fleetContainer.childNodes.forEach((node) => {
      node.addEventListener('dragstart', () => {
        shipOnDrag.name = node.dataset.shipName
        shipOnDrag.length = node.dataset.shipLength
      })
    })

    const fieldContainer = document.getElementById('field-container')
    fieldContainer.childNodes.forEach((node, index) => {
      node.addEventListener('dragover', (event) => {
        event.preventDefault()
      })
      node.addEventListener('drop', () => {
        const x = parseInt(index / 10, 10)
        const y = index % 10
        console.log(x, y)
        const array = game.combatant.board
        // emptyArray(array.getBoard())
        const isPlaced = array.placeX(
          ship(shipOnDrag.name, shipOnDrag.length),
          [x, y]
        )
        console.log(isPlaced)
        loadFleet()
        if (isPlaced) {
          const battleship = document.querySelector(
            `[data-ship-name=${shipOnDrag.name}]`
          )
          console.log(battleship)
          battleship.style.visibility = 'hidden'
        }
        console.log(array.getBoard())
      })
    })
  }

  function emptyArray(array) {
    for (let i = 0; i < array.length; i += 1) {
      for (let j = 0; j < array.length; j += 1) {
        array[i][j] = 'x'
      }
    }
  }

  function loadBattle() {
    helper.deleteAppContent()
    battle.loadBoardsSection()
    loadFleet()
  }

  function loadFleet() {
    const board = document.getElementById('field-container')

    const map = game.combatant.board.getBoard()
    for (let i = 0; i < map.length; i += 1) {
      for (let j = 0; j < map[0].length; j += 1) {
        // IF FIELD IS NOT EMPTY ON MAP LOAD SHIP
        if (map[i][j] !== 'x') {
          // LOAD SHIP FROM MAP
          fleet.loadShipOnBoard(map[i][j], {
            found,
            board,
            i,
            j,
          })
        }
      }
    }

    // initBoardFields(document.getElementById('board-friendly'))
  }

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
