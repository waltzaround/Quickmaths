import { random } from 'lodash';

import firing1 from '../../public/assets/audio/firing/fire1.mp3';
import firing2 from '../../public/assets/audio/firing/fire2.mp3';
import firing3 from '../../public/assets/audio/firing/fire3.mp3';
import firing4 from '../../public/assets/audio/firing/fire4.mp3';
import firing5 from '../../public/assets/audio/firing/fire5.mp3';
import firing6 from '../../public/assets/audio/firing/fire6.mp3';
import firing7 from '../../public/assets/audio/firing/fire7.mp3';
import firing8 from '../../public/assets/audio/firing/fire8.mp3';
import firing9 from '../../public/assets/audio/firing/fire9.mp3';
import firing10 from '../../public/assets/audio/firing/fire10.mp3';

import death1 from '../../public/assets/audio/death/death.mp3';
import death2 from '../../public/assets/audio/death/death2.mp3';
import death3 from '../../public/assets/audio/death/death3.mp3';
import death3 from '../../public/assets/audio/death/death4.mp3';

const FIRE_AUDIO = [firing1, firing2, firing3, firing4, firing5, firing6, firing7, firing8, firing9, firing10];
const DAMAGE_AUDIO = [death1, death2, death3]

/**
 * @param {number} delayTime milli second
 */
export function playFireAudio(delayTime) {
  setTimeout(() => {
    const audioURL = FIRE_AUDIO[random(FIRE_AUDIO.length - 1)];
    const audioObj = new Audio(audioURL);
    audioObj.loop = false;
    audioObj.onended = () => {
      audioObj.pause();
    };
    audioObj.load();
    audioObj.play();
  }, delayTime);
}

export function playDamageAudio(delayTime) {
  setTimeout(() => {
    const audioURL = DAMAGE_AUDIO[random(DAMAGE_AUDIO.length - 1)];
    const audioObj = new Audio(audioURL);
    audioObj.loop = false;
    audioObj.onended = () => {
      audioObj.pause();
    };
    audioObj.load();
    audioObj.play();
  }, delayTime);
}
