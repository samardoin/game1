var cavas, ctx;
var cwidth,cheight;
var loaded =false;

var square_image = new Image();square_image.src='/pictures/square.png';
var triangel_image = new Image();triangel_image.src='/pictures/triangel.png';

window.onload=function(){//When everything is loaded, do this.
  canvas=document.getElementById('gameCanvas');
  ctx=canvas.getContext('2d');
  cwidth =canvas.width;
  cheight=canvas.height;
  colorRect(0,0,cwidth,cheight,'whiteSmoke');

  ctx.drawImage(square_image,100,100);
  //drawIt();
  loaded = true;

}

function colorRect(leftX, topY, width, height, drawColor){//Draw a rectangle
    ctx.fillStyle = drawColor;
    ctx.fillRect(leftX,topY,width,height);
}
