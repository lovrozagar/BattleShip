import ship from '../ship/ship'

const gameboard = () => {
  const board = new Array(10).fill('x').map(() => new Array(10).fill('x'))
  const fleet = []
  return {
    board,
    fleet,
    addToFleet,
    placeX,
    placeY,
    receiveAttack,
    recordHit,
    getShip,
    isEveryShipSunk,
  }
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

// PLACEMENT

function placeX(battleship, start) {
  let shipLength = battleship.length
  const [x, y] = start
  const shipPlacement = []

  if (isOutOfBounds(shipLength, this.board.length, y)) return

  for (let j = y; j < this.board.length; j++) {
    if (this.board[x][j] !== 'x') return

    shipPlacement.push([x, j])
    shipLength -= 1
    if (shipLength === 0) {
      break
    }
  }

  shipPlacement.forEach((coordinate) => {
    const [i, j] = coordinate
    this.board[i][j] = battleship.name
  })

  this.addToFleet(battleship)
}

function placeY(battleship, start) {
  let shipLength = battleship.length
  const [x, y] = start
  const shipPlacement = []

  if (isOutOfBounds(shipLength, this.board.length, x)) return

  for (let i = x; i < this.board.length; i++) {
    if (this.board[i][y] !== 'x') return

    shipPlacement.push([i, y])
    shipLength -= 1
    if (shipLength === 0) {
      break
    }
  }

  shipPlacement.forEach((coordinate) => {
    const [i, j] = coordinate
    this.board[i][j] = battleship.name
  })

  this.addToFleet(battleship)
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

// GET SHIPS

function getShip(shipName) {
  return this.fleet.filter((battleship) => battleship.name === shipName)[0]
}

// ARE ALL SUNK

function isEveryShipSunk() {
  const sunk = this.fleet.filter((battleship) => battleship.isSunk === true)
  return sunk.length === 5
}

export default gameboard
