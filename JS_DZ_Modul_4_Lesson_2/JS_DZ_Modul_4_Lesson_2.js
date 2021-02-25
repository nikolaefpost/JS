
  window.onload = function () {
    // let matches = Array.from(document.body.getElementsByTagName('tr'));
    let matches = Array.from(sorting.rows);
    matches.shift();
    console.log(matches[0]);

    function sortString(e) {
      let i = e.target.getAttribute('index');
      console.log(i);
      matches.sort((a, b)=>{
        console.log(a.cells[i]);
        if (a.cells[i]>b.cells[i]) return true;
      })
    }
    Firstname.addEventListener('click', sortString) ;
  }
