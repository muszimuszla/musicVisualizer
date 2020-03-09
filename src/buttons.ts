import * as muteButton from "../src/assets/mute.svg";
import * as volumeButton from "../src/assets/volume.svg";
import * as playButton from "../src/assets/play.svg";
import * as pauseButton from "../src/assets/pause.svg";

import * as music1 from "../src/music/Scott Holmes - Storybook.mp3";
import * as music2 from "../src/music/David Hilowitz - Gradual Sunrise.mp3";
import * as music3 from "../src/music/Small Tall Order - Until We Get By.mp3";
import * as music4 from "../src/music/Derek Clegg - Life and Times.mp3";

const music = [music1.toString(), music2.toString(), music3.toString(), music4.toString()];
var musicSrc = 0;
var audio = <HTMLAudioElement>document.getElementById("audio");

document.getElementById("playstop").addEventListener("click", () => {
  let playstop = <HTMLImageElement>document.getElementById("playstop");
  if (!audio.paused) {
    audio.pause();
    playstop.src = playButton.toString();
  } else {
    audio.play();
    playstop.src = pauseButton.toString();
  }
});

var volumeSlider = <HTMLInputElement>document.getElementById("volume");
volumeSlider.addEventListener("input", () => {
  audio.volume = +volumeSlider.value;
});

document.getElementById("mute").addEventListener("click", () => {
  let mute = <HTMLImageElement>document.getElementById("mute");
  if (!audio.muted) {
    audio.muted = true;
    mute.src = muteButton.toString();
  } else {
    audio.muted = false;
    mute.src = volumeButton.toString();
  }
});

document.getElementById("next").addEventListener("click", () => {
  let wasPaused = 0;
  if (audio.paused) wasPaused = 1;
  audio.pause();
  if (musicSrc == 3) {
    musicSrc = 0;
    audio.setAttribute("src", music[musicSrc]);
  } else {
    audio.setAttribute("src", music[musicSrc + 1]);
    musicSrc += 1;
  }
  audio.load();
  if (!wasPaused) audio.play();
});

document.getElementById("previous").addEventListener("click", () => {
  let wasPaused = 0;
  if (audio.paused) wasPaused = 1;
  audio.pause();
  if (musicSrc == 0) {
    musicSrc = 3;
    audio.setAttribute("src", music[musicSrc]);
  } else {
    audio.setAttribute("src", music[musicSrc - 1]);
    musicSrc -= 1;
  }
  audio.load();
  if (!wasPaused) audio.play();
});
