class Clock {
  constructor(ctx, cx, cy, w, h) {
    this.circle = {
      center: {
        x: 0,
        y: 0
      },
      width: 0,
      height: 0,
      radius: 0,
      rate: 0.9, //円の半径の比率
      color: "rgb(250, 250, 250)", //内側の色
      lineColor: "black", //縁の色
      lineWidth: 0.02,
      axis: 0.04 //中心の軸の半径に対する比率
    };
    this.hands = {
      hour: {
        width: 0.6, //半径との比率で表示
        height: 0.04, //半径との比率で表示
        color: "rgb(38, 38, 38)"
      },
      minute: {
        width: 0.9,
        height: 0.02,
        color: "rgb(38, 38, 38)"
      },
      second: {
        width: 0.9,
        height: 0.02,
        color: "rgb(229, 69, 0)"
      },
    };
    this.figure = {
      distance: 0.9,
      align: "center",
      position: "middle",
      fontSize: 0.1,
      color: "rgb(0, 0, 0)",
      sub: 0.01
    };
    this.ctx = ctx;
    this.circle.center.x = cx;
    this.circle.center.y = cy;
    this.circle.width = w;
    this.circle.height = h;
    this.circle.radius = this.circle.width / 2 * this.circle.rate;
  }

  getNow() {
    const now = new Date();
    this.hour = now.getHours() % 12;
    this.min = now.getMinutes();
    this.sec = now.getSeconds();
    this.mill = now.getMilliseconds();
  }

  drawBase(ctx) {
    this.ctx.save();
    //時計の内側
    this.ctx.fillStyle = this.circle.color;
    this.ctx.beginPath();
    this.ctx.arc(this.circle.center.x, this.circle.center.y, this.circle.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.restore();

    this.ctx.save();
    //時計の縁
    this.ctx.strokeStyle = this.circle.lineColor;
    this.ctx.lineWidth = this.circle.radius * this.circle.lineWidth;
    this.ctx.beginPath();
    this.ctx.arc(this.circle.center.x, this.circle.center.y, this.circle.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawFigure() {
    this.ctx.save();
    //文字の描画
    this.ctx.font = this.figure.fontSize * this.circle.radius + "px 'sans-serif'";
    this.ctx.textAlign = this.figure.align;
    this.ctx.fillStyle = this.figure.color;
    this.ctx.textBaseline = this.figure.position;
    for (let i = 0; i < 12; i++) {
      let rad = i * Math.PI / 6;
      let x = this.circle.center.x + this.circle.radius * this.figure.distance * Math.sin(rad);
      let y = this.circle.center.y - this.circle.radius * this.figure.distance * Math.cos(rad);
      let fig = "" + i == 0 ? 12 : i;
      this.ctx.fillText(fig, x, y);
    }
    //文字と文字の間の点の描画
    for (let i = 0; i < 60; i++) {
      if (!(i % 5 == 0)) {
        this.ctx.beginPath();
        let rad = i * Math.PI / 30;
        let x = this.circle.center.x + this.circle.radius * this.figure.distance * Math.sin(rad);
        let y = this.circle.center.y - this.circle.radius * this.figure.distance * Math.cos(rad);
        this.ctx.arc(x, y, this.circle.radius * this.figure.sub, 0, 2 * Math.PI);
        this.ctx.fill();
      }
    }
    this.ctx.restore();
  }

  drawHand(deg, obj) {
    this.ctx.save();
    this.ctx.translate(this.circle.center.x, this.circle.center.y); //中心点に移動
    deg -= 90;
    const rad = deg * Math.PI / 180;
    this.ctx.rotate(rad);
    this.ctx.fillStyle = obj.color;
    //針の中心を合わせる(x, y, 長辺, 短辺)
    this.ctx.fillRect(
      0,
      - this.circle.radius * obj.height / 2,
      this.circle.radius * obj.width,
      this.circle.radius * obj.height
    )

    if (obj == this.hands.second) {//秒針は反対にも針を伸ばし、中心の軸を書く
      this.ctx.fillRect(
        0,
        - this.circle.radius * obj.height / 2,
        - this.circle.radius * obj.width / 6,
        this.circle.radius * obj.height
      );
      //中心の軸を描画 (x, y, radius, startAngle, endAngle, anticlockwise)
      this.ctx.beginPath();
      this.ctx.arc(0, 0, this.circle.radius * this.circle.axis, 0, 2 * Math.PI);
      this.ctx.fill();
    }
    this.ctx.restore();
  }
  draw() {
    this.ctx.clearRect(
      this.circle.center.x - this.circle.width / 2,
      this.circle.center.y - this.circle.height / 2,
      this.circle.width,
      this.circle.height
    );
    this.drawBase();
    this.drawFigure();
    this.getNow();
    this.drawHand((this.hour + this.min / 60) / 12 * 360, this.hands.hour);
    this.drawHand(this.min / 60 * 360, this.hands.minute);
    this.drawHand((this.sec + this.mill / 1000) / 60 * 360, this.hands.second);
  }
}

export default Clock;