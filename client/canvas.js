var cavas, ctx;
var cwidth,cheight;

var square_image = new Image();square_image.src='/pictures/square.png';
var triangel_image = new Image();triangel_image.src='/pictures/triangel.png';
var circle_image = new Image();circle_image.src='/pictures/circle.png';
var joint_image = new Image();joint_image.src='/pictures/joint.png';
var test_image = new Image();test_image.src='/pictures/test.png';
var bg_image = new Image();bg_image.src='/pictures/bg3.png';



let canvas_promise = new Promise((resolve, reject) => {
  window.onload=function(){//When everything is loaded, do this.
    canvas=document.getElementById('gameCanvas');
    ctx=canvas.getContext('2d');
    cwidth =canvas.width;
    cheight=canvas.height;
    colorRect(0,0,cwidth,cheight,'whiteSmoke');

    addEventListeners();

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

var drawCord_bg=function(px,py){
  ctx.save();
  ctx.translate(-px,py);
  draw_image_rotate(bg_image,0,0,0);
  ctx.drawImage(bg_image,0,0,1600,1600);
  ctx.restore();
}
//Here
var drawCord=function(e){

  var isplayer =false;
  var px=0, py=0;
  for (var i = 0; i < e.length; i++){
    if (e[i].id==socket.id){
      px=e[i].xo;
      py=e[i].yo;
      px-= canvas.width/2;
      py-=canvas.height/2;
      break;
    }
  }
  drawCord_bg(px,py);
  for (var i = 0; i < e.length; i++){
    var all = e[i].cord;
    if (e[i].id==socket.id) isplayer= true;
    //xp=e[i].xo;yp=e[i].yo;
    //ctx.translate(xp-xlp,-(yp-ylp));
    for (var j = 0; j < all.length;j++){
      var now = all[j];
      //console.log("X:" + e[i].xo + "\tY:" + e[i].yo);
      var x_correct = 0, y_correct = 0;
      x_correct+=e[i].xo-px;y_correct+=e[i].yo-py;
      //x_correct+=canvas.width/2;y_correct+=canvas.height/2;
      var size = 5;
      var im;
      var doRotate = false;

      switch(now.name){
        case ('square_body'):
          im = circle_image;
          break;
        case ('connection_2'):
          doRotate = true;
          im = joint_image;
          break;
        default:
          im = test_image;
          break;
      }

      x_correct-=im.width/2;
      y_correct+=im.height/2;
      draw_image_rotate(im, now.x+x_correct,
        canvas.height-(now.y+y_correct), (doRotate)?now.r:0);
      //
    }
  }
}

function draw_image_rotate(image, x, y, angle){
  ctx.save();
  ctx.translate(x,y);
  ctx.translate(image.width/2, image.height/2);
  ctx.rotate(angle);
  ctx.drawImage(image, -(image.width/2), -(image.height/2));
  ctx.restore();
}
