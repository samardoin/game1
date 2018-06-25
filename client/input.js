var inputter=function(){
  up=false;
  down=false;
  left=false;
  right=false;
}

var input = new inputter();

function addEventListeners(){
  document.onkeydown = function(e){
    switch(e.keyCode){
      case 37://left
        //console.log('LEFT');
        input.left=true;
        break;
      case 38://up
        console.log('up');
        input.up=true;
        break;
      case 39://right
        input.right=true;
        break;
      case 40://down
        input.down=true;
        break;
      case 87:
        input.up=true;
        input.down=false;
        input.left=false;
        input.right=false;
        break;
      case 83:
        input.down=true;
        input.up=false;
        input.left=false;
        input.right=false;
        break;
      case 65:
        input.left = true;
        input.right= false;
        input.up=false;
        input.down=false;
        break;
      case 68:
        input.left=false;
        input.right=true;
        input.up=false;
        input.down=false;
        break;
      default:
        break;
    }
  }
  document.onkeyup = function(e){
    switch(e.keyCode){
      case 37://left
        input.left=false;
        break;
      case 38://up
        input.up=false;
        break;
      case 39://right
        input.right=false;
        break;
      case 40://down
        input.down=false;
        break;
      case 81:
        input.up=false;
        input.down=false;
        input.left=false;
        input.right=false;
      default:
        break;
    }
  }

}
