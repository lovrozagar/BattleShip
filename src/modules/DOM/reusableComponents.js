import Typed from 'typed.js'
// ASSETS
import agent from '../../assets/images/agent.png'
import enemy from '../../assets/images/evilCaptain.png'

const Component = (() => {
  // FOR WEBPACK IMAGES LOADING
  const images = { agent, enemy }

  function createMessageSection(classNamesArray) {
    const messageSection = document.createElement('section')
    messageSection.className = 'message'
    // SET ALL PASSED CLASSES
    classNamesArray.forEach((el) => messageSection.classList.add(el))
    const character = classNamesArray[1]

    const messageImage = document.createElement('img')
    messageImage.className = 'message-image'
    messageImage.src = images[classNamesArray[1]]

    messageSection.appendChild(messageImage)
    messageSection.appendChild(createMessage(character))

    return messageSection
  }

  function createMessage(character) {
    const messageContainer = document.createElement('div')
    messageContainer.id = 'message-container'
    messageContainer.className = 'message-container'

    const text = document.createElement('div')
    text.id = `message-${character}`
    text.className = `message-${character}`
    text.textContent = ''

    messageContainer.appendChild(text)

    return messageContainer
  }

  function addTypeWriterMessage(element, stringArray) {
    const typed = new Typed(element, {
      strings: stringArray,
      typeSpeed: 10,
    })
  }

  return { createMessageSection, addTypeWriterMessage }
})()

export default Component
