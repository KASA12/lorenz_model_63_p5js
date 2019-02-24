let pg = null;
const MAX_STEP = 100000;
const dt = 0.01;

//define parameters
const b = 8.0 / 3.0
const r = 28.0 //case1
//const r=14.0 //case2
//r=1.0 //case3
const s = 10.0

//define matrix
const xt = [];
const yt = [];
const zt = [];


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  smooth();
  
  pg = createGraphics(windowWidth, windowHeight);

  //define initial
  xt[0] = 5.0;
  yt[0] = -5.0;
  zt[0] = 25.0;
}

function draw() {
  orbitControl();
  background(220, 90, 20, 100);
  frameRate(60);

  //更新
  xt.push(xt.slice(-1)[0] - s * (xt.slice(-1)[0] - yt.slice(-1)[0]) * dt);
  yt.push(yt.slice(-1)[0] + (-yt.slice(-1)[0] - xt.slice(-1)[0] * zt.slice(-1)[0] + r * xt.slice(-1)[0]) * dt);
  zt.push(zt.slice(-1)[0] + (xt.slice(-1)[0] * yt.slice(-1)[0] - b * zt.slice(-1)[0]) * dt);

  //点
  push();
  beginShape(POINTS);
  stroke(220, 10, 100, 100);
  strokeWeight(3);
  for (let i = 0; i < xt.length; i++){
    vertex(xt[i] * 10, yt[i] * 10, zt[i] * 10);
  }
  endShape(CLOSE);
  pop();

  //軸
  push();
  fill(220, 10, 50, 30);
  strokeWeight(0.5);
  line(-windowWidth / 2, 0, 0, windowWidth / 2, 0, 0);
  rotateZ(PI / 2);
  line(-windowHeight / 2, 0, 0, windowHeight / 2, 0, 0);
  rotateY(PI / 2);
  line(-windowHeight / 2, 0, 0, windowHeight / 2, 0, 0);
  pop();

  //テクスト
  push();
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.smooth();
  pg.clear();
  pg.fill(220, 10, 100, 100);
  pg.textSize(32);
  pg.textFont('Helvetica');
  pg.text("Lorenz Model 63", 100, 100);
  pg.textSize(16);
  pg.text("X : " + Number(xt.slice(-1)).toFixed(2), 100, 150);
  pg.text("Y : " + Number(yt.slice(-1)).toFixed(2), 100, 170);
  pg.text("Z : " + Number(zt.slice(-1)).toFixed(2), 100, 190);
  texture(pg);
  plane(windowWidth, windowHeight);
  pop();
}

function touchMoved() {
  return false;
}