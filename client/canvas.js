var cavas, ctx;
var cwidth,cheight;
var loaded =false;

window.onload=function(){//When everything is loaded, do this.
  canvas=document.getElementById('gameCanvas');
  ctx=canvas.getContext('2d');
  cwidth =canvas.width;
  cheight=canvas.height;
  colorRect(0,0,cwidth,cheight,'whiteSmoke');
  loaded = true;

}

function colorRect(leftX, topY, width, height, drawColor){//Draw a rectangle
    ctx.fillStyle = drawColor;
    ctx.fillRect(leftX,topY,width,height);
}
