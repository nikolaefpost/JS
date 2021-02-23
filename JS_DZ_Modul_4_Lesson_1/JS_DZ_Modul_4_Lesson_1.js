window.onload = function () {
//------------------------------------------------------------------------------1е задание --------------------------------------------------------------------

  let selectedEl,q;
   function paintOrange (e) {

  if (e.type == 'click') {
    if(selectedEl) selectedEl.style = null;
    e.target.style.background='orange';
    selectedEl = e.target;
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
  }


  function paintOrange1 (e) {
    if (event.target.tagName != 'li') return;
    let matches = onclick_list.children;
    for (let i = 0; i < matches.length; i++) {
      matches[i].setAttribute('index', i);
    }

    if (e.type == 'click' && !(e.ctrlKey || e.shiftKey)) {                      //обрабатываем 'click'  выделение одного элемента
     if(selectedEl) for (var elem of matches) { if(elem.classList)  elem.classList.remove('selected');}
     e.target.classList.add('selected');
     selectedEl = e.target;
    }

    if (e.ctrlKey) {e.target.classList.toggle('selected'); }                    //обрабатываем 'ctrlKey'  выделение  нескольких элементов

    if (e.shiftKey){                                                            //обрабатываем 'shiftKey' выделение диапазона элементов
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

}
