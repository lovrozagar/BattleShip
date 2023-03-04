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

  addToFleet(battleship)
}

function isOutOfBounds(shipLength, boardLength, field) {
  return shipLength > boardLength - field
}

// RECEIVE ATTACK

// function receiveAttack(coords) {
//   const [x, y] = coords
//   if (this.board[x][y] !== 'carrier') {
//     this.fleet.
//   }
// }

function addToFleet(shipName) {
  switch (shipName) {
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

export default gameboard
