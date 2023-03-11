import ship from '../factories/ship'
import fleet from './fleet'
import Game from '../factories/game'
import helper from './helper'

const DragDrop = (() => {
  function initDraggableFields() {
    dragStart()
    dragEnter()
    dragOver()
    dragLeave()
    dragDrop()
  }

  let fieldQueue = []

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

  function dragEnter() {
    const fieldContainer = document.getElementById('field-container')

    fieldContainer.childNodes.forEach((node) => {
      node.addEventListener('dragenter', (event) => {
        event.preventDefault()
      })
    })
  }

  function dragOver() {
    const fieldContainer = document.getElementById('field-container')
    // PREVENT DEFAULT TO ALLOW DROP
    fieldContainer.childNodes.forEach((node, index) => {
      node.addEventListener('dragover', (event) => {
        event.preventDefault()
        styleFieldsForDrop(fieldContainer, index)
      })
    })
  }

  function styleFieldsForDrop(parentNode, index) {
    const map = Game.state.getPlayer().getMap()
    const axis = map.getAxis()
    // const [x, y] = helper.getCoordinatesFromIndex(index)
    const shipOnDrag = map.getShipOnDrag()
    let { length } = shipOnDrag
    emptyFieldQueue()

    if (axis === 'X') {
      for (
        let i = index;
        i < helper.roundNearestTenExceptZero(index + 1);
        i += 1
      ) {
        // RETURN IF WHOLE SHIPS SHADOW ALREADY ON MAP
        if (length === 0) break
        parentNode.children[i].classList.add('hovering')
        fieldQueue.push(i)
        length -= 1
      }
      if (length !== 0)
        fieldQueue.forEach((field) => {
          parentNode.children[field].classList.add('red')
        })
    }
  }

  function dragLeave() {
    const fieldContainer = document.getElementById('field-container')
    // REMOVE DRAGOVER/HOVER CLASS
    fieldContainer.childNodes.forEach((node) => {
      node.addEventListener('dragleave', () => {
        resetFieldStyling()
      })
    })
  }

  function resetFieldStyling() {
    const fieldContainer = document.getElementById('field-container')
    for (let i = 0; i < fieldQueue.length; i += 1) {
      fieldContainer.children[fieldQueue[i]].className = 'field'
    }
    emptyFieldQueue()
  }

  function dragDrop() {
    const fieldContainer = document.getElementById('field-container')

    fieldContainer.childNodes.forEach((node, index) => {
      node.addEventListener('drop', () => {
        const [x, y] = helper.getCoordinatesFromIndex(index)
        const [isPlaced, shipOnDrag] = dropIfValid(x, y)

        resetFieldStyling()

        fleet.loadFleet()
        hideIfPlaced(isPlaced, shipOnDrag)
      })
    })
  }

  function dropIfValid(x, y) {
    const map = Game.state.getPlayer().getMap()
    const shipOnDrag = Game.state.getPlayer().getMap().getShipOnDrag()

    // RETURNS [BOOL, SHIP-NAME]
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

  function emptyFieldQueue() {
    fieldQueue = []
  }

  return { initDraggableFields }
})()

export default DragDrop
