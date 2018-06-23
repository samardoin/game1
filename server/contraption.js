var graphs = require('./graph.js');
var unique = 0;

Part=function(){
  this.name = "";
  this.id = null;
  this.slotsMax=0;
  this.char = '';
  this.ang = null;
}
square_part=function(){
  var p = new Part();
  p.name="square_body";
  p.slotsMax=10;
  p.id=unique++;
  p.char='A';
  return  p;
}
connection2=function(){
  var p = new Part();
  p.name="connection2";
  p.slotsMax=10;
  p.id=unique++;
  p.char='B';
  return  p;
}

combine=function(p,c){
  if (p.children.length < p.data.slotsMax){
    p.children.push(c);
    c.parent=p;
    if ((p.children.length+(p.parent!=null?1:0)) == p.data.slotsMax && partialNodes[p.data.id]!=undefined){
      delete partialNodes[p.data.id];
    }
    else if (partialNodes[p.data.id]==undefined){
      partialNodes[p.data.id]=p;
    }
    if ((c.children.length+(c.parent!=null?1:0)) && partialNodes[c.data.id]!=undefined){
      delete partialNodes[c.data.id];
    }
    else if (partialNodes[c.data.id]==undefined){
      partialNodes[c.data.id]=c;
    }
  }
  else{
    console.log('Part not added because parent slotsMax reached.')
  }
}

var masterNode = new graphs.Node();
var partialNodes=[]
exports.start=function(){//example
  masterNode = getNewNode(square_part());
  masterNode.data.ang=Math.PI/2;
  combine(masterNode, getNewNode(connection2()));
  combine(masterNode, getNewNode(connection2()));
  combine(masterNode, getNewNode(connection2()));









  view_partial_Nodes();
  printDataCenter(masterNode);
  //getContraptionString(masterNode);

  return get_cords(masterNode);
}

getNewNode=function(ndata){
  var n1 = new graphs.Node();
  n1.data = ndata;
  return n1;
}

view_partial_Nodes=function(){
  partialNodes.forEach(value => {
    console.log("name:" + value.data.name + "\tid:" + value.data.id + "\tconnections:" +
    (value.children.length+(value.parent!=null?1:0)) + "/" + value.data.slotsMax);
  });
}

printDataCenter=function(masterNode){
  console.log('╗');
  var prints = [];
  graphs.updateNodes(masterNode, function(node, level){
    var s = "╟";
    for (var i = 0; i < level;i++)s+="───";
    s+=node.data.name; s+='\t'; s+=node.data.id;
    prints.push(s);
  });
  for (var i = prints.length-1; i>=0;i--){
    console.log(prints[i]);
  }
  console.log('╝');
}

getContraptionString=function(masterNode){
  var out = [];
  graphs.updateNodes(masterNode,function(node, level){
    out.push({'level':level,'char':node.data.char});
  });

  var o = "";
  var open = 0, close = 0;
  o+=out[out.length-1].char;
  for (var i = out.length-2; i>= 0;i--){
    var diff = out[i+1].level - out[i].level;
    if (diff < 0){
      while (diff != 0){open++;close--;o+="[";diff++;}
      o+=out[i].char;
    }
    else if (diff > 0){
      while (diff != 0){open--;close++;o+="]";diff--;}
      o+=out[i].char;
    }
    else {o+=out[i].char;}
  }
  while (close !=0){close++;o+="]";}
  console.log("::" + o);
}

get_cords=function(masterNode){
  var correctionsQ=[];
  var totalCorrections=[];
  var test_distance=30;
  var getXY=function(brother,number,distance,angadd,new_cn){
    number=brother-number;
    var angle = 0;
    var gx=0.0,gy=0.0;
    if (brother<=1){angle=0;}
    else if (brother==2){angle=Math.PI;}
    else if (brother%2==0) {
      angle=(((brother*2)-2)*(2*Math.PI))/(brother*2);
    }
    else {
      angle =((brother-2)*(2*Math.PI))/brother;
    }
    //angle=angle*number;
    //angle+=angadd;
    gx=distance*Math.cos(angle*(number)+angadd);
    gy=distance*Math.sin(angle*(number)+angadd);

    new_cn.data.ang = angle*(number)+angadd+Math.PI*2;

    return {x:gx,
      y:gy,
      ang:angadd+angle*(number)
    };
  }

  var newXY=function(contiguity, number, distance, new_cn){

    if (new_cn.parent != null && new_cn.parent.parent!=null){
      console.log('ADDING N')
      number++;
    }
    var angle = 0;
    if (contiguity<=1){angle=0;}
    else if (contiguity==2){angle=Math.PI;}
    else if (contiguity%2==0){//contiguity even
      angle = (((contiguity*2)-2)*(2*Math.PI))/(contiguity*2);
    }
    else {//contiguity odd
      angle =((contiguity-2)*(2*Math.PI))/contiguity;
    }


    var angadd = new_cn.parent.data.ang;
    gx=distance*Math.cos(angle*(number)+angadd);
    gy=distance*Math.sin(angle*(number)+angadd);

    new_cn.data.ang = Math.PI + angle*(number)+angadd;

    return ({x:gx,y:gy});
  }

  var contiguitys = masterNode.children.length;
  correctionsQ.push({x:0,y:0,ang:(Math.PI/2)});
  var up=function(cn, level){
    var s = "";
    for (var i = 0; i < level+1;i++){s+='  ';}
    contiguitys=cn.parent.children.length;
    if (cn.parent.parent != undefined & cn.parent.parent != null ){
      contiguitys++;
    }

    //find number
    var t = cn.parent.children;
    var number = 0;
    for (;t[number].data.id!=cn.data.id;number++);
    var angle = 0;

    angle = cn.parent.data.ang;

    correctionsQ.push(newXY(contiguitys,number,test_distance,cn))
    var fx=0.0,fy=0.0;
    for (var l = 0; l < correctionsQ.length;l++){
      fx+=correctionsQ[l].x;
      fy+=correctionsQ[l].y;
    }
    totalCorrections.push({char:cn.data.char,x:fx,y:fy});

  }
  var down=function(cn, level){
    var s = "";
    for (var i = 0; i < level+1;i++){s+='  ';}
    if (cn.parent==null){contiguitys=0;}
    else{
      contiguitys=cn.parent.children.length;
      if (cn.parent.parent != undefined & cn.parent.parent != null ){
        contiguitys++;
      }
    }
    correctionsQ.pop();
  }
  var action=function(cn, level){}
  graphs.updateNodesUpDown(masterNode,action,up,down);
  var out = [];
  for (var i = 0; i < totalCorrections.length;i++){
    var tc = totalCorrections[i];
    console.log("char:" + tc.char + "\tx:" +tc.x + "\ty:" + tc.y);
    out.push({char: tc.char, x: tc.x, y:tc.y});
  }
  out.push({char: masterNode.char, x: 0, y:0});
  return out;
}
