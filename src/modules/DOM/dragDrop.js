import ship from '../factories/ship'
import fleet from './fleet'
import Game from '../factories/game'

const DragDrop = (() => {
  function initDraggableFields() {
    dragStart()
    dragOver()
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
      })
    })
  }

  function dragDrop() {
    const fieldContainer = document.getElementById('field-container')
    const shipOnDrag = Game.state.getPlayer().getMap().getShipOnDrag()
    const map = Game.state.getPlayer().getMap()

    fieldContainer.childNodes.forEach((node, index) => {
      node.addEventListener('drop', () => {
        const x = parseInt(index / 10, 10)
        const y = index % 10
        const isPlaced = map.placeX(ship(shipOnDrag.name, shipOnDrag.length), [
          x,
          y,
        ])

        fleet.loadFleet()
        if (isPlaced) {
          const battleship = document.querySelector(
            `[data-ship-name=${shipOnDrag.name}]`
          )
          battleship.style.visibility = 'hidden'
        }
      })
    })
  }

  return { initDraggableFields }
})()

export default DragDrop
