window.onload = function () {
//------------------------------------------------------------------------------1е задание --------------------------------------------------------------------
console.log(window.navigator.connection);
  let selectedEl,q;
   function paintOrange (e) {

  if (e.type == 'click') {
    if(selectedEl) selectedEl.style = null;
    e.target.style.background='orange';
    q = selectedEl;
    selectedEl = e.target;
console.log(e.target.parentNode.children[0].marker);
  }

  if (e.ctrlKey){
    if (e.type == 'click') {
      let range = new Range();
      range.selectNodeContents(e.target);
      if  (document.getSelection().isCollapsed) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(range)}
        else {
          document.getSelection().removeAllRanges();
        }
      }
    }

    if (e.shiftKey){
      if (e.type == 'click') {
        let range = new Range();
        console.log(q, selectedEl);
        range.setStart(e.target.parentNode, 0);
        range.setEnd(e.target.parentNode, 6);
        console.dir(range);
        if  (document.getSelection().isCollapsed) {
          document.getSelection().removeAllRanges();
          document.getSelection().addRange(range)}
          else {
            document.getSelection().removeAllRanges();
          }
        }
      }

  }


  function paintOrange1 (e) {
    if (event.target.tagName != "LI") return;
    let matches = onclick_list.children;
    for (let i = 0; i < matches.length; i++) {
      matches[i].setAttribute('index', i);
    }

    if (e.type == 'click' && !(e.ctrlKey || e.shiftKey)) {                      //орабатываем 'click'  выделение одного элемента
     if(selectedEl) for (var elem of matches) { if(elem.classList)  elem.classList.remove('selected');}
     e.target.classList.add('selected');
     selectedEl = e.target;
    }

    if (e.ctrlKey) {e.target.classList.toggle('selected'); }                    //орабатываем 'ctrlKey'  выделение  нескольких элементов

    if (e.shiftKey){                                                            //орабатываем 'shiftKey' выделение диапазона элементов
      if(!selectedEl) selectedEl = onclick_list.children[0];
      let a = selectedEl.getAttribute('index');
      let b = event.target.getAttribute('index');
      if (a>b) [a, b]=[b, a];
      for (a; a <= b; ++a) {
        onclick_list.children[a].classList.add('selected');
      }
    }
  }


onclick_list.addEventListener('click', paintOrange1) ;
// document.body.addEventListener('keydown', paintOrange1) ;
}
