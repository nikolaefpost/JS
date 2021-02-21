
  window.onload = function () {
 //----------------------------------------------------------------------------- первое задание  -----------------------------------------------------------------
    (function () {
      let matches = document.querySelectorAll('a');
      for (var elem of matches){
        let href = elem.getAttribute('href');
        if (href.includes('://')){
        // if (elem.href.includes('https://')||elem.href.includes('http://')||elem.href.includes('ftp://')){
          elem.style.textDecoration = 'none';
          elem.className = 'dotted';
        }
      }
    })();

//----------------------------------------------------------------------------- второе задание  -----------------------------------------------------------------
    // list.onclick = function () {
    //   for (z of event.target.children) { (z.style.display) ? z.style.display = '' : z.style.display = 'none';}
    // }


    for (elem of list.querySelectorAll('li')){                              //оборачиывем все li в span для более четкого позиционирования
      let span = document.createElement('span');
      elem.prepend(span);
      span.append(span.nextSibling);
    }

    list.onclick = function () {
      if (event.target.tagName == 'SPAN') {
        let childrenContainer = event.target.parentNode.querySelector('ul');
        if (childrenContainer) childrenContainer.hidden = !childrenContainer.hidden;
      }
    }






//----------------------------------------------------------------------------- практика задание  -----------------------------------------------------------------
function createList() {                                                     //динамическое создание списка
  let ul = document.createElement('ul');
  main.append(ul);
  while (true)  {
    let  ask = prompt('введите текст списка');
    if (!ask) break;
    let li = document.createElement('li');
    li.textContent = ask;
    ul.append(li);
  }
}
// createList();
}
