// web audio api related
// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext

const audioContext = new AudioContext()
// consolidated version
/* const audioContext = new(window.AudioContext || window.webkitAudioContext)(); */
// get the audio element
const audioElement = document.querySelector('audio')
/* sets the loop attribute dynamically by setting the loop property on the audio element. */
audioElement.loop = true
// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement)

const gainNode = audioContext.createGain()

track.connect(gainNode).connect(audioContext.destination)

// select the play button
const playButton = document.querySelector('.play-pause')

playButton.addEventListener(
        'click',
        function () {
            if (audioContext.state === 'suspended') {
                audioContext.resume()
            }
            // play or pause track
            if (this.dataset.playing === 'false') {
                audioElement.play()
                this.dataset.playing = 'true'
                playButton.innerHTML = `Pause`
            } else if (this.dataset.playing === 'true') {
                audioElement.pause()
                this.dataset.playing = 'false'
                playButton.innerHTML = `Play`
            }
        },
        false
)
audioElement.addEventListener(
        'ended',
        () => {
            playButton.dataset.playing = 'false'
        }
)
const volumeControl = document.querySelector('#volume')
volumeControl.addEventListener(
        'input',
        function () {
            gainNode.gain.value = this.value
        },
        false
)

