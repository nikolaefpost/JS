window.onload = function () {


  (function () {
    button.addEventListener('click', mediaQuery);

    let filmsOnPage = 5;
    let page_search = 1;
    let page = 1;
    let arrFilms =[];
    let temp='';

  function mediaQuery() {
    let movie;

    let form = document.forms.media_content;
    let title = form.title.value;
    console.log(title);
    let type = form.type.value;
    let request = new XMLHttpRequest();
    let str = "http://www.omdbapi.com/?s="+ title +"&plot=full&page="+page_search+"&type="+type+"&apikey=ab776285";
    console.log(str);
    if (str!=temp) {
      console.log(temp);
      temp = str;
      request.open("GET", str);
      request.onload = function(){
        if(request.status === 200){
          movie = JSON.parse(request.response).Search;
          console.log(movie);
          prepeaPagination(movie)
        }
      }
      request.send(movie);
    }
  }

  function prepeaPagination(search) {
    arrFilms =arrFilms.concat(search)
    let countOfFilms = arrFilms.length / filmsOnPage;
    let items = [];

    if (out2.children) out2.innerHTML ='';
    for (let i = 0; i <= countOfFilms+1; i++) {
      let li = document.createElement('li');
      if (i==0) {
        li.innerHTML = '&laquo';
        li.addEventListener('click', function() {
          if (page>1) {
            page--;
            showFilms(items[page], arrFilms);}
          });
        } else if(i==countOfFilms+1) {
          li.innerHTML = '&raquo';
          li.addEventListener('click', function() {
            if (page/2-page_search==0) {
              page++;
              page_search++;
              mediaQuery();
            } else {
              page++;
              showFilms(items[page], arrFilms);}
            });
          } else {
            li.innerHTML = i;
            li.addEventListener('click', function() {
              showFilms(this, arrFilms);
            });
          }
          out2.appendChild(li);
          items.push(li);
      }
      showFilms(items[page], arrFilms);
  }

  function showFilms(elem, search) {
    if (out1.children) out1.innerHTML ='';
    let pageNum = elem.innerHTML;
    if (pageNum=='»' || pageNum=='«') pageNum =page;
    else page=pageNum;
		let start = (pageNum - 1) * filmsOnPage;
		let end = start + filmsOnPage;
    let notes = search.slice(start, end);
    if (zag.children) zag.innerHTML ='';
    zag.innerHTML+='<h3 style="text-align:center;">Films:</h3>';

    for (var film of notes) {
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
      button_details.addEventListener('click', mediaQueryDetails);
      out1.appendChild(clone);
    }
  }

  function mediaQueryDetails() {
    let request = new XMLHttpRequest();
    let imbd_id = event.target.parentElement.getElementsByClassName('imbd_id')[0];
    let str = "http://www.omdbapi.com/?i="+ imbd_id.innerText+"&plot=full&apikey=ab776285";
    request.open("GET", str);
    let film;
    request.onload = function(){
      if(request.status === 200){
        film = JSON.parse(request.response);
        showFilmDetails(film)
      }
    }
    request.send(film);
  }

  function showFilmDetails(film) {
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

  })();
}
