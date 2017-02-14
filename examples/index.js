var cubeSize;

lovr.load = function () {
  cubeSize = 0;
  console.log('load', cubeSize);
};

lovr.update = function () {
  cubeSize = cubeSize + .0001;
  // console.log('update', cubeSize);
};

lovr.draw = function () {
  lovr.graphics.cube('line', -1, 1, -5, cubeSize);
  // console.log('draw', cubeSize);
};
