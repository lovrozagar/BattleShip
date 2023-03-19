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
  let touchMove = false

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
    const hoveredElement = [null] // USED FOR CHECKING THE ELEMENT ON HOVER IN HANDLER

    fleetContainer.childNodes.forEach((node) => {
      node.addEventListener(
        'touchmove',
        (
          event // USING A CALLBACK THAT WILL ALSO BE ADDED AS HANDLER TO THE COPY ELEMENT
        ) =>
          handleTouchMove(
            event,
            node,
            fieldContainer,
            fleetContainer,
            app,
            hoveredElement
          ),
        { passive: false }
      )
    })
  }

  function handleTouchMove(
    event,
    node,
    fieldContainer,
    fleetContainer,
    app,
    hoveredElement
  ) {
    touchMove = true

    event.preventDefault()
    app.appendChild(node)
    addShipOnDragStart(node)

    const shipOnDrag = Game.getState().getPlayer().getMap().getShipOnDrag()
    const touchLocation = event.targetTouches[0]
    const touchX = event.touches[0].clientX
    const touchY = event.touches[0].clientY

    reInsertShipIfMissing(touchMove, fleetContainer, shipOnDrag)
    positionNodeOnScreen(node, touchLocation.clientX, touchLocation.clientY)

    const newHoveredElement = document.elementFromPoint(touchX, touchY)
    if (hoveredElement[0] !== newHoveredElement) {
      resetFieldStyling()
    }

    hoveredElement[0] = newHoveredElement
    if (hoveredElement[0].classList.contains('field')) {
      styleFieldsForDrop(fieldContainer, getNodeIndex(hoveredElement[0]))
    }
  }

  function reInsertShipIfMissing(isTouchActive, fleetContainer, shipOnDrag) {
    if (isTouchActive && fleetContainer.childNodes.length < 5) {
      const copy = helper.createShipCard(shipOnDrag.name)
      fleetContainer.appendChild(copy)
      copy.classList.add('hidden')
    }
  }

  function positionNodeOnScreen(node, x, y) {
    node.style.position = 'fixed'
    node.style.zIndex = '5'
    node.style.left = `${x}px`
    node.style.top = `${y}px`
  }

  function getNodeIndex(node) {
    return [...node.parentNode.children].indexOf(node)
  }

  function mobileDrop() {
    const fleetContainer = document.getElementById('fleet-setup')
    const fieldContainer = document.getElementById('field-container-setup')

    fleetContainer.childNodes.forEach((node) => {
      node.addEventListener('touchend', (event) => {
        const data = node.dataset.shipName // WILL BE USED TO TARGET COPY ELEMENT
        const touchX = event.changedTouches[0].clientX
        const touchY = event.changedTouches[0].clientY
        const hoveredElement = document.elementFromPoint(touchX, touchY)
        const copy = document.querySelector(`[data-ship-name="${data}"]`)

        if (hoveredElement.classList.contains('field')) {
          const index = getNodeIndex(hoveredElement)
          const [x, y] = helper.getCoordinatesFromIndex(index)
          const [isPlaced, shipOnDrag] = dropIfValid(x, y)

          fleet.loadFleet(fieldContainer)
          resetFieldStyling()
          hideIfPlaced(isPlaced, shipOnDrag)
        } else {
          copy.classList.remove('hidden')
        }

        touchMove = false
        node.remove()
        resetListenersForCopyNode(copy)
      })
    })
  }

  function resetListenersForCopyNode(node) {
    const fleetContainer = document.getElementById('fleet-setup')
    const fieldContainer = document.getElementById('field-container-setup')
    const app = document.getElementById('app')
    const hoveredElement = [null] // USED FOR CHECKING THE ELEMENT ON HOVER IN HANDLER

    node.addEventListener(
      'touchmove',
      (
        event // USING A CALLBACK THAT WILL ALSO BE ADDED AS HANDLER TO THE COPY ELEMENT
      ) =>
        handleTouchMove(
          event,
          node,
          fieldContainer,
          fleetContainer,
          app,
          hoveredElement
        ),
      { passive: false }
    )
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
