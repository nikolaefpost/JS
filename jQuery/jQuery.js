  jQuery(function() {
    // $(':button[name="ww"]').on('mouseenter', function functionName() {
    //   $(this).fadeOut(3000);
    //   $(this).delay(3000)
    //   $(this).fadeIn(3000)
    //   $(this).animate({'width': '200px'}, 2000);
    //    console.log($(this).attr('name'));
    // })
    // $(window).resize(function () {
    //   let width = $(this).width();
    //   console.log(width);
    // })251375


  })
// window.onload=function () {
//   $('div').css({'color':'red'});
// }


class ClipsState {
  constructor() {
    this.clips;
  }
  change(info) {
    this.clips = info; console.log(this.clips);
  }
}

class ClipsModel {
  constructor(page = 0) {
    this.page = page;
    this.url = `https://itunes.apple.com/search?term=marilyn+manson&entity=musicVideo`;
    this.currentInfo = null;
    this.isEnd = false;
  }
  async next() {
    if (!this.isEnd) {
      let result = await fetch(this.url);
      this.currentInfo = await result.json();
      this.isEnd = true;
    }
    this.page++;
    let i = (this.page*20>this.currentInfo.results.length)? this.currentInfo.results.length-1 :this.page*20;
    return this.currentInfo.results.slice(0, i);
  }
}


///////////////////////////////////////////////////////////////////////

class ClipsListView {
  constructor() {
    let clipsContainer = document.createElement("div");
    clipsContainer.classList.add("list");
    this.result = clipsContainer;
  }
  update(cs) {
    let i=0;
    this.result.innerHTML = "";
    cs.clips.forEach((c) => {
      let element = new ClipsItemListView(c);
      element.result.lastChild.setAttribute('data-index', i);
      i++
      this.result.append(element.print());
    });
  }

  showDetails(c){
    this.element = new DetailsView(c);
    document.body.append(this.element.print());
  }
  print() {
    return this.result;
  }
}

class ClipsItemListView {
  constructor(clip) {
    let clipContainer = document.createElement("div");
    clipContainer.classList.add("card");
    clipContainer.classList.add("card-1");

    let divContainer = document.createElement("div");
    divContainer.classList.add("flex1");

    let imageContainer = document.createElement("img");
    imageContainer.src = clip.artworkUrl100;
    imageContainer.classList.add("image");

    let infoContainer = document.createElement("div");
    infoContainer.classList.add("info");

    let nameContainer = document.createElement("p");
    nameContainer.innerText = clip.artistName;
    nameContainer.classList.add("name");

    let statusContainer = document.createElement("p");
    statusContainer.innerHTML = `track: <span style=color:${
      clip.status === "Alive" ? "green" : "red"
    }>${clip.trackName}</span>`;
    statusContainer.classList.add("status");

    let speciesContainer = document.createElement("p");
    speciesContainer.innerHTML ='date: '+ new Date(clip.releaseDate).toLocaleDateString()
    speciesContainer.classList.add("species");

    infoContainer.append(nameContainer, statusContainer, speciesContainer);
    divContainer.append(imageContainer, infoContainer)
    let buttonContainer = document.createElement("button");
    buttonContainer.classList.add("button_more");
    buttonContainer.innerText ='more';

    clipContainer.append(divContainer, buttonContainer);
    this.result = clipContainer;
  }
  print() {
    return this.result;
  }
}

class DetailsView {
  constructor(clip) {
    let detailsContainer = document.createElement("div");
    detailsContainer.classList.add("film_details");

    let movieContainer = document.createElement("div");
    movieContainer.classList.add("movie");

    let imageContainer = document.createElement("img");
    imageContainer.src = 'marilyn-manson-01.jpg';
    imageContainer.classList.add("poster1");

    let iframeContainer;
    if (clip.previewUrl) {
      iframeContainer = document.createElement("iframe");
      iframeContainer.src = clip.previewUrl;
    }
    else {
      iframeContainer = document.createElement("div");
      let img = document.createElement("img");
      img.src = clip.artworkUrl100;
      img.classList.add("poster2");
      iframeContainer.append(img);
    }
    iframeContainer.classList.add("player");

    let aContainer = document.createElement("a")
    aContainer.href = clip.trackViewUrl;
    aContainer.classList.add("value");
    aContainer.innerHTML = '<img src="itunes-app-store-logo.png" width="160">';

    movieContainer.append(imageContainer, aContainer);

    let infoContainer = document.createElement("div");
    infoContainer.classList.add("description1");

    let textContainer = document.createElement("div");
    textContainer.classList.add("flex_column");

    let textDataContainer = document.createElement("div");

    let artistContainer = document.createElement("p");
    artistContainer.innerText =clip.artistName;
    artistContainer.classList.add("value_cap");

    let trackContainer = document.createElement("p");
    trackContainer.innerHTML = clip.trackName + '<span> :track</span>';
    trackContainer.classList.add("value");

    let genreContainer = document.createElement("p");
    genreContainer.innerHTML =clip.primaryGenreName + '<span> :genre</span>';
    genreContainer.classList.add("value");

    let dateContainer = document.createElement("p");
    dateContainer.innerHTML =new Date(clip.releaseDate).toLocaleDateString() + '<span> :date</span>';
    dateContainer.classList.add("value");

    let countryContainer = document.createElement("p");
    countryContainer.innerHTML =clip.country + '<span> :country</span>';
    countryContainer.classList.add("value");

    textDataContainer.append(trackContainer, genreContainer, countryContainer, dateContainer)
    textContainer.append(artistContainer, textDataContainer)
    infoContainer.append(textContainer,  iframeContainer);


    this.buttonContainer = document.createElement("button");
    this.buttonContainer.innerText ='x';
    this.buttonContainer.classList.add("close");
    this.buttonContainer.type = 'button';

    detailsContainer.append(movieContainer, infoContainer, this.buttonContainer);
    this.result = detailsContainer;
  }
  print() {
    return this.result;
  }
}

class ClipsUpdateController {
  constructor(clipsListView, clipsModel, clipsState) {
    this.clipsListView = clipsListView;
    this.clipsModel = clipsModel;
    this.clipsState = clipsState;

    (async () => {
      this.clipsState.change(await this.clipsModel.next());
      this.clipsListView.update(this.clipsState);
    })();

    let contr = this;
    $(this.clipsListView.result).scroll(contr, async  function () {
      if  ($(this).scrollTop()>(contr.clipsState.clips.length-1)*
      contr.clipsListView.result.firstChild.clientHeight-
      contr.clipsListView.result.clientHeight) {
        contr.clipsState.change(await contr.clipsModel.next());
        contr.clipsListView.update(contr.clipsState);
    }});

    $(this.clipsListView.result).click(contr, async  function () {
      let i = event.target.dataset.index;
      contr.clipsListView.showDetails(contr.clipsState.clips[i]);
      contr.clipsListView.result.classList.add("hystmodal__opened");
      $('.close').click(()=>contr.close())
    });
  }

  close(){
    this.clipsListView.result.classList.remove("hystmodal__opened");
    $('.film_details').remove();
  }
}

/////////////////////////////////////////////////////////////////////
let cs = new ClipsState();
let cm = new ClipsModel();
let clv = new ClipsListView();
let cuc = new ClipsUpdateController(clv, cm, cs);

$(document.body).append(clv.result);
