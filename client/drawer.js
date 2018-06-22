var graphstring = "[A[BB[AA]B]]";

var drawIt=function(){
  var cx = 200, cy = 200;
  var x = 0,y=0;
  function getX(){return x+cx;}
  function getY(){return x+cy;}

  var distance = 20;

  ctx.drawImage(square_image,getX(),getY());
  var shape = 0;
  var corrections=[];
  var currentX=0,currentY=0;

  var getShape=function(str, indx){
    //var pattern = /\[[^\[\]]*\]/;
    var open=1;indx++;
    var endindex = indx;
    var out = 0;
    while (open != 0){
      if(str.charAt(endindex)==']'){open--;}
      else if (str.charAt(endindex)=='['){open++;}
      else if (open==1){out++;}
      endindex++;
    }
    return out;
  }

  var getAngle=function(n){
    if (n <= 1)return 0;
    else {return ((n-2)*Math.PI)/n;}
  }
  var drawPart=function(charID, px, py){
    colorRect(cx+px,cy+py,10,10,'red');
    console.log("Drawing at:" + px + "\t" + py);
  }

  var editString=graphstring;
  var partNumber = 0;
  for (var i = 0 ; i < editString.length;i++){
    if (editString.charAt(i)=='['){

      shape = getShape(editString, i);
      //console.log(shape);
    }
    else if (editString.charAt(i)==']'){
      //draw everthing in group
      //delete group
      //pop corrections
      var shapeX = 0; var shapeY = 0;
      for (var k = 0; k < corrections.length;k++){
        shapeX+=corrections[k].x;
        shapeY+=corrections[k].y;
      }
      var end = i;
      var start = end;
      for (;editString.charAt(start)!='[';start--);
      console.log("string:" + editString + "\tstart:"  + start + "\tend:" + end);
      var actionString = editString.substring(start+1,end);
      var tempString = editString.substring(0, start);
      tempString += editString.substring(end+1);
      editString=tempString;
      console.log("tempString:" + tempString + "\tactionString:" + actionString);

      var newShape = actionString.length;
      for (var k = 0; k < actionString.length;k++){
        //one more add to shapeX
        drawPart(actionString.charAt(k),shapeX+(distance * Math.cos(2*theta)),
         shapeY+(distance * Math.sin(2*theta)));
      }
      i=i-1-actionString.length;
      corrections.pop();

    }
    else {//if a letter
      var theta = getAngle(shape) * partNumber;
      var tx = distance * Math.cos(2*theta);
      var ty = distance * Math.sin(2*theta);
      console.log("tx:" + tx + "\tty:" + ty + "\ttheta:" + theta + "\tshape:" + shape);
      corrections.push({x:tx,y:ty});
      partNumber++//end
    }

  }
}
