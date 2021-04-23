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
    // })


  })
// window.onload=function () {
//   $('div').css({'color':'red'});
// }


class CharactersState {
  constructor() {
    this.characters;
  }
  change(info) {
    console.log(info);
    this.characters = info;
  }
}

class CharactersModel {
  constructor(page = 0) {
    this.page = page;
    this.url = `https://itunes.apple.com/search?term=marilyn+manson`;
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

class CharactersListView {
  constructor() {
    let charactersContainer = document.createElement("div");
    charactersContainer.classList.add("list");
    this.result = charactersContainer;
  }
  update(cs) {
    this.result.innerHTML = "";
    cs.characters.forEach((c) => {
      this.result.append(new CharactersItemListView(c).print());
    });
  }
  print() {
    return this.result;
  }

}

class CharactersItemListView {
  constructor(character) {
    let characterContainer = document.createElement("div");
    characterContainer.classList.add("card");
    characterContainer.classList.add("card-1");

    let imageContainer = document.createElement("img");
    imageContainer.src = character.artworkUrl100;
    imageContainer.classList.add("image");

    let infoContainer = document.createElement("div");
    infoContainer.classList.add("info");

    let nameContainer = document.createElement("p");
    nameContainer.innerText = character.artistName;
    nameContainer.classList.add("name");

    let statusContainer = document.createElement("p");
    statusContainer.innerHTML = `Album: <span style=color:${
      character.status === "Alive" ? "green" : "red"
    }>${character.collectionName}</span>`;
    statusContainer.classList.add("status");

    let speciesContainer = document.createElement("p");
    speciesContainer.innerText = "Track name: " + character.trackName;
    speciesContainer.classList.add("species");

    infoContainer.append(nameContainer, statusContainer, speciesContainer);

    characterContainer.append(imageContainer, infoContainer);
    this.result = characterContainer;
  }
  print() {
    return this.result;
  }
}

class DetailsView {
  constructor(character) {

  }
}

class CharactersUpdateController {
  constructor(charactersListView, charactersModel, charactersState) {
    this.charactersListView = charactersListView;
    this.charactersModel = charactersModel;
    this.charactersState = charactersState;

    (async () => {
      this.charactersState.change(await this.charactersModel.next());
      this.charactersListView.update(this.charactersState);
    })();
    let contr = this;
    $(this.charactersListView.result).scroll(contr, async  function () {
    if  ($(this).scrollTop()>(contr.charactersState.characters.length-1)*
    contr.charactersListView.result.firstChild.clientHeight-
    contr.charactersListView.result.clientHeight) {
      contr.charactersState.change(await contr.charactersModel.next());
      contr.charactersListView.update(contr.charactersState);
    }});
    console.log();
  }
}

/////////////////////////////////////////////////////////////////////
let cs = new CharactersState();
let cm = new CharactersModel();
let clv = new CharactersListView();
let cuc = new CharactersUpdateController(clv, cm, cs);

$(document.body).append(clv.result);
