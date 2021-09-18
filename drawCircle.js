function setup() {
    createCanvas(400, 400);
}

function drawCircle(numOfCircle, radius, decrease) {
    for (let i = 0; i < numOfCircle; i++) {
        circle(0, 0, radius);
        radius -= decrease;
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
    drawCircle(18, 360, 20);

    //停止draw():
    noLoop()

}