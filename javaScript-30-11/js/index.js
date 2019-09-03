// Get our HTML elements
const player = document.querySelector('.player');
let playButton = player.querySelector('.toggle');
const playbackRate = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

const video = player.querySelector('.viewer'); 
const progress = player.querySelector('.progress');  
const progressBar = player.querySelector('.progress__filled');

let mousedown = false;
// Write our functions

function startStopPlay () {
   const method = video.paused ? 'play' : 'pause';
   video[method]();    
} 

function updateButton () {
    playButton.textContent = this.paused ? '►' : '❚ ❚';
}

function skip () {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// add eventLsteners to the created variables for DOM elements
video.addEventListener('click', startStopPlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
playButton.addEventListener('click', startStopPlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
playbackRate.forEach(rate => rate.addEventListener('change', handleRangeUpdate));
playbackRate.forEach(rate => rate.addEventListener('mousemove', handleRangeUpdate));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
