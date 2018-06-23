var graphs = require('./graph.js');
var parts = require('./parts.js');
var unique = 0;

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
    try{
      throw 'Part not added because parent slotsMax reached.';
    }catch(e){
      console.log(e);
    }
  }
}

var masterNode = new graphs.Node();
var partialNodes=[];

exports.start=function(){//example
  masterNode = parts.getNewNode(parts.square_part());
  masterNode.data.ang=Math.PI/2;
  combine(masterNode, parts.getNewNode(parts.connection_2()));
  combine(masterNode, parts.getNewNode(parts.connection_2()));
  combine(masterNode, parts.getNewNode(parts.connection_2()));

  combine(partialNodes[2], parts.getNewNode(parts.connection_2()));
  combine(partialNodes[2], parts.getNewNode(parts.connection_2()));
  combine(partialNodes[2], parts.getNewNode(parts.connection_2()));


  //printPartialNodes();
  //printContraptionCenter();

  return get_cords(masterNode);
}
//prints the list of partial Nodes
printPartialNodes=function(){
  partialNodes.forEach(value => {
    console.log("name:" + value.data.name + "\tid:" + value.data.id + "\tconnections:" +
    (value.children.length+(value.parent!=null?1:0)) + "/" + value.data.slotsMax);
  });
}

//prints the contraption
printContraptionCenter=function(){
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

//converts the graph into cartesian coordinates
get_cords=function(){
  var correctionsQ=[];
  var totalCorrections=[];
  var test_distance=30;

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
    contiguitys=cn.parent.children.length;
    if (cn.parent != null && cn.parent.parent != null){
      contiguitys++;
    }
    //find number
    var t = cn.parent.children;
    var number = 0;
    for (;t[number].data.id!=cn.data.id;number++);
    correctionsQ.push(newXY(contiguitys,number,test_distance,cn))
    var fx=0.0,fy=0.0;
    for (var l = 0; l < correctionsQ.length;l++){
      fx+=correctionsQ[l].x;
      fy+=correctionsQ[l].y;
    }
    totalCorrections.push({name:cn.data.name+",",x:fx,y:fy});

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
    console.log("name:" + tc.name + "\tx:" +tc.x + "\ty:" + tc.y);
    out.push({name: tc.name, x: tc.x, y:tc.y});
  }
  out.push({name: masterNode.name, x: 0, y:0});
  return out;
}
