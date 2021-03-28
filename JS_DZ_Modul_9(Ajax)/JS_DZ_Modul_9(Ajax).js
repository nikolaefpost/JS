window.onload = function () {

  class MediaQuery1 {
    constructor(url, apikey) {
      this.url = url;
      this.apikey = apikey;
      this.momie;
    }
    async search (title, type, page_search) {
      this.request = await fetch(this.url + '?s=' + title + '&plot=full&page=' + page_search + '&type=' + type + '&apikey=' + this.apikey)
      .then(search=> search.json());
      return this.request.Search;
    }
  }

  let requestT = new MediaQuery1('http://www.omdbapi.com/','ab776285');


  class ShowFilm {
    constructor() {
      this.page_search = 1;
      this.page = 1;
      this.arrFilms = [];
      this.temp=0;
    }

    async prepeaFilm (request) {
      this.title = document.forms.media_content.title.value;
      this.type = document.forms.media_content.type.value;
      request.search(this.title, this.type, this.page_search).then((films)=>{
        this.arrFilms = this.arrFilms.concat(films);

         (this.page>1)? this.addFilm(): this.addFilm();
      });
      more.hidden = false;
      more.addEventListener('click', ()=>{this.page++; this.addFilm()});
    }

    addFilm(){
      if (out1.children) out1.innerHTML ='';
      console.log(this.page);
      console.log(this.arrFilms.length);


      // this.page++;
      console.log(this.arrFilms.length/5 < this.page);

      if (this.arrFilms.length/5 < this.page) {
        this.page_search++;
        // this.page--;
        console.log(this.page);
        this.prepeaFilm (requestT)
        return;
      }


      for (let i = 0; i < this.page*5; i++) {
        let clone = document.querySelector('.example').cloneNode(true);
            clone.classList.remove('hidden');
            let img = clone.getElementsByClassName('poster')[0];
            img.src = this.arrFilms[i].Poster;
          let  name_ = clone.getElementsByClassName('name')[0];
            name_.innerText = this.arrFilms[i].Title;
            let year = clone.getElementsByClassName('year')[0];
            year.innerText = this.arrFilms[i].Year;
            let imbd_id = clone.getElementsByClassName('imbd_id')[0];
            imbd_id.innerText = this.arrFilms[i].imdbID;
            let button_details = clone.getElementsByClassName('button_details')[0];
            // button_details.addEventListener('click', mediaQueryDetails);
            out1.appendChild(clone);
      }

      console.log(this.page);
      console.log(this.arrFilms.length);
    }


  }
button.addEventListener('click', ()=>new ShowFilm().prepeaFilm(requestT));
  // let fils = new ShowFilm().prepeaFilm(new MediaQuery1('http://www.omdbapi.com/','ab776285'));









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































}
