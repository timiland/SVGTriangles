//canvas width
cw = 1000;
//canvas height
ch = 1000;
//triangle width
tw = 100;
//triangle height

// startign x
var sx = tw * -0.5;
// starting y
var sy = 0;

// fill colours
const fillcols = [
  'red',
  'blue',
  'green',
  'yellow',
  'black',
  'white',
  'purple',
  'teal',
  'orange',
  'maroon',
  'cyan',
  'lawngreen',
  'dodgerblue',
  'mediumorchid',
  'gold',
  'indigo',
  'gainsboro',
  'red'
];

var colrestric = 5;

var svg = document.getElementById('svgcanv');

svg.setAttribute('viewBox', `0 0 ${cw} ${ch}`);

var poly = document.getElementById('polyinit');

const genTriangles = () => {
  //Get Viewport Dimensions
  let vpw = window.innerWidth;
  let vph = window.innerHeight;
  let asprat = vpw / vph;
  th = tw * asprat;
  var colindex = 0;
  var cubeid = [1, 2, 3, 4, 5, 6];
  let i = 0;

  while (sy < 1000) {
    while (sx <= 1000) {
      poly.insertAdjacentHTML(
        'afterend',
        `<polygon class="tris dwntri ${'cube' + cubeid[i]}" fill="${
          fillcols[colindex]
        }" fill="${fillcols[colindex]}" points="${sx},${sy} ${sx +
          tw},${sy} ${sx + tw * 0.5},${sy + th}" onclick="chngCol()"></polygon>`
      );
      colindex + 1 >= colrestric ? (colindex = 0) : colindex++;
      i >= cubeid.length - 1 ? (i = 0) : i++;

      poly.insertAdjacentHTML(
        'afterend',
        `<polygon class="tris uptri ${'cube' + cubeid[i]}" fill="${
          fillcols[colindex]
        }" points="${sx + tw},${sy} ${sx + tw * 1.5},${sy + th} ${sx +
          tw * 0.5},${sy + th}" onclick="chngCol()"></polygon>`
      );
      colindex + 1 >= colrestric ? (colindex = 0) : colindex++;
      i >= cubeid.length - 1 ? (i = 0) : i++;
      sx += tw;
    }

    sx -= cw + tw * 1.5;
    sy += th;
  }
};

// functions

const increaseSize = () => {
  if (tw != 200) {
    while (svg.childNodes.length > 2) {
      svg.removeChild(svg.lastChild);
    }
    tw *= 2;
    th = tw;
    sx = tw * -0.5;
    sy = 0;
    genTriangles();
  } else {
  }
};

const decreaseSize = () => {
  if (tw != 25) {
    while (svg.childNodes.length > 2) {
      svg.removeChild(svg.lastChild);
    }
    tw *= 0.5;
    th = tw;
    sx = tw * -0.5;
    sy = 0;
    genTriangles();
  } else {
  }
};

const increaseCols = () => {
  if (colrestric != fillcols.length) {
    while (svg.childNodes.length > 2) {
      svg.removeChild(svg.lastChild);
    }
    colrestric++;
    sx = tw * -0.5;
    sy = 0;
    genTriangles();
  } else {
  }
};

const decreaseCols = () => {
  if (colrestric != 2) {
    while (svg.childNodes.length > 2) {
      svg.removeChild(svg.lastChild);
    }
    colrestric--;
    sx = tw * -0.5;
    sy = 0;
    genTriangles();
  } else {
  }
};

const chngCol = () => {
  let a = event.target;
  let j = a.getAttribute('fill');
  let i = fillcols.indexOf(j);
  a.setAttribute(
    'fill',
    i == fillcols.length - 1 ? fillcols[0] : fillcols[i + 1]
  );
};

const changeDowns = () => {
  let a = Array.from(document.getElementsByClassName('dwntri'));
  let j = a[0].getAttribute('fill');
  let i = fillcols.indexOf(j);
  a.forEach(x =>
    x.setAttribute(
      'fill',
      i == fillcols.length - 1 ? fillcols[0] : fillcols[i + 1]
    )
  );
};

const changeUps = () => {
  let a = Array.from(document.getElementsByClassName('uptri'));
  let j = a[0].getAttribute('fill');
  let i = fillcols.indexOf(j);
  a.forEach(x =>
    x.setAttribute(
      'fill',
      i == fillcols.length - 1 ? fillcols[0] : fillcols[i + 1]
    )
  );
};

const cubes = () => {
  let a = Array.from(document.querySelectorAll('.cube2,.cube3'));
  a.forEach(x => x.setAttribute('fill', 'red'));
  let b = Array.from(document.querySelectorAll('.cube1,.cube4'));
  b.forEach(x => x.setAttribute('fill', 'blue'));
  let c = Array.from(document.querySelectorAll('.cube5,.cube6'));
  c.forEach(x => x.setAttribute('fill', 'green'));
};

const reset = () => {
  while (svg.childNodes.length > 2) {
    svg.removeChild(svg.lastChild);
  }
  colrestric = 5;
  tw = 100;
  sx = tw * -0.5;
  sy = 0;
  genTriangles();
};

const resize = () => {
  while (svg.childNodes.length > 2) {
    svg.removeChild(svg.lastChild);
  }
  sx = tw * -0.5;
  sy = 0;
  genTriangles();
};
