import player from '../../factories/player'

let combatant
let cpu

describe('player', () => {
  // INTI PLAYERS BEFORE EACH TEST
  beforeEach(() => {
    combatant = player('combatant')
    cpu = player('cpu')
  })

  test('player turn', () => {
    combatant.playTurn([0, 0])
    expect(combatant.turn).toBe(1)
  })

  test('each coordinate can be played only once', () => {
    combatant.playTurn([0, 0])
    cpu.playTurn([3, 3])
    combatant.playTurn([0, 0])
    cpu.playTurn([3, 3])
    expect(combatant.turn).toBe(1)
    expect(cpu.turn).toBe(1)
  })
})
