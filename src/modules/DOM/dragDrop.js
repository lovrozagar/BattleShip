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
    mobileDrag()
    mobileDrop()
  }

  let fieldQueue = []

  function dragStart() {
    const fleetContainer = document.getElementById('fleet-setup')
    // SET CURRENT DRAG OBJECT
    fleetContainer.childNodes.forEach((node) => {
      node.addEventListener('dragstart', (event) => {
        addShipOnDragStart(node)
        // STOP PROPAGATION TO NOT DRAG THE WHOLE CONTAINER IF DRAGGING BY THE VERY EDGE
        event.stopPropagation()
      })
    })
  }

  function dragEnter() {
    const fieldContainer = document.getElementById('field-container-setup')

    fieldContainer.childNodes.forEach((node) => {
      node.addEventListener('dragenter', (event) => {
        event.preventDefault()
      })
    })
  }

  function dragOver() {
    const fieldContainer = document.getElementById('field-container-setup')
    // PREVENT DEFAULT TO ALLOW DROP
    fieldContainer.childNodes.forEach((node, index) => {
      node.addEventListener('dragover', (event) => {
        event.preventDefault()
        styleFieldsForDrop(fieldContainer, index)
      })
    })
  }

  function dragLeave() {
    const fieldContainer = document.getElementById('field-container-setup')
    // REMOVE DRAGOVER/HOVER CLASS
    fieldContainer.childNodes.forEach((node) => {
      node.addEventListener('dragleave', () => {
        resetFieldStyling()
      })
    })
  }

  function dragDrop() {
    const fieldContainer = document.getElementById('field-container-setup')

    fieldContainer.childNodes.forEach((node, index) => {
      node.addEventListener('drop', () => {
        const [x, y] = helper.getCoordinatesFromIndex(index)
        const [isPlaced, shipOnDrag] = dropIfValid(x, y)

        resetFieldStyling()

        fleet.loadFleet(fieldContainer)
        hideIfPlaced(isPlaced, shipOnDrag)
      })
    })
  }

  function dropIfValid(x, y) {
    const map = Game.getState().getPlayer().getMap()
    const shipOnDrag = Game.getState().getPlayer().getMap().getShipOnDrag()

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

  function mobileDrag() {
    const fleetContainer = document.getElementById('fleet-setup')
    const fieldContainer = document.getElementById('field-container-setup')
    const app = document.getElementById('app')
    let hoveredElement = null

    fleetContainer.childNodes.forEach((node) => {
      node.addEventListener('touchmove', (event) => {
        addShipOnDragStart(node)
        // event.stopPropagation()
        app.appendChild(node)
        const touchLocation = event.targetTouches[0]
        // console.log(event)
        node.style.position = 'fixed'
        node.style.zIndex = '5'
        node.style.left = `${touchLocation.clientX}px`
        node.style.top = `${touchLocation.clientY}px`
        // console.log(touchLocation.clientY)
        // node.style.transform = `translate(-100%, -100%)`
        const touchX = event.touches[0].clientX
        const touchY = event.touches[0].clientY
        const newHoveredElement = document.elementFromPoint(touchX, touchY)
        if (hoveredElement !== newHoveredElement) {
          resetFieldStyling()
        }
        hoveredElement = newHoveredElement
        // console.log(hoveredElement)
        if (hoveredElement.classList.contains('field')) {
          const index = [...hoveredElement.parentNode.children].indexOf(
            hoveredElement
          )
          console.log(index)
          styleFieldsForDrop(fieldContainer, index)
        }
      })
    })
  }

  function mobileDrop() {
    const fleetContainer = document.getElementById('fleet-setup')
    const fieldContainer = document.getElementById('field-container-setup')

    fleetContainer.childNodes.forEach((node) => {
      node.addEventListener('touchend', (event) => {
        const touchX = event.changedTouches[0].clientX
        const touchY = event.changedTouches[0].clientY
        const hoveredElement = document.elementFromPoint(touchX, touchY)
        console.log(hoveredElement)
        if (hoveredElement.classList.contains('field')) {
          const index = [...hoveredElement.parentNode.children].indexOf(
            hoveredElement
          )
          console.log(index)
          styleFieldsForDrop(fieldContainer, index)
          const [x, y] = helper.getCoordinatesFromIndex(index)
          const [isPlaced, shipOnDrag] = dropIfValid(x, y)

          resetFieldStyling()

          fleet.loadFleet(fieldContainer)
          hideIfPlaced(isPlaced, shipOnDrag)
        }
      })
    })
  }

  function addShipOnDragStart(node) {
    Game.getState().getPlayer().getMap().setShipOnDrag({
      name: node.dataset.shipName,
      length: node.dataset.shipLength,
    })
  }

  function hideIfPlaced(isPlaced, shipOnDrag) {
    if (!isPlaced) return

    const battleship = document.querySelector(`[data-ship-name=${shipOnDrag}]`)
    battleship.classList.add('hidden')

    enableContinueButtonIfAllPlaced()
  }

  function enableContinueButtonIfAllPlaced() {
    const ships = document.querySelectorAll('.ship-image-container')
    if (ships.length !== 5) return

    document.getElementById('continue-button').classList.remove('disabled')
  }

  function resetFieldStyling() {
    const fieldContainer = document.getElementById('field-container-setup')
    for (let i = 0; i < fieldQueue.length; i += 1) {
      fieldContainer.children[fieldQueue[i]].className = 'field'
    }
    emptyFieldQueue()
  }

  function styleFieldsForDrop(parentNode, index) {
    const map = Game.getState().getPlayer().getMap()
    const board = map.getBoard()
    const axis = map.getAxis()
    // const [x, y] = helper.getCoordinatesFromIndex(index)
    const shipOnDrag = map.getShipOnDrag()
    let { length } = shipOnDrag
    emptyFieldQueue()

    let isTaken = false
    if (axis === 'X') {
      for (
        let i = index;
        i < helper.roundNearestTenExceptZero(index + 1);
        i += 1
      ) {
        const [x, y] = helper.getCoordinatesFromIndex(i)
        // RETURN IF WHOLE SHIPS SHADOW ALREADY ON MAP
        if (length === 0) break
        parentNode.children[i].classList.add('hovering')
        fieldQueue.push(i)
        length -= 1
        if (board[x][y] !== 'x') {
          isTaken = true
        }
      }
    }
    if (axis === 'Y') {
      for (let i = index; i < 100; i += 10) {
        const [x, y] = helper.getCoordinatesFromIndex(i)
        // RETURN IF WHOLE SHIPS SHADOW ALREADY ON MAP
        if (length === 0) break
        parentNode.children[i].classList.add('hovering')
        fieldQueue.push(i)
        length -= 1
        if (board[x][y] !== 'x') {
          isTaken = true
        }
      }
    }

    if (isTaken || length !== 0)
      fieldQueue.forEach((field) => {
        parentNode.children[field].classList.add('red')
      })
  }

  function emptyFieldQueue() {
    fieldQueue = []
  }

  return { initDraggableFields }
})()

export default DragDrop
