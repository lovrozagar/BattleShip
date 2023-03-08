import ship from '../factories/ship'
import fleet from './fleet'

const DragDrop = (() => {
  function initDraggableFields(dragObject, foundObj, playerBoardArray) {
    dragStart(dragObject)
    dragOver()
    dragDrop(dragObject, foundObj, playerBoardArray)
  }

  function dragStart(dragObject) {
    const fleetContainer = document.getElementById('fleet-setup')

    fleetContainer.childNodes.forEach((node) => {
      node.addEventListener('dragstart', () => {
        dragObject.name = node.dataset.shipName
        dragObject.length = node.dataset.shipLength
      })
    })
  }

  function dragOver() {
    const fieldContainer = document.getElementById('field-container')

    fieldContainer.childNodes.forEach((node) => {
      node.addEventListener('dragover', (event) => {
        event.preventDefault()
      })
    })
  }

  function dragDrop(dragObject, foundObj, playerBoardArray) {
    const fieldContainer = document.getElementById('field-container')
    fieldContainer.childNodes.forEach((node, index) => {
      node.addEventListener('drop', () => {
        const x = parseInt(index / 10, 10)
        const y = index % 10

        const isPlaced = playerBoardArray.placeX(
          ship(dragObject.name, dragObject.length),
          [x, y]
        )

        fleet.loadFleet(foundObj, playerBoardArray)
        if (isPlaced) {
          const battleship = document.querySelector(
            `[data-ship-name=${dragObject.name}]`
          )
          console.log(battleship)
          battleship.style.visibility = 'hidden'
        }
        console.log(playerBoardArray.getBoard())
      })
    })
  }

  return { initDraggableFields }
})()

export default DragDrop
