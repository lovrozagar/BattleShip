const pregame = (() => {
  function loadCard() {
    const app = document.getElementById('app')

    const card = document.createElement('section')
    card.className = 'pregame-card'

    loadTitle(card)
    loadNameForm(card)
    loadPlayNowButton(card)

    app.appendChild(card)
  }

  function loadTitle(card) {
    const title = document.createElement('h1')
    title.textContent = 'BATTLESHIP'
    card.appendChild(title)
  }

  function loadNameForm(card) {
    const nameForm = document.createElement('form')
    nameForm.className = 'name-form'

    const nameInput = document.createElement('input')
    nameInput.type = 'text'
    nameInput.id = 'name-input'
    nameInput.className = 'name-input'
    nameInput.placeholder = 'Captain name'

    const inputBorder = document.createElement('span')
    inputBorder.className = 'input-border'

    nameForm.appendChild(nameInput)
    nameForm.appendChild(inputBorder)

    card.appendChild(nameForm)
  }

  function loadPlayNowButton(card) {
    const button = document.createElement('button')
    button.id = 'play-now-button'
    button.className = 'play-now-button'

    const buttonText = document.createElement('span')
    buttonText.className = 'text-play-button'
    buttonText.textContent = 'ENTER COMBAT'

    button.appendChild(buttonText)

    card.appendChild(button)
  }

  return { loadCard }
})()

export default pregame
