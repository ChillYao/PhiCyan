let sw = 2;

function setup() {
  pixelDensity(1)
  let canvas = createCanvas(400, 400);
  canvas.id("myCanvas");
}

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

function colorCheck(x, y, r1, r2, rot, t_x, t_y, draw_dots) {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var imgData = ctx.getImageData(0, 0, c.width, c.height);

  let angle = TWO_PI / 4;
  let a = 0;
  let sx = []
  let sy = []
  sx1 = round(x + cos(a + rot) * r1 + width / 2 + t_x);
  sy1 = round(y + sin(a + rot) * r1 + width / 2 + t_y);
  sx[0] = sx1
  sy[0] = sy1
  a += angle
  sx1 = round(x + cos(a + rot) * r2 + width / 2 + t_x);
  sy1 = round(y + sin(a + rot) * r2 + width / 2 + t_y);
  sx[1] = sx1
  sy[1] = sy1
  a += angle
  sx1 = round(x + cos(a + rot) * r1 + width / 2 + t_x);
  sy1 = round(y + sin(a + rot) * r1 + width / 2 + t_y);
  sx[2] = sx1
  sy[2] = sy1
  a += angle
  sx1 = round(x + cos(a + rot) * r2 + width / 2 + t_x);
  sy1 = round(y + sin(a + rot) * r2 + width / 2 + t_y);
  sx[3] = sx1
  sy[3] = sy1
  
  for (let a = 0; a < 4; a += 1) {
    // let sx = x + cos(a) * radius + width / 2;
    // let sy = y + sin(a) * radius + height / 2;
    
    let c1 = imgData.data[round((sx[a] + width * sy[a]) * 4)]
    let c2 = imgData.data[round((sx[a] + width * sy[a]) * 4 + 1)]
    let c3 = imgData.data[round((sx[a] + width * sy[a]) * 4 + 2)]
    let c4 = imgData.data[round((sx[a] + width * sy[a]) * 4 + 3)]
    // console.log(c1, c2, c3, c4)
    if ((c1 < 255 || c2 < 255 || c3 < 255) && c4 > 0) {
      if (draw_dots) {
        let sl = 5
        for (k = -sl; k < sl; k++){
          for (j = -sl; j < sl; j++) {
            imgData.data[round((sx + width * (sy + j) + k) * 4)] = 255
            imgData.data[round((sx + width * (sy + j) + k) * 4 + 1)] = 0
            imgData.data[round((sx + width * (sy + j) + k) * 4 + 2)] = 0
            // console.log(sx, sy)
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
  
function draw() {
  background(255);
  noFill()  
  translate (width/2, height/2);
  rectMode(CENTER)
  let sw1 = 10
  strokeWeight(sw1)
  stroke(0)
  let boundary = 30
  // rect(boundary,boundary,400-2*(boundary),400-2*(boundary))
  rect(0,0,(width - boundary),(height-boundary))
  strokeWeight(sw);
  drawRect(1, 0.2, 250, 250);
  // rotate(PI / 2)
  // drawPoly(0, 0, 124, 3)
  // rect(0, 0, 20, 20)
  let x = 0
  let y = 0
  let t_x = -0
  let t_y = -0
  translate(t_x, t_y)
  let num_sides = 7
  let num_polys = 9
  let r1 = 70;
  let r2 = r1 / 2;
  // drawRhombus(x, y, r1, r2)
  let angle = PI / 18
  drawRhombuses(x, y, angle, 0, 5, t_x, t_y, true)
  noLoop()
}