function setup() {
    createCanvas(400, 400);
  }
    
  function drawRect(numberRects, displacement_f, x,y){
    
    // console.log(Math.atan(displacement_f / (1-displacement_f)))
    
    rect(0,0,x, y)
    if (numberRects <= 1) {
      return
    }
    else {
      
    let length_ratio = sqrt(displacement_f ** 2 + (1-displacement_f)**2)
    // console.log(length_ratio)
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
    drawRect(15, 0.15, 250, 250)
    noLoop()
    // rect(0, 0, 100, 100);
    // strokeWeight(2)
    // rotate(PI / 12.0);
    // rect(100, 100, 50, 50)
    // triangle(a1, a2, b1, b2, c1, c2)
    // console.log(mouseX, mouseY)
    
  }