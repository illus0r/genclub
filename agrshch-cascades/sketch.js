let RECT;p5.disableFriendlyErrors=!0;let myShader,DEEPNESS=Math.round(3.3+9*fxrand());function preload(){myShader=loadShader("./basic.vert","./gradient.frag")}function setup(){createCanvas(windowWidth,windowHeight,WEBGL),RECT=new Rect,RECT.subdivide(),ellipseMode(CORNER),noiseSeed(1e4*fxrand())}function draw(){translate(-width/2,-height/2),background(255*C1[0],255*C1[1],255*C1[2]),myShader.setUniform("color1",C1),myShader.setUniform("color2",C2),RECT.moveKids(),RECT.draw(),fxpreview()}function keyPressed(){" "==key&&save("Cascades_"+fxhash+".jpg"),"1"==key&&pixelDensity(1),"2"==key&&pixelDensity(2),"3"==key&&pixelDensity(3),"4"==key&&pixelDensity(4),"5"==key&&pixelDensity(5),"6"==key&&pixelDensity(6),"7"==key&&pixelDensity(7),"8"==key&&pixelDensity(8),"9"==key&&pixelDensity(9)}function windowResized(){resizeCanvas(windowWidth,windowHeight),RECT.w=width,RECT.h=height}