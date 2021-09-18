function setup() {
  createCanvas(400, 400);
}

function drawRect(numberRects, displacement_f, x, y) {
  //画内部矩形：
  rect(0, 0, x, y)
  //如果最后一个矩形，返回：
  if (numberRects <= 1) {
    return
  }
  else {
    //通过偏离度算出下一个内部矩形的边长比例：
    let length_ratio = sqrt(displacement_f ** 2 + (1 - displacement_f) ** 2)
    //旋转相应的角度：
    rotate(Math.atan(displacement_f / (1 - displacement_f)))
    //递归画出下一个矩形：
    drawRect(numberRects - 1, displacement_f, x * length_ratio, y * length_ratio)
  }
}

function draw() {
  //全白背景：
  background(255);
  //禁用填充：
  noFill();
  //设置绘图中心：
  translate(width / 2, height / 2);
  //将 rect() 的前两个参数解读成形状的中心点，而第三和第四个参数为宽度和高度：
  rectMode(CENTER);
  let sw = 10;
  //设置画笔粗细：
  strokeWeight(sw);
  //设置形状的外形线色：
  stroke(0);
  let boundary = 30;
  //画边框：
  rect(0, 0, (width - boundary), (height - boundary));
  //设置画笔粗细：
  strokeWeight(2);
  //画出内部的图形：
  drawRect(15, 0.3, 250, 250);
  //停止draw():
  noLoop();

}