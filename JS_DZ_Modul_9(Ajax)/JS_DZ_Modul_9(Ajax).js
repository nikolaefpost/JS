window.onload = function () {

  class MediaQuery {
    constructor(url, apikey) {
      this.url = url;
      this.apikey = apikey;
      this.temp='';
    }
  }

  MediaQuery.prototype.dataRequest = async function   dataRequest(title, type, page_search, callback) {
    let request = await fetch(this.url + '?s=' + title + '&plot=full&page=' + page_search + '&type=' + type + '&apikey=' + this.apikey);
    let json = await request.json();
    callback(json.Search);
  }

  MediaQuery.prototype.dataRequestDetails = async function  dataRequestDetails (imbd_id, callback) {
    let request = await fetch(`http:www.omdbapi.com/?i=${imbd_id}&plot=full&apikey=${this.apikey}`)
    let  json = await request.json();
    callback(json);
    }


  class Controler {
    constructor(mediaQuery, interactionDOM) {
      this.mediaQuery = mediaQuery;
      this.interactionDOM = interactionDOM;
      this.page_search = 1;
      this.page = 1;
      this.arrFilms = [];
      this.temp=[];
      this.interactionDOM.button_search.addEventListener('click', ()=>this.search());
    }

  }

  Controler.prototype.search = function search(){
    this.title = this.interactionDOM.form_title.value;
    this.type = this.interactionDOM.form_type.value;
    this.mediaQuery.dataRequest(this.title, this.type, this.page_search, this.prepeaFilm.bind(this))
  }

  Controler.prototype.searchDetails = function searchDetails(imbd_id){
    this.mediaQuery.dataRequestDetails(imbd_id, this.prepeaFilmDetails.bind(this))
  }

  Controler.prototype.prepeaFilm = async function  prepeaFilm(request) {
      this.interactionDOM.preload1.hidden = false;
      if (this.temp[0] == this.title && this.temp[1] == this.type && this.temp[2] == this.page_search && this.temp[3] == this.page) { this.interactionDOM.preload1.hidden = true; return };
      if (this.temp[0] != this.title || this.temp[1] != this.type) { this.arrFilms =[]; this.interactionDOM.out1.innerHTML ='';}
      this.temp = [this.title, this.type, this.page_search, this.page];
      this.arrFilms = this.arrFilms.concat(request);
      if (this.arrFilms.length/5 < this.page) {
        this.page_search++;
        this.search();
        return;
      }
      this.interactionDOM.searchDetails = this.searchDetails.bind(this);
      this.interactionDOM.render(this.arrFilms, this.page);
      this.interactionDOM.more.addEventListener('click', ()=>{this.page++; this.prepeaFilm()});
      this.interactionDOM.more.hidden = false;
      this.interactionDOM.preload1.hidden = true;
    }

    Controler.prototype.prepeaFilmDetails = async function  prepeaFilmDetails(film){
      this.interactionDOM.renderDetails(film);
    }


    class InteractionDOM {
      constructor(dom_obj) {
        console.log(dom_obj);
        this.button_search = dom_obj.button_search;
        this.form_title = dom_obj.form_title;
        this.form_type = dom_obj.form_type;
        this.area_div = dom_obj.area_div_id;
        this.more = dom_obj.button_id;
        this.preload1 = dom_obj.preload1_id;
        this.zag = dom_obj.heading_id;
        this.out1 = dom_obj.out_id;
        this.clone_class = dom_obj.clone_class;
        this.poster_class = dom_obj.poster_class;
        this.name_class = dom_obj.name_class;
        this.year_class = dom_obj.year_class;
        this.imbd_id_class = dom_obj.imbd_id_class;
        this.button_details_class = dom_obj.button_details_class;
        this.film_details = dom_obj.film_details_id;
        this.preload2 = dom_obj.preload2_id;
        this.hystmodal__opened_class = dom_obj.hystmodal__opened_class;
        this.poster = dom_obj.poster_id;
        this.text = dom_obj.text_id;
        this.title = dom_obj.title_id;
        this.released = dom_obj.released_id;
        this.genre = dom_obj.genre_id;
        this.country = dom_obj.country_id;
        this.director = dom_obj.director_id;
        this.writer = dom_obj.writer_id;
        this.actors = dom_obj.actors_id;
        this.awards = dom_obj.awards_id;
        this.modal_button = dom_obj.modal_button_id;
      }
    }

    InteractionDOM.prototype.render = function  render(arrFilms, page){
      console.log(page);
      if (this.zag.children.length == 0) zag.innerHTML+='<h3 style="text-align:center;">Films:</h3>';
      for (let i = (page-1)*5; i < page*5; i++) {
        let clone = document.querySelector(this.clone_class).cloneNode(true);
        clone.classList.remove('hidden');
        let img = clone.getElementsByClassName(this.poster_class)[0];
        img.src = arrFilms[i].Poster;
        let name_ = clone.getElementsByClassName(this.name_class)[0];
        name_.innerText = arrFilms[i].Title;
        let year = clone.getElementsByClassName(this.year_class)[0];
        year.innerText = arrFilms[i].Year;
        let imbd_id = clone.getElementsByClassName(this.imbd_id_class)[0];
        imbd_id.innerText = arrFilms[i].imdbID;
        let button_details = clone.getElementsByClassName(this.button_details_class)[0];
        clone.addEventListener('click', ()=>this.searchDetails(imbd_id.innerText));
        this.out1.appendChild(clone);
        clone.scrollIntoView(top)
      }
    }



    InteractionDOM.prototype.renderDetails = function  renderDetails(film) {                                               // ghjdthrf
      this.preload2.hidden = false;
      this.poster.hidden = true;
      this.text.style.display = 'none';
      this.area_div.classList.add(this.hystmodal__opened_class);
      this.film_details.classList.remove('hidden');
      this.preload2.hidden = true;
      this.poster.hidden = false;
      this.text.style.display = '';
      this.title.innerText = film.Title;
      this.released.innerText = film.Released;
      this.genre.innerText = film.Genre;
      this.country.innerText = film.Country;
      this.director.innerText = film.Director;
      this.writer.innerText = film.Writer;
      this.actors.innerText = film.Actors;
      this.awards.innerText = film.Awards;
      this.poster.src = film.Poster;
      this.modal_button.addEventListener('click', ()=>this.closeFilmDetails());
      document.body.addEventListener('keydown', ()=>this.closeFilmDetails());
    }

    InteractionDOM.prototype.closeFilmDetails = function    closeFilmDetails(){
      if (event.type == "click" || event.key == "Escape") {
        this.area_div.classList.remove('hystmodal__opened');
        this.film_details.classList.add('hidden');
      }
    }



    let dom_obj = {
      button_search: button,
      form_title: title,
      form_type: type,
      area_div_id: area_div,
      button_id: more,
      preload1_id: preload1,
      heading_id: zag,
      out_id: out1,
      clone_class: '.example',
      poster_class: 'poster',
      name_class: 'name',
      year_class: 'year',
      imbd_id_class: 'imbd_id',
      button_details_class: 'button_details',
      film_details_id: film_details,
      preload2_id: preload2,
      hystmodal__opened_class: 'hystmodal__opened',
      text_id: text,
      poster_id: poster,
      title_id: id_title,
      released_id: released,
      genre_id: genre,
      country_id: country,
      director_id: director,
      writer_id: writer,
      actors_id: actors,
      awards_id: awards,
      modal_button_id: modal_button,
    }
  let mediaQuery = new MediaQuery('http://www.omdbapi.com/','ab776285');
  let interactionDOM = new InteractionDOM(dom_obj);
  let controller = new Controler(mediaQuery, interactionDOM);
  // button.addEventListener('click', ()=>controller.search());


}
