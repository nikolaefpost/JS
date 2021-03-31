window.onload = function () {

  class MediaQuery1 {
    constructor(url, apikey) {
      this.url = url;
      this.apikey = apikey;
      this.temp='';
    }

    async search (title, type, page_search) {
      let json;
      try {
        let request = await fetch(this.url + '?s=' + title + '&plot=full&page=' + page_search + '&type=' + type + '&apikey=' + this.apikey);
        json = await request.json();
        if (json.Error) throw new Error(json.Error);                   // отрицательные резульаты поиска на сервере
      } catch (err) {

        if (err instanceof SyntaxError) {
          throw new ReadError("Синтаксическая ошибка", err);
        } else {
          preload1.hidden = true;
          throw err;
        }
        try {
          checkResponse(json);
        } catch (err) {

          if (err instanceof ErrorData) {
            json = err;
            preload1.hidden = true;
            throw new ReadError("Ошибка валидации", err);
          } else {
            console.log(err);
            json = err;
            preload1.hidden = true;
            throw err;
          }
        }                                                            // ошибки в процессе исполнения
      }
      if (json.Response) return json.Search;
      else return json.message
    }

    async searchDetails (imbd_id) {
      let json, err_;
      try {
        let request = await fetch(`http:www.omdbapi.com/?i=${imbd_id}&plot=full&apikey=${this.apikey}`)
        json = await request.json();
      } catch (e) {
        json = e;
      }
      if (json.Title) return json;
      else return json.message;
    }
  }

  class ShowFilm {
    constructor() {
      this.page_search = 1;
      this.page = 1;
      this.arrFilms = [];
      this.temp=[];
    }

    async  prepeaFilm (request) {
      preload1.hidden = false;
      this.title = document.forms.media_content.title.value;
      this.type = document.forms.media_content.type.value;
      if (this.temp[0] == this.title && this.temp[1] == this.type && this.temp[2] == this.page_search) return;
      this.temp = [this.title, this.type, this.page_search];
      let films = await requestT.search(this.title, this.type, this.page_search);
      if ((typeof films)=='string'){
        zag.innerHTML+=`<h3 class="error">Server response: ${films}</h3><br>`;
        preload1.hidden = true;
        return;
      }
      if ((typeof films)=='undefined') throw new Error('undefined error');
      this.arrFilms = this.arrFilms.concat(films);
      this.addFilm();
      more.hidden = false;
      preload1.hidden = true;
    }

    addFilm(){
      if (out1.children) out1.innerHTML ='';
      if (this.arrFilms.length/5 < this.page) {
        this.page_search++;
        this.prepeaFilm (requestT)
        return;
      }
      if (zag.children) zag.innerHTML ='';
      zag.innerHTML+='<h3 style="text-align:center;">Films:</h3>';

      for (let i = 0; i < this.page*5; i++) {
        let clone = document.querySelector('.example').cloneNode(true);
        clone.classList.remove('hidden');
        let img = clone.getElementsByClassName('poster')[0];
        img.src = this.arrFilms[i].Poster;
        let name_ = clone.getElementsByClassName('name')[0];
        name_.innerText = this.arrFilms[i].Title;
        let year = clone.getElementsByClassName('year')[0];
        year.innerText = this.arrFilms[i].Year;
        let imbd_id = clone.getElementsByClassName('imbd_id')[0];
        imbd_id.innerText = this.arrFilms[i].imdbID;
        let button_details = clone.getElementsByClassName('button_details')[0];
        clone.addEventListener('click', ()=>this.showFilmDetails(imbd_id.innerText));
        out1.appendChild(clone);
        clone.scrollIntoView(top)
      }
    }

    async showFilmDetails(id) {
      preload2.hidden = false;
      poster.hidden = true;
      text.style.display = 'none';
      area_div.classList.add('hystmodal__opened');
      film_details.classList.remove('hidden');
      let film = await requestT.searchDetails(id);
      if ((typeof film)=='string'){
        text.style.display = '';
        text.innerHTML+=`<h3 class="error">Server response: ${film}</h3><br>`;
        preload2.hidden = true;
        modal_button.addEventListener('click', ()=>this.closeFilmDetails());
        document.body.addEventListener('keydown', ()=>this.closeFilmDetails());
        return;
      }
      if ((typeof film)=='undefined') throw new Error('undefined error');
      preload2.hidden = true;
      poster.hidden = false;
      text.style.display = '';
      id_title.innerText = film.Title;
      released.innerText = film.Released;
      genre.innerText = film.Genre;
      country.innerText = film.Country;
      director.innerText = film.Director;
      writer.innerText = film.Writer;
      actors.innerText = film.Actors;
      awards.innerText = film.Awards;
      poster.src = film.Poster;
      modal_button.addEventListener('click', ()=>this.closeFilmDetails());
      document.body.addEventListener('keydown', ()=>this.closeFilmDetails());
    }

    closeFilmDetails(){
      if (event.type == "click" || event.key == "Escape") {
        area_div.classList.remove('hystmodal__opened');
        film_details.classList.add('hidden');
      }

    }
  }

  class ReadError extends Error {
    constructor(message, err_) {
      super(message);
      this.err_ = err_;
      this.name = 'ReadError';
    }
  }

  class ErrorData extends Error {
    constructor(message) {
      super(message);
      this.name = "ErrorData";
    }
  }

  class PropertyDataError extends ErrorData {
    constructor(property) {
      super("Нет свойства: " + property);
      this.name = "PropertyDataError";
      this.property = property;
    }
  }

function checkResponse(json) {
  if (!json.Response) {
    throw new PropertyRequiredError("Response");
  }

  if (!user.Search) {
    throw new PropertyRequiredError("Search");
  }
}

function readResponse(json) {
  let response;

  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Синтаксическая ошибка", err);
    } else {
      throw err;
    }
  }



}


  let requestT = new MediaQuery1('http://www.omdbapi.com/','ab776285');
  let object = new ShowFilm();
  button.addEventListener('click', ()=>object.prepeaFilm(requestT));
  more.addEventListener('click', ()=>{object.page++; object.addFilm()});

}
