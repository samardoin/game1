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

  //ctx.drawImage(square_image,100,100);
  //drawIt();
  loaded = true;
  drawCir(200,200,10);
}

function colorRect(leftX, topY, width, height, drawColor){//Draw a rectangle
    ctx.fillStyle = drawColor;
    ctx.fillRect(leftX,topY,width,height);
}
var indx = 0;
function drawCir(x,y,r){
      var colors = ['red','pink','blue','yellow','orange','green','purple','black'];
      ctx.fillStyle=colors[indx];
      if (indx==1||indx==6){
        console.log('index:' + indx + '\tx:' + x + '\ty:' + y);
      }
      indx++; if (indx>=colors.length){index = 0;}
      ctx.beginPath();
      ctx.arc(x,y,r,0,Math.PI * 2);
      ctx.fill();

}

var drawCord=function(e){
  var x_correct = 200, y_correct = 200;
  var size = 5;
  //console.log("x:" + e.x+x_correct + "\ty:" + e.y+y_correct + "\tsize:" + size);
  drawCir(e.x+x_correct,e.y+y_correct, size);

}
