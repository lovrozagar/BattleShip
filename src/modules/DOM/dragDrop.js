import ship from '../factories/ship'
import fleet from './fleet'
import Game from '../factories/game'
import helper from './helper'

const DragDrop = (() => {
  function initDraggableFields() {
    dragStart()
    dragOver()
    dragLeave()
    dragDrop()
  }

  function dragStart() {
    const fleetContainer = document.getElementById('fleet-setup')
    // SET CURRENT DRAG OBJECT
    fleetContainer.childNodes.forEach((node) => {
      node.addEventListener('dragstart', () => {
        Game.state.getPlayer().getMap().setShipOnDrag({
          name: node.dataset.shipName,
          length: node.dataset.shipLength,
        })
      })
    })
  }

  function dragOver() {
    const fieldContainer = document.getElementById('field-container')
    // PREVENT DEFAULT TO ALLOW DROP
    fieldContainer.childNodes.forEach((node) => {
      node.addEventListener('dragover', (event) => {
        event.preventDefault()
        node.classList.add('hovering')
      })
    })
  }

  function dragLeave() {
    const fieldContainer = document.getElementById('field-container')
    // REMOVE DRAGOVER/HOVER CLASS
    fieldContainer.childNodes.forEach((node) => {
      node.addEventListener('dragleave', () => {
        node.classList.remove('hovering')
      })
    })
  }

  function dragDrop() {
    const fieldContainer = document.getElementById('field-container')

    fieldContainer.childNodes.forEach((node, index) => {
      node.addEventListener('drop', () => {
        node.classList.remove('hovering')
        const [x, y] = helper.getCoordinatesFromIndex(index)
        const [isPlaced, shipOnDrag] = dropIfValid(x, y)

        fleet.loadFleet()
        hideIfPlaced(isPlaced, shipOnDrag)
      })
    })
  }

  function dropIfValid(x, y) {
    const map = Game.state.getPlayer().getMap()
    const shipOnDrag = Game.state.getPlayer().getMap().getShipOnDrag()

    if (map.getAxis() === 'X') {
      return [
        map.placeX(ship(shipOnDrag.name, shipOnDrag.length), [x, y]),
        shipOnDrag.name,
      ]
    }
    return [
      map.placeY(ship(shipOnDrag.name, shipOnDrag.length), [x, y]),
      shipOnDrag.name,
    ]
  }

  function hideIfPlaced(isPlaced, shipOnDrag) {
    if (!isPlaced) return

    const battleship = document.querySelector(`[data-ship-name=${shipOnDrag}]`)
    battleship.classList.add('hidden')
  }

  return { initDraggableFields }
})()

export default DragDrop
