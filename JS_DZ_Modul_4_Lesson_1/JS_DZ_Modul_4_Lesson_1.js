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

    if (e.type == 'click' && !(e.ctrlKey || e.shiftKey)) {
     if(selectedEl) selectedEl.classList.remove('selected');
     e.target.classList.add('selected');
     selectedEl = e.target;
    }

    if (e.ctrlKey) {
      if (event.target.tagName != "LI") return;
        e.target.classList.toggle('selected');
        }


      // if (e.shiftKey){
      //   if (e.type == 'click') {
      //
      //     e.target.style.background='orange'
      //     for(el of e.target.parentElement){
      //       if(el.style.background == 'orange' )
      //     }
      //     }
      //   }

}


onclick_list.addEventListener('click', paintOrange1) ;
document.body.addEventListener('keydown', paintOrange1) ;
}
