// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#5-client-rendering
import { debounce } from 'throttle-debounce';
import { getAsset } from './assets';
import { getCurrentState } from './state';
import { getCurrentInput } from './input';

const Constants = require('../shared/constants');

const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = Constants;

const BULLET_TRAIL = {}

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

function setCanvasDimensions() {
  // On small screens (e.g. phones), we want to "zoom out" so players can still see at least
  // 800 in-game units of width.
  const scaleRatio = Math.max(1, 800 / window.innerWidth);
  canvas.width = scaleRatio * window.innerWidth;
  canvas.height = scaleRatio * window.innerHeight;
}

window.addEventListener('resize', debounce(40, setCanvasDimensions));

function render() {
  const { me, others, bullets } = getCurrentState();
  if (!me) {
    return;
  }

  // Draw background
  renderBackground(me.x, me.y);

  // Draw boundaries
  context.strokeStyle = '#535353';
  context.shadowColor = '#3A3A3A';
  context.shadowBlur = 15;
  context.lineWidth = 4;
  context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);

  // Draw all bullets
  bullets.forEach(renderBullet.bind(null, me));
  const bulletIds = bullets.map(b => b.id);


  const keysToDelete = []
  for (let key in Object.keys(BULLET_TRAIL)) {
    if (!bulletIds.includes(key)) {
      keysToDelete.push(key);
    }
  }

  for (let key of keysToDelete) {
    delete BULLET_TRAIL[key];
  }

  // Draw all players
  renderPlayer(me, me);
  others.forEach(otherPlayer => renderOtherPlayer(me, otherPlayer));
}

function renderBackground(x, y) {
  // const imagebg = new Image();
  // imagebg.src = backgroundImage;
  // const bgimagepattern = context.createPattern(imagebg, 'repeat');
  const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  const backgroundGradient = context.createRadialGradient(
    backgroundX,
    backgroundY,
    MAP_SIZE / 10,
    backgroundX,
    backgroundY,
    MAP_SIZE / 2,
  );
  backgroundGradient.addColorStop(0, '#333');
  backgroundGradient.addColorStop(1, '#000');
  context.fillStyle = backgroundGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// Renders a ship at the given coordinates
function renderPlayer(me, player) {
  const { x, y, direction } = player;
  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;

  // Draw ship
  context.save();
  context.translate(canvasX, canvasY);
  context.rotate(direction);
  context.drawImage(
    getAsset('ship3.svg'),
    -PLAYER_RADIUS,
    -PLAYER_RADIUS,
    PLAYER_RADIUS * 2,
    PLAYER_RADIUS * 2,
  );

  context.restore();

  // Draw health bar
  context.fillStyle = 'white';
  context.fillRect(
    canvasX - PLAYER_RADIUS,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2,
    2,
  );
  context.fillStyle = 'red';
  context.fillRect(
    canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP),
    2,
  );



  // Draw input field
  context.font = '18px DM Sans';
  context.fillStyle = 'white';
  context.textAlign = 'center';
  const input = getCurrentInput() === '' ? 'Type an answer + enter' : getCurrentInput();
  context.fillText(input, canvasX, canvasY + 56);
}

function hasNaNAtEnd(string) {
  const last3Char = string.slice(string.length - 3);
  return last3Char === 'NaN';
}

// Renders a ship at the given coordinates
function renderOtherPlayer(me, player) {
  const { x, y, direction, id } = player;
  let user = null;
  const striperID = hasNaNAtEnd(id) ? id.slice(0, id.length - 3) : id;
  const otherPlayer = window.players[striperID];
  if (otherPlayer || user) {
    user = otherPlayer;
  }
  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;

  // Draw ship
  context.save();
  context.translate(canvasX, canvasY);
  context.rotate(direction);
  
  context.drawImage(
    getAsset('ship2.svg'),
    -PLAYER_RADIUS,
    -PLAYER_RADIUS,
    PLAYER_RADIUS * 2,
    PLAYER_RADIUS * 2,
  );
  context.restore();

  // Draw health bar
  context.fillStyle = 'white';
  context.fillRect(
    canvasX - PLAYER_RADIUS,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2,
    2,
  );
  context.fillStyle = 'red';
  context.fillRect(
    canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP),
    2,
  );
// setup font
  context.font = '26px DM Sans';
  context.fillStyle = 'white';
  context.textAlign = 'center';

  // draw math question
  context.fillText(user.mathQuestion.mathString, canvasX, canvasY - 40);
  context.font = '14px DM Sans';


  // draw draw username
  context.fillText(user.username, canvasX, canvasY + 48);
}



function renderBullet(me, bullet) {

  const { id, x, y } = bullet;

  const striperID = hasNaNAtEnd(id) ? id.slice(0, id.length - 3) : id;

  if (!BULLET_TRAIL[striperID]) {
    BULLET_TRAIL[striperID] = [{x: x, y:y, mex: me.x, mey: me.y}]
  }else {
    if (BULLET_TRAIL[striperID].length > 3) {
      BULLET_TRAIL[striperID].shift();
    }


    BULLET_TRAIL[striperID].push({x:x, y:y, mex: me.x, mey: me.y})
  }

  const numPrevBullets = BULLET_TRAIL[striperID].length;

  const opacityIncrease = 1 / numPrevBullets;

  let count = 0;
  for (let obj of BULLET_TRAIL[striperID]) {
    const {x, y, mex, mey} = obj;
    context.beginPath();
    context.arc(canvas.width / 2 + x - mex - BULLET_RADIUS,canvas.height / 2 + y - mey - BULLET_RADIUS, 10, 0, 2 * Math.PI, true);
    const opacity = opacityIncrease * count;
    const styleString = "rgba(98, 54, 255, " + opacity.toString() + ")"
    context.fillStyle = styleString;
    context.fill();
    count += 1;
  }

  context.drawImage(
    getAsset('bullet.svg'),
    canvas.width / 2 + x - me.x - BULLET_RADIUS,
    canvas.height / 2 + y - me.y - BULLET_RADIUS,
    BULLET_RADIUS * 2,
    BULLET_RADIUS * 2,
  );
}

function renderMainMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  renderBackground(x, y);
}

let renderInterval = setInterval(renderMainMenu, 1000 / 60);

// Replaces main menu rendering with game rendering.
export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / 60);
}

// Replaces game rendering with main menu rendering.
export function stopRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
