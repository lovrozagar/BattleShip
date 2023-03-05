import player from '../../factories/player'

let combatant
let cpu

describe('player', () => {
  // INTI PLAYERS BEFORE EACH TEST
  beforeEach(() => {
    combatant = player('combatant')
    cpu = player('cpu', true)
  })

  test('player turn', () => {
    combatant.playTurn([0, 0])
    expect(combatant.turn).toBe(1)
  })

  test('each coordinate can be played only once', () => {
    combatant.playTurn([0, 0])
    combatant.playTurn([0, 0])
    expect(combatant.turn).toBe(1)
  })

  test('cpu plays random turn', () => {
    cpu.playTurn()
    cpu.playTurn()
    cpu.playTurn()
    expect(cpu.turn).toBe(3)
  })
})
