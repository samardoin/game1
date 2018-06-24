var cavas, ctx;
var cwidth,cheight;

var square_image = new Image();square_image.src='/pictures/square.png';
var triangel_image = new Image();triangel_image.src='/pictures/triangel.png';
var circle_image = new Image();circle_image.src='/pictures/circle.png';
var joint_image = new Image();joint_image.src='/pictures/joint.png';


let canvas_promise = new Promise((resolve, reject) => {
  window.onload=function(){//When everything is loaded, do this.
    canvas=document.getElementById('gameCanvas');
    ctx=canvas.getContext('2d');
    cwidth =canvas.width;
    cheight=canvas.height;
    colorRect(0,0,cwidth,cheight,'whiteSmoke');

    //drawCir(200,200,10);
    console.log('loaded');
    resolve('loaded');
  }
});

function colorRect(leftX, topY, width, height, drawColor){//Draw a rectangle
    ctx.fillStyle = drawColor;
    ctx.fillRect(leftX,topY,width,height);
}
var indx = 0;
function drawCir(x,y,r){
      var colors = ['red','pink','blue','yellow','orange','green','purple','black'];
      ctx.fillStyle=colors[indx];
      indx++; if (indx>=colors.length){indx = 0;}
      ctx.beginPath();
      ctx.arc(x,canvas.height/2-y,r,0,Math.PI * 2);
      ctx.fill();

}

var drawCord=function(e){
  var x_correct = 200, y_correct = 200;
  var size = 5;
  //console.log("x:" + e.x+x_correct + "\ty:" + e.y+y_correct + "\tsize:" + size);
  //drawCir(e.x+x_correct,e.y+y_correct, size);
  //ctx.drawImage(circle_image,e.x+x_correct,canvas.height/2 - (e.y+y_correct));
  console.log(e.r);
  draw_image_rotate(circle_image,e.x+x_correct,canvas.height/2-(e.y+y_correct),e.r);
}

function draw_image_rotate(image, x, y, angle){
  ctx.save();
  ctx.translate(x,y);
  ctx.translate(image.width/2, image.height/2);
  ctx.rotate(angle);
  ctx.drawImage(image, -(image.width/2), -(image.height/2));
  ctx.restore();
}
