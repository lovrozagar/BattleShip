// VIEWS
import pregame from './pregame'
import setup from './setup'
import helper from './helper'
import DragDrop from './dragDrop'

const view = (() => {
  function loadContent() {
    helper.deleteAppContent()
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
    DragDrop.initDraggableFields()
  }

  // function loadBattle() {
  //   helper.deleteAppContent()
  //   battle.loadBoardsSection()
  //   loadFleet()
  // }

  return { loadContent }
})()

export default view
