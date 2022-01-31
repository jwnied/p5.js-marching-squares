var field = [];
var cols,rows;
var scl=10;

var inc = 0.2;

var isolines = [[],[1],[2],[3],[5],[2,4],[6],[4],[4],[6],[1,5],[5],[3],[2],[1],[]];

var xoff=0;
var yoff=0;
var zoff=0;

function setup() {
  createCanvas(1000, 1000);
  cols = 1+floor(width/scl);
  rows = 1+floor(height/scl);
  
  for(var i=0;i<cols;i++){
    field[i]=[];
    xoff=0;
    for(var j=0;j<rows;j++){
      field[i][j]=noise(xoff,yoff);
      xoff+=inc;
    }
    yoff+=inc;
  }
}
function drawLine(v1,v2){
  line(v1.x,v1.y,v2.x,v2.y);
}
function getState(a,b,c,d){
  var aadj=floor(a*2);
  var badj=floor(b*2);
  var cadj=floor(c*2);
  var dadj=floor(d*2);
  return aadj*8 + badj*4 + cadj*2 + dadj;
}
function draw() {
  background(51);
  yoff=0;
  for(var i=0;i<cols;i++){
    xoff=0;
    for(var j=0;j<rows;j++){
      field[i][j]=noise(xoff,yoff,zoff);
      xoff+=inc;
      
      stroke(field[i][j] * 255);
      strokeWeight(4);
      point(i*scl,j*scl);
    }
    yoff+=inc;
  }
  zoff+=0.002;
  for(var i=0;i<cols-1;i++){
    for(var j=0;j<rows-1;j++){
      
      
      
      var x = i * scl;
      var y = j * scl;
      
      var amid = map(field[i][j] + field[i+1][j],0,2,0,1);
      var bmid = map(field[i+1][j] + field[i+1][j+1],0,2,0,1);
      var cmid = map(field[i+1][j+1] + field[i][j+1],0,2,0,1);
      var dmid = map(field[i][j+1] + field[i][j],0,2,0,1);
      
      //var amid = 1;
      //var bmid = 1;
      //var cmid = 1;
      //var dmid = 1;
      
      var a = createVector(x + scl * amid, y            );
      var b = createVector(x + scl      , y + scl * bmid);
      var c = createVector(x + scl * cmid, y + scl      );
      var d = createVector(x            , y + scl * dmid);
      var state = getState(field[i][j],field[i+1][j],field[i+1][j+1],field[i][j+1]);
      stroke(255);
      strokeWeight(1);
      isolines[state].forEach(function(lines) {
        switch(lines){
            case 1:
              drawLine(d,c);
              break;
            case 2:
              drawLine(b,c);
              break;
            case 3:
              drawLine(b,d);
              break;
            case 4:
              drawLine(a,d);
              break;
            case 5:
              drawLine(a,b);
              break;
            case 6:
              drawLine(a,c);
              break;
          }
      });
    }
  }
}