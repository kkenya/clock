import Clock from './clock';
import StopWatch from './stopWatch';
import './style.css';

window.onload = function () {
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  const resetButton = document.getElementById("reset");
  const display = document.getElementById("display");
  let time = 0;
  startButton.onclick = start; //関数オブジェクトへの参照を代入
  resetButton.onclick = reset;

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const clock = new Clock(ctx, 150, 150, 300, 300);
  const stopWatch = new StopWatch(ctx, 200, 400, 150, 150);

  setInterval(function () {
    clock.draw();
    stopWatch.draw();
    time = stopWatch.getTime();
    display.innerHTML = Math.floor(time / 60) + " min "
      + (time % 60).toFixed(1) + " sec";
  }, 100);

  function start() {
    startButton.onclick = null;
    stopButton.onclick = stop;
    resetButton.onclick = reset;
    stopWatch.start();
  }

  function stop() {
    startButton.onclick = start;
    stopButton.onclick = null;
    resetButton.onclick = reset;
    stopWatch.stop();
  }

  function reset() {
    startButton.onclick = start;
    stopButton.onclick = null;
    resetButton.onclick = null;
    stopWatch.reset();
  }
};