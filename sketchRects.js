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
  
  function draw() {
    background(255);
    noFill()  
    translate (width/2, height/2);
    rectMode(CENTER)
    let sw = 10
    strokeWeight(sw)
    stroke(0)
    let boundary = 30
    // rect(boundary,boundary,400-2*(boundary),400-2*(boundary))
    rect(0,0,(width - boundary),(height-boundary))
    strokeWeight(2)
    t_x = -0
    t_y = -0
    translate(t_x, t_y)
    drawRect(10, 0.2, 250, 250)
    
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var imgData = ctx.getImageData(0, 0, c.width, c.height);
    print(imgData.data.length)
    let stride = 4
    for (i = 0; i < 1 * width; i++) {
      imgData.data[i * stride + 0] = 255
      imgData.data[i * stride + 1] = 0
      imgData.data[i * stride + 2] = 0
    }
    ctx.putImageData(imgData, 0, 0);
  
    // for (i = 0; i < 20; i++) {
    //   console.log(imgData.data[i])
    // }
    noLoop()
  }