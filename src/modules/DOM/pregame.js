const pregame = (() => {
  function loadCard() {
    const app = document.getElementById('app')

    app.appendChild(createPregameCard())
  }

  function createPregameCard() {
    const card = document.createElement('section')
    card.className = 'pregame-card'

    card.appendChild(createTitle())
    card.appendChild(createNameForm())
    card.appendChild(createPlayNowButton())

    return card
  }

  function createTitle() {
    const title = document.createElement('h1')
    title.textContent = 'BATTLESHIP'

    return title
  }

  function createNameForm() {
    const nameForm = document.createElement('form')
    nameForm.className = 'name-form'

    const nameInput = document.createElement('input')
    nameInput.type = 'text'
    nameInput.id = 'name-input'
    nameInput.className = 'name-input'
    nameInput.placeholder = 'Captain name'

    const caret = document.createElement('span')
    caret.className = 'caret'

    const inputBorder = document.createElement('span')
    inputBorder.className = 'input-border'

    nameForm.appendChild(nameInput)
    nameForm.appendChild(caret)
    nameForm.appendChild(inputBorder)

    return nameForm
  }

  function createPlayNowButton() {
    const button = document.createElement('button')
    button.id = 'play-now-button'
    button.className = 'play-now-button'

    const buttonText = document.createElement('span')
    buttonText.className = 'text-play-button'
    buttonText.textContent = 'ENTER COMBAT'

    button.appendChild(buttonText)

    return button
  }

  return { loadCard }
})()

export default pregame
