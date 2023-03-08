import gameboard from './gameboard'

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

function randomCoordinate() {
  return Math.floor(Math.random() * (9 + 1))
}

export default player
