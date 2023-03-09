import ship from './ship'

const gameboard = () => {
  const board = new Array(10).fill('x').map(() => new Array(10).fill('x'))
  const fleet = []
  const axis = 'X'
  const shipOnDrag = { name: '', length: 0 }
  return {
    board,
    fleet,
    axis,
    shipOnDrag,
    getBoard,
    getFleet,
    getShip,
    getAxis,
    getShipOnDrag,
    setAxisX,
    setAxisY,
    setFleetEmpty,
    setShipOnDrag,
    addToFleet,
    placeX,
    placeY,
    receiveAttack,
    recordHit,
    isEveryShipSunk,
  }
}

// GETTERS

function getBoard() {
  return this.board
}

function getFleet() {
  return this.fleet
}

function getAxis() {
  return this.axis
}

function getShipOnDrag() {
  return this.shipOnDrag
}

function getShip(shipName) {
  return this.fleet.filter((battleship) => battleship.name === shipName)[0]
}

// SETTERS

function setAxisX() {
  this.axis = 'X'
}

function setAxisY() {
  this.axis = 'Y'
}

function setShipOnDrag(shipInfoObj) {
  this.shipOnDrag.name = shipInfoObj.name
  this.shipOnDrag.length = shipInfoObj.length
}

// FLEET

function addToFleet(shipName) {
  switch (shipName.name) {
    case 'carrier':
      this.fleet.push(ship('carrier', 5))
      break
    case 'battleship':
      this.fleet.push(ship('battleship', 4))
      break
    case 'cruiser':
      this.fleet.push(ship('cruiser', 3))
      break
    case 'submarine':
      this.fleet.push(ship('submarine', 3))
      break
    default:
      this.fleet.push(ship('destroyer', 2))
  }
}

function setFleetEmpty() {
  this.fleet = []
}

// PLACEMENT

function placeX(battleship, start) {
  let shipLength = battleship.length
  const [x, y] = start
  const shipPlacement = []

  if (isOutOfBounds(shipLength, this.board.length, y)) return false

  for (let j = y; j < this.board.length; j++) {
    if (this.board[x][j] !== 'x') return false

    shipPlacement.push([x, j])
    shipLength -= 1
    if (shipLength === 0) {
      break
    }
  }

  shipPlacement.forEach((coordinate) => {
    const [i, j] = coordinate
    this.board[i][j] = `${battleship.name}X`
  })

  this.addToFleet(battleship)

  return true
}

function placeY(battleship, start) {
  let shipLength = battleship.length
  const [x, y] = start
  const shipPlacement = []

  if (isOutOfBounds(shipLength, this.board.length, x)) return false

  for (let i = x; i < this.board.length; i++) {
    if (this.board[i][y] !== 'x') return false

    shipPlacement.push([i, y])
    shipLength -= 1
    if (shipLength === 0) {
      break
    }
  }

  shipPlacement.forEach((coordinate) => {
    const [i, j] = coordinate
    this.board[i][j] = `${battleship.name}Y`
  })

  this.addToFleet(battleship)

  return true
}

function isOutOfBounds(shipLength, boardLength, field) {
  return shipLength > boardLength - field
}

// RECORD ATTACKS

function receiveAttack(coords) {
  const [x, y] = coords
  this.recordHit(x, y)
}

function recordHit(x, y) {
  switch (this.board[x][y]) {
    case 'carrier':
      this.getShip('carrier').hit()
      this.board[x][y] = 'hit'
      break
    case 'battleship':
      this.getShip('battleship').hit()
      this.board[x][y] = 'hit'
      break
    case 'cruiser':
      this.getShip('cruiser').hit()
      this.board[x][y] = 'hit'
      break
    case 'submarine':
      this.getShip('submarine').hit()
      this.board[x][y] = 'hit'
      break
    case 'destroyer':
      this.getShip('destroyer').hit()
      this.board[x][y] = 'hit'
      break
    default:
      this.board[x][y] = 'missed'
  }
}

// ARE ALL SUNK

function isEveryShipSunk() {
  const sunk = this.fleet.filter((battleship) => battleship.isSunk === true)
  return sunk.length === 5
}

export default gameboard
