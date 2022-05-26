const playBtn = document.querySelector(".video__player-img");
const playerPlayBtn = document.querySelector(".duration__img");
const video = document.getElementById("player");
const durationControl = document.getElementById("durationlevel");
const soundControl = document.getElementById("miclevel");
const soundBtn = document.getElementById("soundbtn");
const dynamicBtn = document.getElementById('dynamic');
let intervalId;
let soundLevel;

window.addEventListener('load', function () {
  video.addEventListener('click', playStop);
  let playButtons = document.querySelectorAll(".play");

  for (let i=0; i < playButtons.length; i++) {
    playButtons[i].addEventListener('click', playStop);
  }

  durationControl.min = 0;
  durationControl.value = 0;
  durationControl.max = video.duration;
  durationControl.addEventListener("input", setVideoDuration);

  soundControl.min = 0;
  soundControl.max = 10;
  soundControl.value = soundControl.max;
  soundControl.addEventListener("input", changeSoundVolume);

  dynamicBtn.addEventListener('click', soundOf);

  video.addEventListener('ended', () => {
    playBtn.classList.toggle('video__player-img--active');
    playerPlayBtn.classList.remove('active');
    video.currentTime = 0;
  })
});

function playStop () {
  playBtn.classList.toggle("video__player-img--active");
  playerPlayBtn.classList.toggle("active");

  if (video.paused) {
    video.play();
    intervalId = setInterval(updateDuration, 1000 / 30);
  } else {
    clearInterval(intervalId);
    video.pause();
  }
}

function setVideoDuration () {
  video.currentTime = durationControl.value;
  updateDuration();
}

function updateDuration () {
  durationControl.value = video.currentTime;

  let step = video.duration / 100;
  let persent = video.currentTime / step;

  durationControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${persent}%, #626262 ${persent}%)`;
}

function changeSoundVolume ()  {
  video.volume = soundControl.value / 10;

  if (video.volume === 0) {
    soundBtn.classList.add("active");
  } else {
    soundBtn.classList.remove("active");
  }
}

function soundOf () {
  if (video.volume === 0) {
    video.volume = soundLevel;
    soundControl.value = soundLevel * 10;
    soundBtn.classList.remove('active');
  } else {
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
    soundBtn.classList.add('active');
  }
}