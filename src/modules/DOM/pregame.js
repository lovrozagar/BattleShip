import helper from './helper'
import Component from './reusableComponents'

const pregame = (() => {
  function loadCard() {
    const app = document.getElementById('app')
    app.classList.add('pregame')

    helper.appendAll(app, [createPregameCard(), Component.createGitHubButton()])
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

  return { loadCard }
})()

export default pregame
