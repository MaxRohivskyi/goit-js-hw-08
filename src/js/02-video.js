import Player from '@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

let throttle = require('lodash.throttle');

const CURRENTTIME_DATA = 'videoplayer-current-time';

const onPlay = function (data) {
  localStorage.setItem(CURRENTTIME_DATA, data.seconds);
};

player.on('timeupdate', throttle(onPlay), 1000);

player.setCurrentTime(localStorage.getItem(CURRENTTIME_DATA)).then(function (seconds) {
  // seconds = the actual time that the player seeked to
  console.log(seconds);
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});