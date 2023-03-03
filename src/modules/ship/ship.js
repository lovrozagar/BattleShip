const ship = (length) => {
  const timesHit = 0
  const isSunk = false
  return {
    length,
    timesHit,
    isSunk,
    hit,
    sunk,
  }
}

function hit() {
  this.timesHit += 1
  if (this.timesHit === this.length) this.sunk()
}

function sunk() {
  this.isSunk = true
}

export default ship
