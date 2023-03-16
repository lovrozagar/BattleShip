import helper from './helper'

const pregame = (() => {
  function loadCard() {
    const app = document.getElementById('app')
    app.classList.add('pregame')

    app.appendChild(createPregameCard())
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
    const form = helper.create('form', { className: 'name-form' })

    const input = helper.create('input', {
      type: 'text',
      id: 'name-input',
      className: 'name-input',
      placeholder: 'Captain name',
    })

    const border = helper.create('span', { className: 'input-border' })

    helper.appendAll(form, [input, border])

    return form
  }

  function createPlayNowButton() {
    const button = helper.create('button', {
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
