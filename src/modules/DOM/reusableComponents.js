import Typed from 'typed.js'
// ASSETS
import agent from '../../assets/images/agent.png'
import enemy from '../../assets/images/evilCaptain.png'
import helper from './helper'

const Component = (() => {
  // FOR WEBPACK IMAGES LOADING
  const images = { agent, enemy }

  function createMessageSection(classNamesArray) {
    const section = helper.create('section', { className: 'message' })
    // SET ALL PASSED CLASSES
    classNamesArray.forEach((el) => section.classList.add(el))
    const character = classNamesArray[1]

    const image = helper.create('img', { className: 'message-image' })
    const imageName =
      classNamesArray[1] === 'agent' || classNamesArray[1] === 'agent-win'
        ? 'agent'
        : 'enemy'
    image.src = images[imageName]

    section.appendChild(image)
    section.appendChild(createMessage(character))

    return section
  }

  function createMessage(character) {
    const container = helper.create('div', {
      id: 'message-container',
      className: 'message-container',
    })

    const text = helper.create('div', {
      id: `message-${character}`,
      className: `message-${character}`,
    })

    container.appendChild(text)

    return container
  }

  // TYPEWRITER IGNORE NOT USED ERROR
  function addTypeWriterMessage(element, stringArray) {
    const typed = new Typed(element, {
      strings: stringArray,
      typeSpeed: 10,
    })
  }

  return { createMessageSection, addTypeWriterMessage }
})()

export default Component
