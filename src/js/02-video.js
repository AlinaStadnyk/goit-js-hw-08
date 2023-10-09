import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const KEY = 'videoplayer-current-time';
const currentTime = localStorage.getItem(KEY);
player.on(
  'timeupdate',
  throttle(() => {
    player.getCurrentTime().then(function (seconds) {
      localStorage.setItem(KEY, seconds);
    });
  }, 1000)
);
if (currentTime > 0) {
  player.setCurrentTime(currentTime);
}
