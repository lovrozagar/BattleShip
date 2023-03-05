import gameboard from './gameboard'

const player = (name) => {
  const board = gameboard()
  const turn = 0
  return {
    name,
    board,
    turn,
    playTurn,
    isEmptyField,
  }
}

function playTurn(coordinate) {
  if (!this.isEmptyField(coordinate)) return
  this.board.receiveAttack(coordinate)
  this.turn += 1
}

function isEmptyField(coordinate) {
  const [x, y] = coordinate
  return this.board.board[x][y] === 'x'
}

export default player
