import gameboard from './gameboard'
import ship from './ship'

const player = (name, isCpu = false) => {
  const board = gameboard()
  const searchQueue = []
  return {
    name,
    isCpu,
    board,
    searchQueue,
    getMap,
    getName,
    setName,
    fillQueue,
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

function getName() {
  return this.name
}

function setName(name) {
  this.name = name
}

function playTurn(coordinate = []) {
  if (this.searchQueue) return this.playFromQueue()
  return this.cpuPlay()
}

function isEmptyField(coordinate) {
  const [x, y] = coordinate
  return this.board.board[x][y] !== 'miss' && this.board.board[x][y] !== 'hit'
}

function fillQueue(row, col) {
  // IF ONLY ORIGIN OF FIRST HIT LEFT, EMPTY THE QUEUE
  if (this.searchQueue.length === 1) {
    this.searchQueue = []
  }

  if (this.getMap().getBoard()[row][col] === 'miss') return

  // IF FIRST HIT IN AN AREA, STORE IT AND USE IT AS A REFERENCE POINT FOR DIRECTION LATER
  let origin = false
  if (this.searchQueue.length === 0) {
    this.searchQueue.push([row, col])
    origin = true
  }

  if (row > 0 && row <= 9) {
    // top
    this.searchQueue.push([row - 1, col])
  }

  // bottom
  if (row >= 0 && row < 9) {
    this.searchQueue.push([row + 1, col])
  }

  // left
  if (col > 0 && col <= 9) {
    this.searchQueue.push([row, col - 1])
  }

  // right
  if (col >= 0 && col < 9) {
    this.searchQueue.push([row, col + 1])
  }

  if (this.searchQueue.length > 1 && !origin) {
    console.log(row, col)
    if (row === this.searchQueue[0][0]) {
      console.log('c')
      this.searchQueue = [
        ...this.searchQueue.slice(0, 1),
        ...this.searchQueue.slice(1).filter((subArr) => subArr[0] === row),
      ]
    } else if (col === this.searchQueue[0][1]) {
      console.log('d')
      this.searchQueue = [
        ...this.searchQueue.slice(0, 1),
        ...this.searchQueue.slice(1).filter((subArr) => subArr[1] === col),
      ]
    }
  }
}

function cpuPlay() {
  let invalidCoordinate = true
  let x
  let y

  while (invalidCoordinate) {
    if (this.searchQueue.length > 1)
      [x, y] = getRandomAndRemove(this.searchQueue)
    else {
      x = randomCoordinate()
      y = randomCoordinate()
    }

    if (this.isEmptyField([x, y])) {
      invalidCoordinate = false
      this.board.receiveAttack([x, y])
    }
  }

  this.fillQueue(x, y)
  console.log(this.searchQueue)
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

function getRandomAndRemove(array) {
  const randomIndex = Math.floor(Math.random() * (array.length - 1)) + 1
  const randomElement = array[randomIndex]
  array.splice(randomIndex, 1)
  return randomElement
}

export default player
