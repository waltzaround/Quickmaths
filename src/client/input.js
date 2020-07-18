// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
import { updateDirection } from './networking';
const upTurn = Math.atan2(0, 0);
const rightTurn = Math.atan2(1, 0);
const downTurn = Math.atan2(0, -1);
const leftTurn = Math.atan2(-1, 0);

function onMouseInput(e) {
  handleInput(e.clientX, e.clientY);
}

function onTouchInput(e) {
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}

function onKeyDown(e) {

  
  if (e.code === 'ArrowUp') updateDirection(upTurn);
  if (e.code === 'ArrowRight') updateDirection(rightTurn);
  if (e.code === 'ArrowLeft') updateDirection(leftTurn);
  if (e.code === 'ArrowDown') updateDirection(downTurn);

}
function onKeyUp(e) {

}

function handleInput(x, y) {
  const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
  updateDirection(dir);
}


export function startCapturingInput() {
  // window.addEventListener('mousemove', onMouseInput);
  window.addEventListener('click', onMouseInput);
  window.addEventListener('touchstart', onTouchInput);
  window.addEventListener('touchmove', onTouchInput);

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
}

export function stopCapturingInput() {
  window.removeEventListener('mousemove', onMouseInput);
  window.removeEventListener('click', onMouseInput);
  window.removeEventListener('touchstart', onTouchInput);
  window.removeEventListener('touchmove', onTouchInput);
  window.removeEventListener('keydown', onKeyDown);
}
