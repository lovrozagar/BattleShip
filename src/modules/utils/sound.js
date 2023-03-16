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

  return { shot, hit, miss }
})()

export default Sound
