window.onload = function () {
  button.addEventListener('click', searchMedia);
  let movie;
  let arrFilms =[];
  let filmsOnPage = 5;
  let page_search = 1;
  let page = 1;
  let temp='';
  let id_films;
  let films;
  function searchMedia() {

    let form = document.forms.media_content;
    let title = form.title.value;
    let type = form.type.value;

    let request = new XMLHttpRequest();
    let str = "http://www.omdbapi.com/?s="+ title +"&plot=full&page="+page_search+"&type="+type+"&apikey=ab776285";
    if (str!=temp) {
      temp = str;
      request.open("GET", str);
      request.onload = function(){
        if(request.status === 200){

          movie = JSON.parse(request.response).Search;
          prepeaList(movie)
        }
      }
      request.send(movie);
    }

  }

  function prepeaList(search) {

    arrFilms =arrFilms.concat(search)

    let show_div = document.querySelector('#out1');
    let pagination = document.querySelector('#out2');
    let countOfFilms = arrFilms.length / filmsOnPage;
    let items = [];

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


    for (let item of items) {

      if(item.innerHTML == '»' ) {

        item.addEventListener('click', function() {
          console.log(page/2-page_search==0);
          if (page/2-page_search==0) {
              page++;
              page_search++;
              searchMedia();
            }
          else {page++;  showFilms(items[page], arrFilms);}
        });
      }

      if(item.innerHTML == '«' ) {

        item.addEventListener('click', function() {

        if (page>1) {page--;

        showFilms(items[page], arrFilms);}
        });
      }

      item.addEventListener('click', function() {
        showFilms(this, arrFilms);
      });
    }

    showFilms(items[page], arrFilms);
  }

  function showFilms(elem, search) {
    let count = out1.children.length;
    if (out1.children) {
      out1.innerHTML ='';
    }

    let pageNum = elem.innerHTML;
    console.log(elem.innerHTML);
    if (pageNum=='»' || pageNum=='«') pageNum =page;
    else page=pageNum;
    console.log(pageNum);
		let start = (pageNum - 1) * filmsOnPage;
		let end = start + filmsOnPage;
    let notes = search.slice(start, end);


    for (var film of notes) {
      console.log(film);
      let clone = document.querySelector('.example').cloneNode(true);
      clone.classList.remove('hidden');
      let img = clone.getElementsByClassName('poster')[0];
      img.src = film.Poster;
      name_ = clone.getElementsByClassName('name')[0];
      name_.innerText = film.Title;
      let year = clone.getElementsByClassName('year')[0];
      year.innerText = film.Year;
      let imbd_id = clone.getElementsByClassName('imbd_id')[0];
      imbd_id.innerText = film.imdbID;
      let button_details = clone.getElementsByClassName('button_details')[0];
      button_details.addEventListener('click', showDetails);
      out1.appendChild(clone);
    }
  }

  function showDetails() {
    let request = new XMLHttpRequest();
    console.log(event.target);
    let imbd_id = event.target.parentElement.getElementsByClassName('imbd_id')[0];

    let s = "http://www.omdbapi.com/?i="+ imbd_id.innerText+"&plot=full&apikey=ab776285";
    console.log(s);
    request.open("GET", s);
    let film;
    request.onload = function(){
      if(request.status === 200){

        film = JSON.parse(request.response);
        console.log(film);
        showFilmDetails(film)
      }
    }
    request.send(film);
  }

  function showFilmDetails(film) {
    console.log(film);
    film_details.classList.remove('hidden');
    id_title.innerText = film.Title;
    released.innerText = film.Released;
    genre.innerText = film.Genre;
    country.innerText = film.Country;
    director.innerText = film.Director;
    writer.innerText = film.Writer;
    actors.innerText = film.Actors;
    awards.innerText = film.Awards;
    poster.src = film.Poster;
  }
}
