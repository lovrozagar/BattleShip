// ASSETS
import agent from '../../assets/images/agent.png'

const component = (() => {
  function createMessageSection(className) {
    const messageSection = document.createElement('section')
    messageSection.classList.add('message', className)

    const messageImage = document.createElement('img')
    messageImage.className = 'message-image'
    messageImage.src = agent

    const messageClass = className === 'setup' ? 'welcome' : 'ready'
    const text = document.createElement('div')
    text.id = 'message-text'
    text.classList.add('message-text', messageClass)
    text.textContent = ''

    messageSection.appendChild(messageImage)
    messageSection.appendChild(text)

    return messageSection
  }

  return { createMessageSection }
})()

export default component
