function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var gameOfLife = {};

gameOfLife.initialize = function initialize() {
  var w = window.innerWidth - window.innerWidth % 10;
  var h = window.innerHeight - window.innerHeight % 10;
  var plane = document.getElementsByClassName('plane')[0];
  plane.setAttribute('width', w);
  plane.setAttribute('height', h);
  var matrix = gameOfLife.createMatrix(h / 10, w / 10);
  gameOfLife.seedMatrix(matrix);
  gameOfLife.drawPlane(matrix);
  setInterval(gameOfLife.nextStateOfPlane, 100, matrix);
};

gameOfLife.createMatrix = function createMatrix(x, y) {
  var matrix = [];
  for (var i = 0; i < x; i++) {
    var row = [];
    for (var j = 0; j < y; j++) {
      row[j] = 0;
    }
    matrix[i] = row;
  }
  return matrix;
};

gameOfLife.seedMatrix = function seedMatrix(matrix) {
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[0].length; j++) {
      matrix[i][j] = getRandomIntInclusive(0, 1);
    }
  }
};

gameOfLife.nextStateOfPlane = function nextStateOfPlane(matrix) {
  var changes = [];
  var y = matrix.length;
  var x = matrix[0].length;
  for (var i = 0; i < y; i++) {
    for (var j = 0; j < x; j++) {
      var countLiveNeighbours = 0;

      if (matrix[i >= 1 ? i - 1 :  y - 1][j >= 1 ? j - 1 : x - 1] === 1) {
        countLiveNeighbours++;
      }
      if (matrix[i >= 1 ? i - 1 :  y - 1][j] === 1) {
        countLiveNeighbours++;
      }
      if (matrix[i >= 1 ? i - 1 :  y - 1][j < x - 1 ? j + 1 : 0] === 1) {
        countLiveNeighbours++;
      }
      if (matrix[i][j >= 1 ? j - 1 : x - 1] === 1) {
        countLiveNeighbours++;
      }
      if (matrix[i][j < x - 1 ? j + 1 : 0] === 1) {
        countLiveNeighbours++;
      }
      if (matrix[i < y - 1 ? i + 1 : 0][j >= 1 ? j - 1 : x - 1] === 1) {
        countLiveNeighbours++;
      }
      if (matrix[i < y - 1 ? i + 1 : 0][j] === 1) {
        countLiveNeighbours++;
      }
      if (matrix[i < y - 1 ? i + 1 : 0][j < x - 1 ? j + 1 : 0] === 1) {
        countLiveNeighbours++;
      }

      if (matrix[i][j] === 1) {
        if (countLiveNeighbours < 2 || countLiveNeighbours > 3) {
          changes.push([i, j, 0]);
        }
      } else if (matrix[i][j] === 0) {
        if (countLiveNeighbours === 3) {
          changes.push([i, j, 1]);
        }
      }
    }
  }
  for (var k = 0; k < changes.length; k++) {
    matrix[changes[k][0]][changes[k][1]] = changes[k][2];
  }
  gameOfLife.applyChangesToPlane(matrix);
};

gameOfLife.drawPlane = function drawPlane(matrix) {
  var plane = document.getElementsByClassName('plane')[0];
  for (var i = 0; i < matrix.length; i++) {
    var row = document.createElement('div');
    row.classList.add('row');
    for (var j = 0; j < matrix[0].length; j++) {
      var cell = document.createElement('div');
      cell.classList.add('cell');
      if (matrix[i][j] === 0) {
        cell.classList.add('dead');
      } else if (matrix[i][j] === 1) {
        cell.classList.add('alive');
      }
      row.appendChild(cell);
    }
    plane.appendChild(row);
  }
};

gameOfLife.applyChangesToPlane = function applyChangesToPlane(matrix) {
  var plane = document.getElementsByClassName('plane')[0];
  var rows = plane.children;
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i].children;
    for (var j = 0; j < row.length; j++) {
      if (row[j].classList.contains('alive') && matrix[i][j] === 0) {
        row[j].classList.remove('alive');
        row[j].classList.add('dead');
      } else if (row[j].classList.contains('dead') && matrix[i][j] === 1) {
        row[j].classList.remove('dead');
        row[j].classList.add('alive');
      }
    }
  }
};

gameOfLife.initialize();
