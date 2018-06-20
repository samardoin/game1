var graphs = require('./graph.js');


var unique = 0;

Part=function(){
  this.name = "";
  this.id = null;
  this.slotsMax=0;
}
square_part=function(){
  var p = new Part();
  p.name="square_body";
  p.slotsMax=4;
  p.id=unique++;
  return  p;
}
connection2=function(){
  var p = new Part();
  p.name="connection2";
  p.slotsMax=2;
  p.id=unique++;
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
  combine(masterNode, getNewNode(connection2()));
  combine(masterNode, getNewNode(connection2()));
  combine(masterNode, getNewNode(connection2()));
  combine(masterNode, getNewNode(connection2()));
  combine(partialNodes[1], getNewNode(square_part()));
  view_partial_Nodes();
  printDataCenter(masterNode);

  //combine(masterNode,((new graphs.Node).data=connection2()));
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
