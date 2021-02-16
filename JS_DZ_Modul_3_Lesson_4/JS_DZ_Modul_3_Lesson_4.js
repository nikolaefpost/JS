
  window.onload = function () {
    function dottedLink() {
      let matches = document.querySelectorAll('a');
      for (var elem of matches){
        if (elem.href.indexOf('https:')!=-1){
          elem.style.textDecoration = 'none';
          elem.className = 'dotted';
        }
      }
    }
    dottedLink();

  }
