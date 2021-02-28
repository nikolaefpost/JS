
  window.onload = function () {
//------------------------------------------------------------------------------1е задание --------------------------------------------------------------------
  headTab.addEventListener('click', sortRows(sorting, headTab)) ;               // задаем значения id таблицы и id строки заголовка
    function sortRows(idTab, idTabHead) {
      // let matches = Array.from(document.body.getElementsByTagName('tr'));
      let matches = Array.from(idTab.rows).slice(1);
      let indexed = Array.from(idTabHead.children);
      for (let i = 0; i < indexed.length; i++) { indexed[i].setAttribute('index', i);}
      return function () {
        let i = event.target.getAttribute('index');
        matches.sort((a, b) => a.cells[i].innerHTML > b.cells[i].innerHTML ? 1 : -1);
        idTab.tBodies[0].firstChild.after(...matches);
      }
    }
//------------------------------------------------------------------------------2е задание --------------------------------------------------------------------


  function resizeBlock() {
    let block = document.getElementById('block');
    let deltaHeight = block.offsetTop;
    let deltaWidth = block.offsetLeft;
    let coord = {left:event.x, top:event.y};
    block.style.width = coord.left - deltaWidth - 35 + 'px';
    block.style.height = coord.top - deltaHeight - 35  + 'px';
    if (event.type == 'mouseup') {
      document.body.removeEventListener('mousemove', resizeBlock) ;
      document.body.removeEventListener('mouseup', resizeBlock) ;
    }
  }

  function startResize() {
     document.body.addEventListener('mousemove', resizeBlock);
     document.body.addEventListener('mouseup', resizeBlock);
  }
  target_block.addEventListener('mousedown', startResize) ;

//------------------------------------------------------------------------------2е задание --------------------------------------------------------------------


  pushed.addEventListener('mousemove', pushBlock);
  function pushBlock() {
    let block = document.getElementById('pushed');
    let shift = event.clientX-axis.offsetLeft-block.offsetWidth/2;
    if (shift<0) shift=0;
    if (shift > (axis.offsetWidth-block.offsetWidth)) shift = axis.offsetWidth-block.offsetWidth;
    block.style.left = shift;
  }
  }
