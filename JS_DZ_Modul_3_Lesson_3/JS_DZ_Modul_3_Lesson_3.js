
  window.onload = function () {
//------------------------------------------------------------------------------1е задание --------------------------------------------------------------------
    let selectedEl;
    // let matches = document.querySelectorAll('li');
    onclick_list.onclick = function (e) {
      // for (var elem of matches) { if(elem.style)  elem.style = null;}
      if(selectedEl) selectedEl.style = null;
      e.target.style.background='rgb(223, 184, 227)';
      selectedEl = e.target;
    }

    // onclick_list.onmouseout = function (e) {
    //   if (e.target.style) {  e.target.style = null; }
    // }
//------------------------------------------------------------------------------2е задание --------------------------------------------------------------------

    div_button.onmouseover = function (e) {
      let hint;
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
      div_button.onmouseout = function () {
        if (hint) {
          hint.remove();
          hint = null;
        }
      }
    }


  }

// function sum() {
//   let sum=0;
//   for (var i = 0; i < 1e4; i++) {
//     sum +=i;
//     console.log(sum);
//   }
// }

// sum();
let sum=0;
let timerId = setTimeout(function sum(a) {


  if (a<0) clearTimeout(timerId);
  for (var i = 0; i < 1e3; i++) {
    sum +=i;
    console.log(sum);}
    a--;
  timerId = setTimeout(sum, 1);
}, 2000);
console.log(sum);
