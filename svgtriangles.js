//canvas width
cw = 1000;
//canvas height
ch = 1000;
//triangle width
tw = 100;

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
  'coral',
  'darkgreen',
  'skyblue',
  'springgreen',
  'dimgray',
  'rosybrown'
];

const gradfills = [
  'url(#grad1)',
  'url(#grad2)',
  'url(#grad3)',
  'url(#grad4)',
  'url(#grad5)',
  'url(#grad6)',
  'url(#grad7)',
  'url(#grad8)',
  'url(#grad9)',
  'url(#grad10)',
  'url(#grad11)',
  'url(#grad12)'
];

var colrestric = 5;

var fill = fillcols;

var svg = document.getElementById('svgcanv');

svg.setAttribute('viewBox', `0 0 ${cw} ${ch}`);

var poly = document.getElementById('polyinit');

const genTriangles = () => {
  console.log('Gen Triangles Successful');
  //Get Viewport Dimensions
  let vpw = window.innerWidth;
  let vph = window.innerHeight;
  //aspect ratio
  let asprat = vpw / vph;
  //triangle height
  th = tw * asprat;
  // startign x
  let sx = 0;
  // starting y
  let sy = 0;
  // initialise colour index
  let colindex = 0;
  let cubeindex = 1;
  let isdwn = true;

  while (sy < 1000) {
    while (
      !(
        (sx >= 1000 && isdwn == false) ||
        (sx >= 1000 + tw * 0.5 && isdwn == true)
      )
    ) {
      poly.insertAdjacentHTML(
        'afterend',
        `<polygon class="tris ${isdwn ? 'dwntri' : 'uptri'} ${'cube' +
          cubeindex}" fill="${fill[colindex]}" points="${sx},${sy + th} ${sx +
          tw * 0.5},${sy} ${isdwn ? sx - 0.5 * tw : sx + tw},${
          isdwn ? sy : sy + th
        }" onclick="chngCol()"></polygon>`
      );
      colindex + 1 >= colrestric ? (colindex = 0) : colindex++;
      cubeindex >= 6 ? (cubeindex = 1) : cubeindex++;
      isdwn = !isdwn;
      if (isdwn) {
        sx += tw;
      }
    }
    isdwn ? (sx = 0) : (sx = tw * -0.5);
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
  if (colrestric != fill.length) {
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
  let rancola = fillcols[Math.floor(Math.random() * fillcols.length)];
  let rancolb = fillcols[Math.floor(Math.random() * fillcols.length)];
  let rancolc = fillcols[Math.floor(Math.random() * fillcols.length)];
  console.log(rancola, rancolb, rancolc);
  let a = Array.from(document.querySelectorAll('.cube2,.cube3'));
  a.forEach(x => x.setAttribute('fill', rancola));
  let b = Array.from(document.querySelectorAll('.cube1,.cube4'));
  b.forEach(x => x.setAttribute('fill', rancolb));
  let c = Array.from(document.querySelectorAll('.cube5,.cube6'));
  c.forEach(x => x.setAttribute('fill', rancolc));
};

const gradients = () => {
  while (svg.childNodes.length > 2) {
    svg.removeChild(svg.lastChild);
  }
  fill = gradfills;
  genTriangles();
};

const reset = () => {
  while (svg.childNodes.length > 2) {
    svg.removeChild(svg.lastChild);
  }
  colrestric = 5;
  tw = 100;
  genTriangles();
};

const resize = () => {
  while (svg.childNodes.length > 2) {
    svg.removeChild(svg.lastChild);
  }
  genTriangles();
};
