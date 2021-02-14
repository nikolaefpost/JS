
  window.onload = function () {
//------------------------------------------------------------------------------1е задание --------------------------------------------------------------------
    let matches = document.querySelectorAll('li');
    onclick_list.onclick = function (e) {
      for (var elem of matches) { if(elem.style)  elem.style = null;}
      e.target.style.background='rgb(223, 184, 227)';
    }

    // onclick_list.onmouseout = function (e) {
    //   if (e.target.style) {  e.target.style = null; }
    // }
//------------------------------------------------------------------------------2е задание --------------------------------------------------------------------
    let hint;
    div_button.onmouseover = function (e) {
      let target = e.target;
      let hintText = target.dataset.tooltip;                                    // сохраняем текст подсказки
      if (!hintText) return;                                                    //если у элемента нет подсказки

      hint = document.createElement('div');
      hint.className = 'tooltip';
      hint.innerHTML = hintText;
      div_button.append(hint);

      let coords = target.getBoundingClientRect();
      let left = coords.left + (target.offsetWidth - hint.offsetWidth) / 2;

      let top = coords.top - hint.offsetHeight - 5;
      if (top < 0) {top = coords.top + target.offsetHeight + 5;}                // если подсказка не помещается сверху, то отображать её снизу

      hint.style.left = left + 'px';
      hint.style.top = top + 'px';
    }

    div_button.onmouseout = function () {
      if (hint) {
        hint.remove();
        hint = null;
      }
    }
  }
