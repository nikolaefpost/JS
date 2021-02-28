
  window.onload = function () {
//------------------------------------------------------------------------------1е задание --------------------------------------------------------------------
  headTab.addEventListener('click', sortRows()) ;
    function sortRows(e) {
      // let matches = Array.from(document.body.getElementsByTagName('tr'));
      let matches = Array.from(sorting.rows).slice(1);
      let indexed = Array.from(headTab.children);
      for (let i = 0; i < indexed.length; i++) { indexed[i].setAttribute('index', i);}
      return function (e) {
        let i = e.target.getAttribute('index');
        matches.sort((a, b) => a.cells[i].innerHTML > b.cells[i].innerHTML ? 1 : -1);
        sorting.tBodies[0].firstChild.after(...matches);
      }
    }
//------------------------------------------------------------------------------2е задание --------------------------------------------------------------------

  function pushBlock(e) {
    console.log(e.type == 'mousedown');
    let block = document.getElementById('block');
    let coord = {left:e.layerX, top:e.layerY};
    block.style.width = coord.left -20+ 'px';
    block.style.height = coord.top -20+ 'px';

  }

  function clickableD(e) {
    console.log(e);
    if(e.type == 'mousemove') block.addEventListener('mousemove', pushBlock) ;
  }

  pushed.addEventListener('mousedown', clickableD) ;
  }
