window.onload = function () {
  button.addEventListener('click', searchMedia);
  let movie;
  let arrFilms =[];
  let filmsOnPage = 5;
  let page = 1;
  function searchMedia() {

    let form = document.forms.media_content;
    let title = form.title.value;
    let type = form.type.value;

    let request = new XMLHttpRequest();
    request.open("GET", "http://www.omdbapi.com/?s="+ title +"&plot=full&page="+page+"&type="+type+"&apikey=ab776285");
    request.onload = function(){
      if(request.status === 200){
        movie = JSON.parse(request.response).Search;
        console.log(movie);
        prepeaList(movie)
      }
    }
    request.send(movie);
  }

  function prepeaList(search) {
    console.log(search);

    arrFilms =arrFilms.concat(search)
    console.log(arrFilms);

    let show_div = document.querySelector('#out1');
    let pagination = document.querySelector('#out2');
    let countOfFilms = arrFilms.length / filmsOnPage;
    console.log(arrFilms.length);
    let items = [];
    console.log(arrFilms.length);
    console.log(out2.children);
    if (out2.children) {
      out2.innerHTML ='';
    }
    for (let i = 0; i <= countOfFilms+1; i++) {
      let li = document.createElement('li');
      if(i==0) li.innerHTML = '&laquo';
      else if(i==countOfFilms+1) li.innerHTML = '&raquo';
      else li.innerHTML = i;
      pagination.appendChild(li);
      items.push(li);
    }

    console.log(items);
    for (let item of items) {
      console.log(item.innerHTML=='»');
      if(item.innerHTML == '»' ) {

        item.addEventListener('click', function() {
          page++;

          searchMedia();

        });
      }
      item.addEventListener('click', function() {
        showFilms(this, arrFilms);
      });
    }
  }

  function showFilms(elem, search) {
    let count = out1.children.length;
    if (out1.children) {
      out1.innerHTML ='';
    }
    let pageNum = elem.innerHTML;
		let start = (pageNum - 1) * filmsOnPage;
		let end = start + filmsOnPage;
    let notes = search.slice(start, end);
    console.log(notes);

    for (var film of notes) {
      let clone = document.querySelector('.example').cloneNode(true);
      clone.classList.remove('hidden');
      let img = clone.getElementsByClassName('poster')[0];
      img.src = film.Poster;
      let name_ = clone.getElementsByClassName('name')[0];
      name_.innerText = film.Title;
      let year = clone.getElementsByClassName('year')[0];
      year.innerText = film.Year;
      out1.appendChild(clone);
      console.log(film);
    }
  }
}
