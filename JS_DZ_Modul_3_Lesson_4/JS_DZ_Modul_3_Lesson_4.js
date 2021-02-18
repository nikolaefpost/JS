
  window.onload = function () {
    (function () {
      let matches = document.querySelectorAll('a');
      for (var elem of matches){
        if (elem.href.includes('://')){
          elem.style.textDecoration = 'none';
          elem.className = 'dotted';
        }
      }
    })();


    list.onclick = function () {
      for (z of event.target.children) { (z.style.display) ? z.style.display = '' : z.style.display = 'none';}
    }
  }
