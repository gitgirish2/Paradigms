function Direction(dirString){
  var allDirections = {
    'N' : ['W', 'E', (x, y) => [x, y + 1]],
    'E' : ['N', 'S', (x, y) => [x + 1, y]],
    'W' : ['S', 'N', (x, y) => [x - 1, y]],
    'S' : ['E', 'W', (x, y) => [x, y - 1]]
  };  
  
  var direction = allDirections[dirString];
  this.left = () => direction[0];
  this.right = () => direction[1];
  this.forward = (x, y) => direction[2](x, y);
  this.toString = () => dirString;
};

function Vector(x, y, direction) {
  this.turnLeft = () => new Vector(x, y, new Direction(direction.left()));
  this.turnRight = () => new Vector(x, y, new Direction(direction.right()));
  this.moveForward = function() {
    var [newx, newy] = direction.forward(x, y);
    return new Vector(newx, newy, direction);
  };
  this.toString = () => x + " " + y + " " + direction.toString();
};

function MarsRover (x, y, direction) {
  var vector = new Vector(x, y, new Direction(direction));
  
  this.rove = function(command) {
    if (command === 'M') {
      vector = vector.moveForward();
    } else if (command === 'L') {
      vector = vector.turnLeft();  
    } else if (command === 'R') {
      vector = vector.turnRight();  
    }
    return this;
  };
  this.toString = () => vector.toString()
};

var rover = new MarsRover(3, 3, new Direction('E'));
console.info(rover.rove('M').rove('R').rove('M').rove('L').toString());