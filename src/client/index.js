// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#3-client-entrypoints
import { random } from 'lodash';
import { connect, play } from './networking';
import { startRendering, stopRendering } from './render';
import { startCapturingInput, stopCapturingInput } from './input';
import { downloadAssets } from './assets';
import { initState } from './state';
import { setLeaderboardHidden } from './leaderboard';

import die1 from '../../public/assets/audio/death/death.mp3';
import die2 from '../../public/assets/audio/death/death2.mp3';
import bg from '../../public/assets/audio/bg.mp3';
import start from '../../public/assets/audio/start.mp3';
// I'm using a tiny subset of Bootstrap here for convenience - there's some wasted CSS,
// but not much. In general, you should be careful using Bootstrap because it makes it
// easy to unnecessarily bloat your site.
import './css/bootstrap-reboot.css';
import './css/main.css';

const playMenu = document.getElementById('play-menu');
const playButton = document.getElementById('play-button');
const usernameInput = document.getElementById('username-input');

const deathMenu = document.getElementById('death-menu');
const scoreParagraph = document.getElementById('score-paragraph');
const playAgainButton = document.getElementById('play-again-button');

const audioObj = new Audio(bg);
const DIE_AUDIO = [die1, die2];
const startaudio = new Audio(start);
audioObj.loop = true;

const startPlaying = () => {
  //audioObj.play();
  audioObj.play();
  startaudio.play();  
  play(usernameInput.value);
  playMenu.classList.add('hidden');
  deathMenu.classList.add('hidden');
  initState();
  startCapturingInput();
  startRendering();
  setLeaderboardHidden(false);
}

Promise.all([
  connect(onGameOver),
  downloadAssets(),

]).then(() => {
  playMenu.classList.remove('hidden');
  usernameInput.focus();
  playButton.onclick = () => {
    startPlaying();
  };
  usernameInput.addEventListener('keyup', function(e){
    if (e.code === "Enter"){
      startPlaying();
    }
  })
  playAgainButton.onclick = () => {
    startPlaying();
  }
}).catch(console.error);

// message: { score: 123 }
function onGameOver(message) {
  stopCapturingInput();
  stopRendering();
  scoreParagraph.innerHTML = "Your score: " + Math.round(message.score);
  deathMenu.classList.remove('hidden');
  setLeaderboardHidden(true);
}
