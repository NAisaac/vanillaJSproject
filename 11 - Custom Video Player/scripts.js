'use strict';

// Refer to HTML5 video methods and properties
// https://www.w3schools.com/tags/ref_av_dom.asp

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
let isMouseDown = false;

function togglePlay() {
  // invoke the play() or pause() function on the video HTML element
  video[video.paused ? 'play' : 'pause']();
}

function updateButton() {
  // change the text content depending on whether the video is playing or paused
   playButton.textContent = video.paused ? '►' : '| |';
}

function skip() {
  // access to custom data attributes (i.e. data-*)
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
  // adjust video's current time but first convert string to a number
  video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
  video[this.name] = this.value;
}

function updateProgress() {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${progressPercent}%`;
}

function videoScrub(e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

// hook up the event listners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);

playButton.addEventListener('click', togglePlay);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('click', rangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', () => isMouseDown && rangeUpdate));
ranges.forEach(range => range.addEventListener('mouseup', () => isMouseDown = false));
ranges.forEach(range => range.addEventListener('mousedown', () => isMouseDown = true));

progress.addEventListener('click', videoScrub);
progress.addEventListener('mousemove', (e) => isMouseDown && videoScrub(e));
progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mouseup', () => isMouseDown = false);
