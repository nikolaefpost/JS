
window.onload = function () {
  document.forms.figure_color.onchange = start;
  function start() {
    let dx,dy,width,height;
    canvas1.onmouseup = selectFigPlacement;
    canvas1.onmousedown = selectFigPlacement;
  }

  function selectFigPlacement() {
    let canvas = document.getElementById('canvas1');
    let canvas_size = canvas.getBoundingClientRect();
    let figure = document.forms.figure_color.figure.value;
    if(!figure) return;
    let color = document.forms.figure_color.color.value;

    if(event.type=='mousedown') {
      dx =event.clientX- canvas_size.x;
      dy =event.clientY- canvas_size.y;
    }

    if(event.type=='mouseup') {
      width =event.clientX- canvas_size.x - dx;
      height =event.clientY- canvas_size.y- dy;
      drawFigure({x:dx, y:dy, width:width, height:height, figure:figure, fillStyle:color, canvas:canvas});
    }
  }

  function drawFigure({x=0, y=0, width=0, height=0, figure=0, fillStyle='white', canvas=''} = null) {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    switch (figure) {
      case '0':
      ctx.rect(x, y, width, height);
      break;
      case '1':
      let d =  (width>height) ? width : height;
      ctx.arc(x+width/2, y+height/2, d/2, 0, 2 * Math.PI);
      break;
      case '2':
      ctx.moveTo(x, y+height/2);
      ctx.lineTo(x+width/2, y);
      ctx.lineTo(x+width, y+height/2);
      ctx.lineTo(x+width/2, y+height);
      break;
      case '3':
      ctx.moveTo(x, y);
      ctx.lineTo(x, y+height);
      ctx.lineTo(x+width, y+height);
      break;
    }
    ctx.closePath();
    ctx.fill();
  }
  // function drawRect({x=0, y=0, width=0, height=0, fillStyle='white', strokeStyle='white', lineWidth=0, canvasId='canvas1'} = null) {
  //   console.log(document.getElementById(canvasId));
  //   let ctx = document.getElementById(canvasId).getContext('2d');
  //   ctx.fillStyle = fillStyle;
  //   ctx.strokeStyle = strokeStyle;
  //   ctx.lineWidth = lineWidth;
  //   ctx.rect(x, y, width, height);
  //   if (fillStyle) ctx.fill();
  //   if (strokeStyle && lineWidth !=0) ctx.stroke();
  // }

  // drawRect({x:50, y:50, width:200, height:100, fillStyle:'red', strokeStyle:'green', lineWidth:2, canvasId:'canvas1'});

  // let ctx = document.getElementById('canvas1').getContext('2d');
  // let grd = ctx.createLinearGradient(50, 250, 800, 600 );
  // //  grd.addColorStop(0, 'green');
  // //  grd.addColorStop(0.5, 'grey');
  // //  grd.addColorStop(1, 'blue');
  // // ctx.fillStyle = grd;
  // // ctx.strokeStyle = strokeStyle;
  // // ctx.lineWidth = lineWidth;
  //
  // let ptr = ctx.createPattern(document.getElementById('img1'), 'repeat');
  // ctx.fillStyle = ptr
  // ctx.globalAlpha = 0.7;
  // // ctx.rotate(45 * Math.PI / 180);
  // // ctx.rect(50, 50, 800, 600);
  //  ctx.fill();
  //  ctx.font = 'bold 48px serif';
  //  ctx.fillText('hello',200, 200);
  //  ctx.drawImage(document.getElementById('img1'),50,50,500,400);
  //  ctx.beginPath();
  //  ctx.moveTo(50,50);
  //  ctx.lineTo(50,10);
  //  ctx.lineTo(250,100);
  //  ctx.lineTo(50,100);
  //  ctx.stroke();
  //  // ctx.closePath();
  //  // ctx.fill();


// setInterval(gameloop, 1000/60);
//   window.requestAnimationFrame(gameloop);
//
//   let square = {
//     x:0,
//     y:0,
//     width:30,
//     height:30
//   }
//
//   function gameloop() {
//     window.requestAnimationFrame(gameloop);
//     updateModel();
//     draw();
//   }
//
//   function  updateModel() {
//     square.x+=0.2;
//        square.y+=0.2;
//   }
//
//   function draw() {
//
//     let ctx = document.getElementById('canvas1').getContext('2d');
//     clear();      //не очищает
//     drawRect1(square.x, square.y, square.width, square.height,'red');
//     ctx.fill();
//
//   }
//
//   function clear() {
//     let canvas = document.getElementById('canvas1');
//     let ctx = canvas.getContext('2d');
//     ctx.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight);
//     ctx.fillStyle = 'rgb(255,255,255)';
//     ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
//   }
//
//   function drawRect1(x,y,width, height, color) {
//     let ctx = document.getElementById('canvas1').getContext('2d');
//     ctx.fillStyle = color;
//     ctx.rect(x,y,width, height);
//   }
}
