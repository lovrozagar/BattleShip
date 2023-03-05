import ship from '../../factories/ship'

// TIMES HIT
test('times hit 1', () => {
  const battleship = ship('submarine', 3)
  battleship.hit()
  expect(battleship.timesHit).toBe(1)
})

test('times hit 3', () => {
  const battleship = ship('submarine', 3)
  battleship.hit()
  battleship.hit()
  battleship.hit()
  expect(battleship.timesHit).toBe(3)
})

// IS SUNK
test('is sunk - sunk', () => {
  const battleship = ship('submarine', 3)
  battleship.hit()
  battleship.hit()
  battleship.hit()
  expect(battleship.isSunk).toBeTruthy()
})

test('is sunk - not sunk', () => {
  const battleship = ship('battleship', 4)
  battleship.hit()
  battleship.hit()
  battleship.hit()
  expect(battleship.isSunk).not.toBeTruthy()
})
