import helper from './helper'
import fleet from './fleet'
import Game from '../factories/game'

const Battle = (() => {
  function loadBattleContent() {
    helper.deleteAppContent()

    const app = document.getElementById('app')
    app.classList = ''
    app.classList.add('app', 'battle')

    app.appendChild(createMapsSection())
    renderPlayerShips()
    Game.state.getCPU().autoPlace()
    initBoardFields()
  }

  function createMapsSection() {
    const mapsSection = document.createElement('section')
    mapsSection.className = 'maps-section'

    mapsSection.appendChild(createPlayerMap())
    mapsSection.appendChild(createComputerMap())

    return mapsSection
  }

  function createPlayerMap() {
    const map = helper.createMap('friendly')
    map.appendChild(createMapTitle('FRIENDLY WATERS'))

    return map
  }

  function createComputerMap() {
    const map = helper.createMap('enemy')
    map.appendChild(createMapTitle('ENEMY WATERS'))

    return map
  }

  function createMapTitle(titleText) {
    const titleContainer = document.createElement('div')
    titleContainer.className = 'map-title-container'

    const title = document.createElement('h3')
    title.className = 'map-title'
    title.textContent = titleText

    titleContainer.appendChild(title)

    return titleContainer
  }

  function renderPlayerShips() {
    Game.state.getPlayer().getMap().setAllShipsNotFound()
    fleet.loadFleet()
  }

  function initBoardFields() {
    const enemyMap = document.getElementById('board-enemy')
    const enemyBoard = enemyMap.querySelector('.field-container')
    enemyBoard.childNodes.forEach((field) => {
      field.addEventListener('click', handleFieldClick)
    })
  }

  function handleFieldClick(event) {
    const { target } = event

    const index = [...target.parentNode.children].indexOf(target)
    const x = parseInt(index / 10, 10)
    const y = index % 10

    const enemyMap = Game.state.getCPU().getMap().getBoard()

    if (enemyMap[x][y] === 'hit' || enemyMap[x][y] === 'missed') return

    if (enemyMap[x][y] === 'x') {
      console.log('b')
      target.style.backgroundColor = 'lightblue'
    } else {
      console.log('r')
      target.style.backgroundColor = 'red'
      target.classList.add('hit')
    }
  }

  return { loadBattleContent }
})()

export default Battle
