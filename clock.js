const ONE_SECOND = 1000;
window.addEventListener("DOMContentLoaded", setup);
window.addEventListener("hashchange", () => {
  window.location.reload();
});
function setup() {
  let clock1 = new Clock();
  clock1.start(location.hash.slice(1));
}
function playAudio(src) {
  let audio = new Audio(src);
  audio.load();
  audio.play();
}

class Clock {
  constructor() {
    this.$clock = document.getElementById("clock");
    this.limitTime = null;
    this.currentTime = 0;
    this.clock = null;
  }
  render(string) {
    this.$clock.textContent = string;
  }

  start(formattedTime) {
    this.limitTime = Clock.parseSeconds(formattedTime);
    this.clock = setInterval(() => {
      this.currentTime += ONE_SECOND;
      let diff = this.limitTime - this.currentTime;
      this.render(diff);
      this.update();
      if (this.isFinished()) {
        this.stop();
      }
    }, ONE_SECOND);
  }
  stop() {
    clearInterval(this.clock);
    this.$clock.classList.add("red-color");
    playAudio("openhat.wav");
  }

  isFinished() {
    return this.currentTime === this.limitTime;
  }
  update() {
    let remain = this.getRemainingTime();
    let time = Clock.formattedTime(remain);
    this.render(time);
  }

  getRemainingTime() {
    return this.limitTime - this.currentTime;
  }

  static parseSeconds(time) {
    let [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 * ONE_SECOND + seconds * ONE_SECOND;
  }
  static formattedTime(milliseconds) {
    let minutes = Math.floor(milliseconds / ONE_SECOND / 60);
    let seconds = milliseconds / ONE_SECOND % 60;
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }
}
