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
  let t_x = -50
  let t_y = -50
  translate(t_x, t_y)
  // drawPoly(x, y, 30, 3)
  let num_sides = 7
  let num_polys = 9
  let angle = PI / 18
  drawPolys(x, y, num_sides, angle, 0, num_polys, t_x, t_y, false)
  // var c = document.getElementById("myCanvas");
  // var ctx = c.getContext("2d");
  // var imgData = ctx.getImageData(0, 0, c.width, c.height);
  // for (i = (width ** 2 / 2); i < (width ** 2 / 2) + 400; i++) {
  //   imgData.data[floor(i * 4)] = 255
  //   imgData.data[floor(i * 4) + 1] = 0
  //   imgData.data[floor(i * 4) + 2] = 0
  // }
  // let sx = width / 2 + t_x
  // let sy = height / 2 + t_y
  // for (i = -10; i < 10; i++){
  //       for (j = -10; j < 10; j++) {
  //         imgData.data[round((sx + width * (sy + j) + i) * 4)] = 255
  //         imgData.data[round((sx + width * (sy + j) + i) * 4 + 1)] = 0
  //         imgData.data[round((sx + width * (sy + j) + i) * 4 + 2)] = 0
  //         console.log(sx, sy)
  //       }
  // }
  // ctx.putImageData(imgData, 0, 0);
  noLoop()
}