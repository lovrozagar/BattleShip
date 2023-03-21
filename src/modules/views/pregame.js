// VIEWS
import setup from './setup'
import helper from './helper'
import DragDrop from './dragDrop'
import Sound from '../utils/sound'
import Game from '../factories/game'

const pregame = (() => {
  function loadPregameContent() {
    loadCard()
    initPlayButton()
    Sound.BackgroundOnFirstTouch()
  }

  function initPlayButton() {
    const button = document.getElementById('play-now-button')
    button.addEventListener('click', loadSetup)
  }

  function loadSetup() {
    setPlayerName()
    helper.deleteAppContent()
    setup.loadSetupContent()
    DragDrop.initDraggableFields()
  }

  function setPlayerName() {
    const name = document.getElementById('name-input').value.toString().trim()
    if (name) Game.getState().getPlayer().setName(`Captain ${name}`)
    console.log(name)
  }

  function loadCard() {
    const app = document.getElementById('app')
    app.classList.add('pregame')

    helper.appendAll(app, [createPregameCard(), createGitHubButton()])
  }

  function createPregameCard() {
    const section = helper.create('section', { className: 'pregame-card' })

    helper.appendAll(section, [
      createTitle(),
      createNameForm(),
      createPlayNowButton(),
    ])

    return section
  }

  function createTitle() {
    const title = helper.create('h1', { textContent: 'BATTLESHIP' })
    return title
  }

  function createNameForm() {
    const container = helper.create('div', { className: 'name-form' })

    const input = helper.create('input', {
      type: 'text',
      id: 'name-input',
      className: 'name-input',
      placeholder: 'Captain name',
      minLength: 0,
      maxLength: 15,
    })

    const border = helper.create('span', { className: 'input-border' })

    helper.appendAll(container, [input, border])

    return container
  }

  function createPlayNowButton() {
    const button = helper.create('button', {
      type: 'button',
      id: 'play-now-button',
      className: 'play-now-button',
    })

    const text = helper.create('span', {
      className: 'text-play-button',
      textContent: 'ENTER COMBAT',
    })

    button.appendChild(text)

    return button
  }

  function createGitHubButton() {
    const container = helper.create('div', { className: 'button-container' })

    const button = helper.create('a', {
      id: 'github-button',
      className: 'github-button',
      textContent: 'GITHUB',
      href: 'https://github.com/lovrozagar',
      target: 'blank',
    })

    container.appendChild(button)

    return container
  }

  return { loadPregameContent }
})()

export default pregame
