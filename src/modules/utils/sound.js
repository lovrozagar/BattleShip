// ASSETS
import shotSound from '../../assets/sounds/shot.mp3'
import hitSound from '../../assets/sounds/hit.mp3'
import missSound from '../../assets/sounds/miss.mp3'

const Sound = (() => {
  // Play audio with Web Audio API to avoid delay
  function playSound(soundUrl) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

    const request = new XMLHttpRequest()
    request.open('GET', soundUrl, true)
    request.responseType = 'arraybuffer'
    request.onload = () => {
      audioCtx.decodeAudioData(request.response, (buffer) => {
        const source = audioCtx.createBufferSource()
        source.buffer = buffer
        source.connect(audioCtx.destination)
        source.start(0)
      })
      audioCtx.resume()
    }
    request.send()
  }

  function shot() {
    playSound(shotSound)
  }

  function hit() {
    playSound(hitSound)
  }

  function miss() {
    playSound(missSound)
  }

  // LOAD BACKGROUND AUDIO ASYNCHRONOUSLY
  async function background() {
    const audioModule = await import('../../assets/sounds/backgroundOcean.mp3')
    const audio = new Audio(audioModule.default)
    audio.loop = true
    audio.play()
  }
  // PLAY BACKGROUND AUDIO ON FIRST CLICK/TAP
  function BackgroundOnFirstTouch() {
    if (/Android|iPhone/i.test(navigator.userAgent)) {
      document.addEventListener('touchstart', background, { once: true })
    } else {
      document.addEventListener('click', background, { once: true })
    }
  }

  return { shot, hit, miss, BackgroundOnFirstTouch }
})()

export default Sound
