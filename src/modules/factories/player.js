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
    isLoser,
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
  const [x, y] = coordinate
  return this.board.board[x][y] !== 'miss' && this.board.board[x][y] !== 'hit'
}

function cpuPlay() {
  let invalidCoordinate = true
  let x
  let y

  while (invalidCoordinate) {
    x = randomCoordinate()
    y = randomCoordinate()

    if (this.isEmptyField([x, y])) {
      console.log('a')
      invalidCoordinate = false
      this.board.receiveAttack([x, y])
    }
  }

  return [x, y]
}

function autoPlace() {
  const fleet = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']
  const length = [5, 4, 3, 3, 2]
  const board = this.getMap()

  while (fleet.length) {
    const axis = randomAxis()
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
}

function isLoser() {
  return this.getMap()
    .getFleet()
    .every((battleship) => battleship.isSunk)
}

function randomCoordinate() {
  return Math.floor(Math.random() * (9 + 1))
}

function randomAxis() {
  const axis = ['x', 'y']
  return axis[Math.round(Math.random())]
}

export default player
