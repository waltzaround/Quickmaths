// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
import { updateDirection, fire } from './networking';

const upTurn = Math.atan2(0, 0);
const rightTurn = Math.atan2(1, 0);
const downTurn = Math.atan2(0, -1);
const leftTurn = Math.atan2(-1, 0);
let inputNumbers = '';

function onMouseInput(e) {
  handleInput(e.clientX, e.clientY);
}



export function getCurrentInput() {
  return inputNumbers;
}

function onTouchInput(e) {
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}

function numberInput(newnum) {
  inputNumbers += newnum;
  if (inputNumbers.length === 5) {
    inputNumbers = inputNumbers.substring(1, 5);
  }
}

function backspaceInput() {
  inputNumbers = inputNumbers.substring(0,inputNumbers.length - 1);
}

function useNumber() {
  fire(Number(inputNumbers));
  inputNumbers = '';
}

function onKeyDown(e) {
  if (e.code === 'ArrowUp') updateDirection(upTurn);
  if (e.code === 'ArrowRight') updateDirection(rightTurn);
  if (e.code === 'ArrowLeft') updateDirection(leftTurn);
  if (e.code === 'ArrowDown') updateDirection(downTurn);
  if (e.code === 'KeyW') updateDirection(upTurn);
  if (e.code === 'KeyD') updateDirection(rightTurn);
  if (e.code === 'KeyA') updateDirection(leftTurn);
  if (e.code === 'KeyS') updateDirection(downTurn);
  if (e.code === 'Digit1') numberInput(1);
  if (e.code === 'Digit2') numberInput(2);
  if (e.code === 'Digit3') numberInput(3);
  if (e.code === 'Digit4') numberInput(4);
  if (e.code === 'Digit5') numberInput(5);
  if (e.code === 'Digit6') numberInput(6);
  if (e.code === 'Digit7') numberInput(7);
  if (e.code === 'Digit8') numberInput(8);
  if (e.code === 'Digit9') numberInput(9);
  if (e.code === 'Digit0') numberInput(0);
  if (e.code === 'Minus') numberInput('-');
  if (e.code === 'Numpad1') numberInput(1);
  if (e.code === 'Numpad2') numberInput(2);
  if (e.code === 'Numpad3') numberInput(3);
  if (e.code === 'Numpad4') numberInput(4);
  if (e.code === 'Numpad5') numberInput(5);
  if (e.code === 'Numpad6') numberInput(6);
  if (e.code === 'Numpad7') numberInput(7);
  if (e.code === 'Numpad8') numberInput(8);
  if (e.code === 'Numpad9') numberInput(9);
  if (e.code === 'Numpad0') numberInput(0);
  if (e.code === 'Enter') useNumber();
  if (e.code === 'Space') useNumber();
  if (e.code === 'NumpadEnter') useNumber();
  if (e.code === 'Backspace') backspaceInput();
}

function handleInput(x, y) {
  const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
  updateDirection(dir);
}


export function startCapturingInput() {
  // window.addEventListener('mousemove', onMouseInput);

  window.addEventListener('mousemove', onMouseInput);
  window.addEventListener('click', onMouseInput);
  window.addEventListener('touchstart', onTouchInput);
  window.addEventListener('touchmove', onTouchInput);

  window.addEventListener('keydown', onKeyDown);
}

export function stopCapturingInput() {
  window.removeEventListener('mousemove', onMouseInput);
  window.removeEventListener('click', onMouseInput);
  window.removeEventListener('touchstart', onTouchInput);
  window.removeEventListener('touchmove', onTouchInput);
  window.removeEventListener('keydown', onKeyDown);
}
