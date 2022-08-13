import Player from '@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
let throttle = require('lodash.throttle');

const onPlay = function (data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
};

player.on('timeupdate', throttle(onPlay), 1000);

player.setCurrentTime(localStorage.getItem('videoplayer-current-time')).then(function (seconds) {
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