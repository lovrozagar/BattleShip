import gameboard from '../../gameboard/gameboard'
import ship from '../../ship/ship'

const board = gameboard()

const carrier = ship('carrier', 5)
const battleship = ship('battleship', 4)
const cruiser = ship('cruiser', 3)
const submarine = ship('submarine', 3)
const destroyer = ship('destroyer', 2)

board.placeX(carrier, [0, 0])
board.placeX(battleship, [2, 0])
board.placeX(cruiser, [3, 3])
board.placeY(submarine, [7, 9])
board.placeX(destroyer, [4, 2])

describe('receive attack', () => {
  test('sunk carrier', () => {
    board.receiveAttack([0, 0])
    board.receiveAttack([0, 1])
    board.receiveAttack([0, 2])
    board.receiveAttack([0, 3])
    board.receiveAttack([0, 4])
    expect(board.getShip('carrier').timesHit).toBe(5)
    expect(board.getShip('carrier').isSunk).toBeTruthy()
  })
  test('hit battleship tail', () => {
    board.receiveAttack([2, 3])
    expect(board.getShip('battleship').timesHit).toBe(1)
  })
  test('hit cruiser 2 times', () => {
    board.receiveAttack([3, 4])
    board.receiveAttack([3, 5])
    expect(board.getShip('cruiser').timesHit).toBe(2)
  })
  test('hit sub middle', () => {
    board.receiveAttack([8, 9])
    expect(board.getShip('submarine').timesHit).toBe(1)
  })
  test('sunk destroyer', () => {
    board.receiveAttack([4, 2])
    board.receiveAttack([4, 3])
    expect(board.getShip('destroyer').timesHit).toBe(2)
    expect(board.getShip('destroyer').isSunk).toBeTruthy()
  })
  test('miss middle of board', () => {
    board.receiveAttack([4, 4])
    expect(board.board[4][4]).toMatch('missed')
  })
})

describe('all ships sunk', () => {
  test('sunk all ships', () => {
    // CARRIER SUNK
    board.receiveAttack([0, 0])
    board.receiveAttack([0, 1])
    board.receiveAttack([0, 2])
    board.receiveAttack([0, 3])
    board.receiveAttack([0, 4])
    // BATTLESHIP SUNK
    board.receiveAttack([2, 0])
    board.receiveAttack([2, 1])
    board.receiveAttack([2, 2])
    board.receiveAttack([2, 3])
    // CRUISER
    board.receiveAttack([3, 3])
    board.receiveAttack([3, 4])
    board.receiveAttack([3, 5])
    // SUBMARINE
    board.receiveAttack([7, 9])
    board.receiveAttack([8, 9])
    board.receiveAttack([9, 9])
    // DESTROYER
    board.receiveAttack([4, 2])
    board.receiveAttack([4, 3])

    expect(board.isEveryShipSunk()).toBeTruthy()
  })
})
