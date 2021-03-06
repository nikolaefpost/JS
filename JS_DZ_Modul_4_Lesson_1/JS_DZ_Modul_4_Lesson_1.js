window.onload = function () {
//------------------------------------------------------------------------------1е задание --------------------------------------------------------------------
  function paintOrange (idHtmlElement) {
    let selectedEl;
    let matches = idHtmlElement.children;
    for (let i = 0; i < matches.length; i++) {
      matches[i].setAttribute('index', i);
    }

    return function () {

      if (event.target.tagName != 'LI') return;

      if (event.type == 'click' && !(event.ctrlKey || event.shiftKey)) {               //обрабатываем 'click'  выделение одного элемента
       if(selectedEl) for (var elem of matches) { if(elem.classList)  elem.classList.remove('selected');}
       event.target.classList.add('selected');
       selectedEl = event.target;
      }

      if (event.ctrlKey) {                                                          //обрабатываем 'ctrlKey'  выделение  нескольких элементов
        event.target.classList.toggle('selected');
        (event.target.classList == 'selected') ? selectedEl = event.target : selectedEl = null;
      }

      if (event.shiftKey){                                                          //обрабатываем 'shiftKey' выделение диапазона элементов
        if(!selectedEl) selectedEl = onclick_list.children[0];
        let start = selectedEl.getAttribute('index');
        let end = event.target.getAttribute('index');
        if (start>end) [start, end] = [end, start];
        for (start; start <= end; ++start) {
          onclick_list.children[start].classList.add('selected');
        }
        selectedEl = event.target;
      }
    }
  }
  // let selectedEl;
//    function paintOrange1 (e) {
//
//   if (e.type == 'click') {
//     if(selectedEl) selectedEl.style = null;
//     e.target.style.background='orange';
//     selectedEl = e.target;
// console.log(e.target.parentNode.children[0].marker);
//   }
//
//   if (e.ctrlKey){
//     if (e.type == 'click') {
//       let range = new Range();
//       range.selectNodeContents(e.target);
//       if  (document.getSelection().isCollapsed) {
//         document.getSelection().removeAllRanges();
//         document.getSelection().addRange(range)}
//         else {
//           document.getSelection().removeAllRanges();
//         }
//       }
//     }
//   }



onclick_list.addEventListener('click', paintOrange(onclick_list)) ;
//------------------------------------------------------------------------------2е задание --------------------------------------------------------------------

  function createArea(text_area, p_block) {
    text_area.style.display = 'block';
    text_area.value = p_block.innerText;
    text_area.setAttribute('autofocus', true);
    p_block.style.display = 'none';
    event.preventDefault();
  }

  function createP(text_area, p_block) {
    p_block.style.display = 'block';
    p_block.innerText = text_area.value;
    text_area.style.display = 'none';
    event.preventDefault();
  }

  function editText(idHtmlElement){
    let p_block = idHtmlElement.querySelector('p');
    let text_area = idHtmlElement.querySelector('textarea');
    let text;
    return function (e) {
      if (event.ctrlKey && event.code == 'KeyE') createArea(text_area, p_block);
      if (event.ctrlKey && event.code == 'KeyS') createP(text_area, p_block)
    }
  }
  // function editText(e){
  //   let text, text_area, p_block;
  //   return function (e) {
  //     if (e.ctrlKey && e.code == 'KeyE'){
  //       p_block = div_block.querySelector('p');
  //       if(!p_block) return;
  //       text_area = document.createElement('textarea');
  //       text_area.classList.add('edit_text');
  //       text_area.value = p_block.firstChild.data;
  //       text_area.setAttribute('autofocus', true);
  //       p_block.remove();
  //       p_block = null;
  //       div_block.append(text_area);
  //       e.preventDefault();
  //     }
  //
  //     if (e.ctrlKey && e.code == 'KeyS'){
  //       if(!text_area||p_block) return;
  //       p_block = document.createElement('p');
  //       p_block.textContent = text_area.value;
  //       text_area.remove();
  //       div_block.append(p_block);
  //       e.preventDefault();
  //     }
  //   }
  //
  // }

  // function createArea(e) {
  //   p_block = div_block.querySelector('p');
  //   if(!p_block) return;
  //   text_area = document.createElement('textarea');
  //   text_area.classList.add('edit_text');
  //   text_area.value = p_block.firstChild.data.normalize();
  //   document.execCommand("insertHTML", false, text);
  //   text_area.setAttribute('autofocus', true);
  //   p_block.remove();
  //   p_block = null;
  //   div_block.append(text_area);
  //   e.preventDefault();
  // }
  //
  //
  // function createP(e) {
  //   if(!text_area||p_block) return;
  //   p_block = document.createElement('p');
  //   p_block.textContent = text_area.value;
  //   text_area.remove();
  //   div_block.append(p_block);
  //   e.preventDefault();
  // }
  //
  // function editText(e){
  //   let text, text_area, p_block;
  //   return function (e) {
  //     if (e.ctrlKey && e.code == 'KeyE') createArea(e);
  //     if (e.ctrlKey && e.code == 'KeyS') createP(e)
  //   }
  // }



  document.body.addEventListener('keydown', editText(div_block)) ;
}
