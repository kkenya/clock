import Clock from './clock';

class StopWatch extends Clock {
  constructor(ctx, cx, cy, w, h) {
    super(ctx, cx, cy, w, h);
    this.circle.color = "rgb(38, 38, 38)"; //内側の色
    this.circle.lineColor = "rgb(86, 99, 143)"; //縁の色
    this.circle.lineWidth = 0.03;
    this.hands.minute = {
      width: 0.6,
      height: 0.03,
      color: "rgb(0, 255, 65)"
    };
    this.hands.second = {
      width: 0.7,
      height: 0.03,
      color: "rgb(0, 255, 65)"
    };
    this.startTime = 0;
    this.saved = 0;
    this.stopFlag = true;
  }

  start() {
    this.stopFlag = false;
    this.startTime = new Date;
  }

  stop() {
    this.stopFlag = true;
  const endTime = new Date;
  //経過時間(millisecond) = 終了時間 - 開始時間
  this.saved += endTime - this.startTime;
}

reset() {
  this.stopFlag = true;
  this.saved = 0;
}

getTime() {
  let time;
  const now = new Date();
  if (this.stopFlag) {
    time = this.saved;
  } else {
    // 保存された時間 + 開始時間から現在時間までの差
    time = this.saved + (now - this.startTime);
  }
  return time / 1000; // secondに変換
}

draw() {
  this.ctx.clearRect(
    this.circle.center.x - this.circle.width / 2,
    this.circle.center.y - this.circle.height / 2,
    this.circle.width,
    this.circle.height
  );
  this.drawBase();

  const time = this.getTime();
  this.drawHand(
    (time % 60) / 60 * 360,
    this.hands.second
  ); // sec.mill
  this.drawHand(
    Math.floor(time / 60) / 60 * 360,
    this.hands.minute
  ); //minute
};
}

// "use strict";
// function StopWatch(ctx, cx, cy, w, h) {
//   Clock.call(this, ctx, cx, cy, w, h);
//   this.circle.color = "rgb(38, 38, 38)"; //内側の色
//   this.circle.lineColor = "rgb(86, 99, 143)"; //縁の色
//   this.circle.lineWidth = 0.03;
//   this.hands.minute = {
//     width: 0.6,
//     height: 0.03,
//     color: "rgb(0, 255, 65)"
//   };
//   this.hands.second = {
//     width: 0.7,
//     height: 0.03,
//     color: "rgb(0, 255, 65)"
//   };
//   this.startTime = 0;
//   this.saved = 0;
//   this.stopFlag = true;
// }

// StopWatch.prototype = Object.create(Clock.prototype, {
//   constructor: {
//     configurable: true,
//     enumerable: false,
//     value: Clock,
//     writable: true
//   }
// });

// StopWatch.prototype.start = function () {
//   this.stopFlag = false;
//   this.startTime = new Date;
// };
// StopWatch.prototype.stop = function () {
//   this.stopFlag = true;
//   const endTime = new Date;
//   //経過時間(millisecond) = 終了時間 - 開始時間
//   this.saved += endTime - this.startTime;
// };
// StopWatch.prototype.reset = function () {
//   this.stopFlag = true;
//   this.saved = 0;
// };
// StopWatch.prototype.getTime = function () {
//   let time;
//   const now = new Date();
//   if (this.stopFlag) {
//     time = this.saved;
//   } else {
//     // 保存された時間 + 開始時間から現在時間までの差
//     time = this.saved + (now - this.startTime);
//   }
//   return time / 1000; // secondに変換
// };
// StopWatch.prototype.draw = function () {
//   this.ctx.clearRect(
//     this.circle.center.x - this.circle.width / 2,
//     this.circle.center.y - this.circle.height / 2,
//     this.circle.width,
//     this.circle.height
//   );
//   Clock.prototype.drawBase.call(this);
//   const time = this.getTime();
//   Clock.prototype.drawHand.call(
//     this,
//     (time % 60) / 60 * 360,
//     this.hands.second
//   ); // sec.mill
//   Clock.prototype.drawHand.call(
//     this,
//     Math.floor(time / 60) / 60 * 360,
//     this.hands.minute
//   ); //minute
// };

export default StopWatch;