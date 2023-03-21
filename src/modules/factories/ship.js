const Ship = (() => {
  // SHIP FACTORY
  const createShip = (shipName, shipLength) => {
    const name = shipName
    const length = shipLength
    let timesHit = 0
    let isSunk = false
    let isFound = false

    // GETTERS

    function getName() {
      return name
    }

    function getFound() {
      return isFound
    }

    function getSunk() {
      return isSunk
    }

    function getLength() {
      return length
    }

    // SHIP STATE MODIFIERS

    function found() {
      isFound = true
    }

    function hit() {
      timesHit += 1
      if (timesHit === length) sunk()
    }

    function sunk() {
      isSunk = true
    }

    function resetFound() {
      isFound = false
    }

    return {
      getName,
      getLength,
      getSunk,
      getFound,
      hit,
      sunk,
      found,
      resetFound,
    }
  }

  return { createShip }
})()

export default Ship
