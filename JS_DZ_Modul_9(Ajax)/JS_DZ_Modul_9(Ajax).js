window.onload = function () {

  class MediaQuery1 {
    constructor(url, filmsOnPage) {
      this.url = url;
      this.filmsOnPage = filmsOnPage;
      this.page_search = 1;
      this.page = 1;
      this.arrFilms = [];
      this.temp=''
    }
    search() {
      this.title = document.forms.media_content.title.value;
      this.type = document.forms.media_content.type.value;
      this.request = fetch(this.url + '?s=' + this.title + '&plot=full&page=' + this.page_search + '&type=' + this.type + '&apikey=ab776285')
      .then(response => response.json())
      .then(object =>this.getMovie(object))
    }
    getMovie(object) {
      prepeaPagination(object.Search, this);
      }
  }

  let request = new MediaQuery1('http://www.omdbapi.com/',5);
  // request.search();
  button.addEventListener('click', ()=>request.search());


  function prepeaPagination(search, q) {
    q.arrFilms =q.arrFilms.concat(search);
    console.log(q.filmsOnPage);
    let countOfFilms = q.arrFilms.length / q.filmsOnPage;

    let items = [];

    if (out2.children) out2.innerHTML ='';
    for (let i = 0; i <= countOfFilms+1; i++) {
      let li = document.createElement('li');
      if (i==0) {
        li.innerHTML = '&laquo';
        li.addEventListener('click', function() {
          if (q.page>1) {
            q.page--;
            showFilms(items[q.page], q);}
          });
        } else if(i==countOfFilms+1) {
          li.innerHTML = '&raquo';
          li.addEventListener('click', function() {
            if (q.page/2-q.page_search==0) {
              q.page++;
              q.page_search++;
              q.search();
            } else {
              q.page++;
              showFilms(items[q.page], q);}
            });
          } else {
            li.innerHTML = i;
            li.addEventListener('click', function() {
              showFilms(this, q);
            });
          }
          out2.appendChild(li);
          items.push(li);
      }
      console.log(items);
      showFilms(items[q.page], q);
  }

  function showFilms(elem, q) {
    if (out1.children) out1.innerHTML ='';
    let pageNum = elem.innerHTML;
    if (pageNum=='»' || pageNum=='«') pageNum =q.page;
    else q.page=pageNum;
		let start = (pageNum - 1) * q.filmsOnPage;
		let end = start + q.filmsOnPage;
    console.log(q.arrFilms);
    let notes = q.arrFilms.slice(start, end);
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
      // button_details.addEventListener('click', mediaQueryDetails);
      out1.appendChild(clone);
    }
  }

  // function mediaQueryDetails() {
  //   let request = new XMLHttpRequest();
  //   let imbd_id = event.target.parentElement.getElementsByClassName('imbd_id')[0];
  //   let str = "http://www.omdbapi.com/?i="+ imbd_id.innerText+"&plot=full&apikey=ab776285";
  //   request.open("GET", str);
  //   let film;
  //   request.onload = function(){
  //     if(request.status === 200){
  //       film = JSON.parse(request.response);
  //       showFilmDetails(film)
  //     }
  //   }
  //   request.send(film);
  // }
  //
  // function showFilmDetails(film) {
  //   film_details.classList.remove('hidden');
  //   id_title.innerText = film.Title;
  //   released.innerText = film.Released;
  //   genre.innerText = film.Genre;
  //   country.innerText = film.Country;
  //   director.innerText = film.Director;
  //   writer.innerText = film.Writer;
  //   actors.innerText = film.Actors;
  //   awards.innerText = film.Awards;
  //   poster.src = film.Poster;
  // }































  // (function () {
  //   button.addEventListener('click', mediaQuery);
  //
  //   let filmsOnPage = 5;
  //   let page_search = 1;
  //   let page = 1;
  //   let arrFilms =[];
  //
  // function mediaQuery() {
  //   let movie;
  //   let temp='';
  //   let form = document.forms.media_content;
  //   let title = form.title.value;
  //   let type = form.type.value;
  //   let request = new XMLHttpRequest();
  //   let str = "http://www.omdbapi.com/?s="+ title +"&plot=full&page="+page_search+"&type="+type+"&apikey=ab776285";
  //   if (str!=temp) {
  //     temp = str;
  //     request.open("GET", str);
  //     request.onload = function(){
  //       if(request.status === 200){
  //         movie = JSON.parse(request.response).Search;
  //         prepeaPagination(movie)
  //       }
  //     }
  //     request.send(movie);
  //   }
  // }
  //
  // function prepeaPagination(search) {
  //   arrFilms =arrFilms.concat(search)
  //   let countOfFilms = arrFilms.length / filmsOnPage;
  //   let items = [];
  //
  //   if (out2.children) out2.innerHTML ='';
  //   for (let i = 0; i <= countOfFilms+1; i++) {
  //     let li = document.createElement('li');
  //     if (i==0) {
  //       li.innerHTML = '&laquo';
  //       li.addEventListener('click', function() {
  //         if (page>1) {
  //           page--;
  //           showFilms(items[page], arrFilms);}
  //         });
  //       } else if(i==countOfFilms+1) {
  //         li.innerHTML = '&raquo';
  //         li.addEventListener('click', function() {
  //           if (page/2-page_search==0) {
  //             page++;
  //             page_search++;
  //             mediaQuery();
  //           } else {
  //             page++;
  //             showFilms(items[page], arrFilms);}
  //           });
  //         } else {
  //           li.innerHTML = i;
  //           li.addEventListener('click', function() {
  //             showFilms(this, arrFilms);
  //           });
  //         }
  //         out2.appendChild(li);
  //         items.push(li);
  //     }
  //     showFilms(items[page], arrFilms);
  // }
  //
  // function showFilms(elem, search) {
  //   if (out1.children) out1.innerHTML ='';
  //   let pageNum = elem.innerHTML;
  //   if (pageNum=='»' || pageNum=='«') pageNum =page;
  //   else page=pageNum;
	// 	let start = (pageNum - 1) * filmsOnPage;
	// 	let end = start + filmsOnPage;
  //   let notes = search.slice(start, end);
  //   console.log(zag.children.length>0);
  //   if (zag.children) zag.innerHTML ='';
  //    zag.innerHTML+='<h3 style="text-align:center;">Films:</h3>';
  //
  //   for (var film of notes) {
  //     let clone = document.querySelector('.example').cloneNode(true);
  //     clone.classList.remove('hidden');
  //     let img = clone.getElementsByClassName('poster')[0];
  //     img.src = film.Poster;
  //     name_ = clone.getElementsByClassName('name')[0];
  //     name_.innerText = film.Title;
  //     let year = clone.getElementsByClassName('year')[0];
  //     year.innerText = film.Year;
  //     let imbd_id = clone.getElementsByClassName('imbd_id')[0];
  //     imbd_id.innerText = film.imdbID;
  //     let button_details = clone.getElementsByClassName('button_details')[0];
  //     button_details.addEventListener('click', mediaQueryDetails);
  //     out1.appendChild(clone);
  //   }
  // }
  //
  // function mediaQueryDetails() {
  //   let request = new XMLHttpRequest();
  //   let imbd_id = event.target.parentElement.getElementsByClassName('imbd_id')[0];
  //   let str = "http://www.omdbapi.com/?i="+ imbd_id.innerText+"&plot=full&apikey=ab776285";
  //   request.open("GET", str);
  //   let film;
  //   request.onload = function(){
  //     if(request.status === 200){
  //       film = JSON.parse(request.response);
  //       showFilmDetails(film)
  //     }
  //   }
  //   request.send(film);
  // }
  //
  // function showFilmDetails(film) {
  //   film_details.classList.remove('hidden');
  //   id_title.innerText = film.Title;
  //   released.innerText = film.Released;
  //   genre.innerText = film.Genre;
  //   country.innerText = film.Country;
  //   director.innerText = film.Director;
  //   writer.innerText = film.Writer;
  //   actors.innerText = film.Actors;
  //   awards.innerText = film.Awards;
  //   poster.src = film.Poster;
  // }
  // })();

}
