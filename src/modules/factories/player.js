import gameboard from './gameboard'
import ship from './ship'

const player = (name, isCpu = false) => {
  const board = gameboard()
  const turn = 0
  return {
    name,
    isCpu,
    board,
    turn,
    getMap,
    playTurn,
    cpuPlay,
    autoPlace,
    isEmptyField,
  }
}

function getMap() {
  return this.board
}

function playTurn(coordinate = []) {
  if (!this.isEmptyField(coordinate) && !this.isCpu) return

  if (this.isCpu) {
    this.cpuPlay()
  } else {
    this.board.receiveAttack(coordinate)
  }

  this.turn += 1
}

function isEmptyField(coordinate) {
  if (!coordinate.length) return false

  const [x, y] = coordinate
  return this.board.board[x][y] !== 'missed' && this.board.board[x][y] !== 'hit'
}

function cpuPlay() {
  let invalidCoordinate = true

  while (invalidCoordinate) {
    const x = randomCoordinate()
    const y = randomCoordinate()

    if (this.isEmptyField([x, y])) {
      invalidCoordinate = false
      this.board.receiveAttack([x, y])
    }
  }
}

function autoPlace() {
  const fleet = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']
  const length = [5, 4, 3, 3, 2]
  const board = this.getMap()

  while (fleet.length) {
    const axis = randomAxis
    let placed = false

    const row = randomCoordinate()
    const col = randomCoordinate()

    if (axis === 'x') {
      placed = board.placeX(ship(fleet[0], length[0]), [row, col])
    } else {
      placed = board.placeY(ship(fleet[0], length[0]), [row, col])
    }

    if (placed) {
      fleet.shift()
      length.shift()
    }
  }

  console.log(board)
}

function randomCoordinate() {
  return Math.floor(Math.random() * (9 + 1))
}

function randomAxis() {
  const axis = ['x', 'y']
  return axis[Math.floor(Math.random() * (1 + 1))]
}

export default player
