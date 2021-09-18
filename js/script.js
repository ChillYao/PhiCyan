let img;
let color,rgb;

function preload() {
    // preload() runs once
    img = loadImage('assets/Rhinestones.jpg');
  }

function setup() {
    pixelDensity(1)
    let canvas = createCanvas(1024, 1024);
    canvas.id("myCanvas");

    img.loadPixels();
    let pixel = img.get(); // return whole picture

    rgb = getAverageRGB(img);
    
}

function draw() {
    background(rgb);
    noFill()  

    color = quantize_color(rgb); // for mapping to shape
    console.log(color)
    
    // TODO: 根據rgb數值調控筆畫
    translate (width/2, height/2);
    rectMode(CENTER)
    let sw1 = 10
    strokeWeight(sw1)
    stroke(0)
    let boundary = 30
    rect(0,0,(width - boundary),(height-boundary))
    let sw = 2;
    strokeWeight(sw);
    drawRect(1, 0.2, 250, 250);
    
    // draw Polys系列
    let num_sides;
    if (color == "Black"){
        //十二邊形
        num_sides = 12 
        let x = 0
        let y = 0
        let t_x = -50
        let t_y = -50
        translate(t_x, t_y)
        let num_polys = 9 // TODO: numPolys根據rgb調控密度
        let angle = PI / 18
        drawPolys(x, y, num_sides, angle, 0, num_polys, t_x, t_y, false)
        noLoop()
    }
    else if (color == "Red"){
        //正方形
        num_sides = 4 
        let x = 0
        let y = 0
        let t_x = -50
        let t_y = -50
        translate(t_x, t_y)
        let num_polys = 9 // TODO: numPolys根據rgb調控密度
        let angle = PI / 18
        drawPolys(x, y, num_sides, angle, 0, num_polys, t_x, t_y, false)
        noLoop()
    }
    else if (color == "Yellow"){
        //三角形
        num_sides = 3 
        let x = 0
        let y = 0
        let t_x = -50
        let t_y = -50
        translate(t_x, t_y)
        let num_polys = 9 // TODO: numPolys根據rgb調控密度
        let angle = PI / 18
        drawPolys(x, y, num_sides, angle, 0, num_polys, t_x, t_y, false)
        noLoop()
    }
    else if (color == "Green"){
        //五邊形
        num_sides = 5 
        let x = 0
        let y = 0
        let t_x = -50
        let t_y = -50
        translate(t_x, t_y)
        let num_polys = 9 // TODO: numPolys根據rgb調控密度
        let angle = PI / 18
        drawPolys(x, y, num_sides, angle, 0, num_polys, t_x, t_y, false)
        noLoop()
    }
    else if (color == "Cyan"){
        //六邊形
        num_sides = 6 
        let x = 0
        let y = 0
        let t_x = -50
        let t_y = -50
        translate(t_x, t_y)
        let num_polys = 9 // TODO: numPolys根據rgb調控密度
        let angle = PI / 18
        drawPolys(x, y, num_sides, angle, 0, num_polys, t_x, t_y, false)
        noLoop()
    }
    else if (color =="Magenta"){
        //十邊形
        num_sides = 10 
        let x = 0
        let y = 0
        let t_x = -50
        let t_y = -50
        translate(t_x, t_y)
        let num_polys = 9 // TODO: numPolys根據rgb調控密度
        let angle = PI / 18
        drawPolys(x, y, num_sides, angle, 0, num_polys, t_x, t_y, false)
        noLoop()
    }
    else if (color == "Blue"){
        //圓形 parameters: numOfCircle, radius, decrease_rate
        drawCircle(18, 360, 0.1); // TODO:根據rgb調控
        noLoop()
    }
    else if (color == "White"){
        //畫菱形
        let x = 0
        let y = 0
        let t_x = -0
        let t_y = -0
        translate(t_x, t_y)
        let angle = PI / 18
        drawRhombuses(x, y, angle, 0, 5, t_x, t_y, true)
        noLoop()
    }
}
    

function getAverageRGB(img) {
    var blockSize = 5, // only visit every 5 pixels
    defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
    data,
    i = -4,
    length,
    rgb = {r:0,g:0,b:0},
    count = 0;

    var data = context.getImageData(0, 0, img.width, img.height);

    if (!context) {
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    return rgb;

}

function quantize_color(rgb){
    color = [rgb.r,rgb.g,rgb.b]
    if (color[0]<128&&color[1]<128&&color[2]<128){
        return "Black"
    }
    else if (color[0]>=128&&color[1]<128&&color[2]<128){
        return "Red"  
    }
    else if (color[0]<128&&color[1]>=128&&color[2]<128){
        return "Green"
    }
    else if (color[0]<128&&color[1]<128&&color[2]>=128){
        return "Blue" 
    }
    else if (color[0]>=128&&color[1]>=128&&color[2]<128){
        return "Yellow"
    }
    else if (color[0]>=128&&color[1]<128&&color[2]>=128){
        return "Magenta"
    }
    else if (color[0]<128&&color[1]>=128&&color[2]>=128){
        return "Cyan"
    }
    else if (color[0]>=128&&color[1]>=128&&color[2]>=128){
        return "White"
    }
}

//畫邊框正方形
function drawRect(numberRects, displacement_f, x,y){
  rect(0,0,x, y)
  if (numberRects <= 1) {
    return
  }
  else {
    
  let length_ratio = sqrt(displacement_f ** 2 + (1-displacement_f)**2)
    rotate(Math.atan(displacement_f / (1-displacement_f)))
    drawRect(numberRects-1, displacement_f, x * length_ratio, y * length_ratio)
  }
}
  
function colorCheck(x, y, radius, npoints, rot, t_x, t_y, draw_dots) {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var imgData = ctx.getImageData(0, 0, c.width, c.height);

  let angle = TWO_PI / npoints
  for (let a = 0; a < TWO_PI; a += angle) {
    // let sx = x + cos(a) * radius + width / 2;
    // let sy = y + sin(a) * radius + height / 2;
    
    let sx = round(x + cos(a + rot) * radius + width / 2 + t_x);
    let sy = round(y + sin(a + rot) * radius + height / 2 + t_y);
    // print(sx, sy)
    let c1 = imgData.data[round((sx + width * sy) * 4)]
    let c2 = imgData.data[round((sx + width * sy) * 4 + 1)]
    let c3 = imgData.data[round((sx + width * sy) * 4 + 2)]
    let c4 = imgData.data[round((sx + width * sy) * 4 + 3)]
    // console.log(c1, c2, c3, c4)
    if ((c1 < 255 || c2 < 255 || c3 < 255) && c4 > 0) {
      if (draw_dots) {
        let sl = 5
        for (k = -sl; k < sl; k++){
          for (j = -sl; j < sl; j++) {
            imgData.data[round((sx + width * (sy + j) + k) * 4)] = 255
            imgData.data[round((sx + width * (sy + j) + k) * 4 + 1)] = 0
            imgData.data[round((sx + width * (sy + j) + k) * 4 + 2)] = 0
          }
        }
      }
      
      
      ctx.putImageData(imgData, 0, 0);
      // print(radius)
      return true;
    }
  }
  return false;
}

//畫多邊形
function drawPoly(x, y, radius, npoints) {
  print(radius)
  let angle = TWO_PI / npoints;
  // noFill();
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawPolys(x, y, npoints, rot, numRot, numPolys, t_x, t_y, draw_dots) {
  for (i = 1; i < width; i++) {
    if (colorCheck(x, y, i, npoints, rot * numRot, t_x, t_y, draw_dots)) {
      
      // rotate(rot)
      drawPoly(x, y, i, npoints)
      
      if (numPolys > 1) {
        rotate(rot)
        drawPolys(x, y, npoints, rot, numRot + 1, numPolys - 1, t_x, t_y)
      }
      return;
    }
  }
}

//畫圓形
function drawCircle(numOfCircle, radius, decrease_rate) {
    for (let i = 0; i < numOfCircle; i++) {
        circle(0, 0, radius);
        radius -= radius * decrease_rate;
    }
}

//畫菱形
function drawRhombus(x, y, r1, r2) {
    let angle = TWO_PI / 4;
    beginShape();
    let a = 0
    vertex(x + cos(a) * r1, y + sin(a) * r1);
    a += angle
    vertex(x + cos(a) * r2, y + sin(a) * r2);
    a += angle
    vertex(x + cos(a) * r1, y + sin(a) * r1);
    a += angle
    vertex(x + cos(a) * r2, y + sin(a) * r2);
    
    endShape(CLOSE);
  }
    
  function drawRhombuses(x, y, rot, numRot, numRhombus, t_x, t_y, draw_dots) {
    for (i = 2; i < width; i+=2) {
      if (colorCheck(x, y, i, i / 2, rot * numRot, t_x, t_y, draw_dots)) {
        
        // rotate(rot)
        drawRhombus(x, y, i, i/2)
        
        if (numRhombus > 1) {
          rotate(rot)
          drawRhombuses(x, y, rot, numRot + 1, numRhombus - 1, t_x, t_y, draw_dots)
        }
        return;
      }
    }
}