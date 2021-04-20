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

    $('.your-class').slick({
    setting-name: setting-value
  });
  })
// window.onload=function () {
//   $('div').css({'color':'red'});
// }


class CharactersState {
  constructor() {
    this.characters = [];
  }
  change(info) {
    this.characters.push(...info.results);
  }
}

class CharactersModel {
  constructor(page = 1) {
    this.page = page;
    this.initPage = page;
    this.url = `https://rickandmortyapi.com/api/character/?page=`;
    this.currentInfo = null;
    this.isEnd = false;
    this.countPages = 1;
  }
  async next() {
    if (!this.isEnd) {
      let result = await fetch(this.url + this.page);
      this.currentInfo = await result.json();
      if (this.page === this.initPage)
        this.countPages = this.currentInfo.info.pages;
      this.page++;
    }
    if (this.page === this.countPages + 1) this.isEnd = true;
    return this.currentInfo;
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
    imageContainer.src = character.image;
    imageContainer.classList.add("image");

    let infoContainer = document.createElement("div");
    infoContainer.classList.add("info");

    let nameContainer = document.createElement("p");
    nameContainer.innerText = character.name;
    nameContainer.classList.add("name");

    let statusContainer = document.createElement("p");
    statusContainer.innerHTML = `Status: <span style=color:${
      character.status === "Alive" ? "green" : "red"
    }>${character.status}</span>`;
    statusContainer.classList.add("status");

    let speciesContainer = document.createElement("p");
    speciesContainer.innerText = "Species: " + character.species;
    speciesContainer.classList.add("species");

    infoContainer.append(nameContainer, statusContainer, speciesContainer);

    characterContainer.append(imageContainer, infoContainer);
    this.result = characterContainer;
  }
  print() {
    return this.result;
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
    this.charactersListView.result.addEventListener("scroll", async (e) => {
      if (
        this.charactersListView.result.scrollTop >
        this.charactersState.characters.length * 80
      ) {
        this.charactersState.change(await this.charactersModel.next());
        this.charactersListView.update(this.charactersState);
      }
    });
  }
}

/////////////////////////////////////////////////////////////////////
let cs = new CharactersState();
let cm = new CharactersModel();
let clv = new CharactersListView();
let cuc = new CharactersUpdateController(clv, cm, cs);

document.body.append(clv.result);
