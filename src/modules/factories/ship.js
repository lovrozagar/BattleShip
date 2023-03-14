const ship = (name, length) => {
  const timesHit = 0
  const isSunk = false
  const isFound = false
  return {
    name,
    length,
    timesHit,
    isSunk,
    isFound,
    getLength,
    hit,
    sunk,
    found,
    resetFound,
  }
}

function getLength() {
  return this.length
}

function hit() {
  this.timesHit += 1
  if (this.timesHit === this.length) this.sunk()
}

function sunk() {
  this.isSunk = true
}

function found() {
  this.isFound = true
}

function resetFound() {
  this.found = false
}

export default ship
