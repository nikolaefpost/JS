window.onload = function () {
    var PenguinModel = function PenguinModel(XMLHttpRequest) {
      this.XMLHttpRequest = XMLHttpRequest;
    };

    PenguinModel.prototype.getPenguin = function getPenguin(index, fn) {
      var oReq = new this.XMLHttpRequest();

      oReq.onload = function onLoad(e) {
        console.log(e);

        var ajaxResponse = JSON.parse(e.currentTarget.responseText).Search;

        var penguin = ajaxResponse[index];

        penguin.index = index;
        penguin.count = ajaxResponse.length;
        console.log(penguin);
        fn(penguin);
      };

      oReq.open('GET', "http://www.omdbapi.com/?s=war&plot=full&page=1&type=movie&apikey=ab776285", true);
      oReq.send();
    };

    var PenguinView = function PenguinView(element) {
      this.element = element;

      this.onClickGetPenguin = null;
    };

    PenguinView.prototype.render = function render(viewModel) {
      console.log(this);
      this.element.innerHTML = '<h3>' + viewModel.name + '</h3>' +
        '<img class="penguin-image" src="' + viewModel.imageUrl +
          '" alt="' + viewModel.name + '" />' +
        '<p><b>Size:</b> ' + viewModel.size + '</p>' +
        '<p><b>Favorite food:</b> ' + viewModel.favoriteFood + '</p>' +
        '<a id="previousPenguin" class="previous button" href="javascript:void(0);"' +
          ' data-penguin-index="' + viewModel.previousIndex + '">Previous</a> ' +
        '<a id="nextPenguin" class="next button" href="javascript:void(0);"' +
          ' data-penguin-index="' + viewModel.nextIndex + '">Next</a>';

      this.previousIndex = viewModel.previousIndex;
      this.nextIndex = viewModel.nextIndex;
      console.log(this);

      var previousPenguin = this.element.querySelector('#previousPenguin');
      previousPenguin.addEventListener('click', this.onClickGetPenguin);

      var nextPenguin = this.element.querySelector('#nextPenguin');
      nextPenguin.addEventListener('click', this.onClickGetPenguin);
    };

    var PenguinController = function PenguinController(penguinView, penguinModel) {
      this.penguinView = penguinView;
      this.penguinModel = penguinModel;
    };

    PenguinController.prototype.initialize = function initialize() {
      console.log(this);
      this.penguinView.onClickGetPenguin = this.onClickGetPenguin.bind(this);
    };

    PenguinController.prototype.onClickGetPenguin = function onClickGetPenguin(e) {
      var target = e.currentTarget;
      var index = parseInt(target.dataset.penguinIndex, 10);
      console.log(this.penguinModel);
      this.penguinModel.getPenguin(index, this.showPenguin.bind(this));
    };

    PenguinController.prototype.showPenguin = function showPenguin(penguinModelData) {
      console.log(penguinModelData);
      var penguinViewModel = {
        name: penguinModelData.Title,
        imageUrl: penguinModelData.Poster,
        size: penguinModelData.Year,
        favoriteFood: penguinModelData.Type
      };

      penguinViewModel.previousIndex = penguinModelData.index - 1;
      penguinViewModel.nextIndex = penguinModelData.index + 1;

      if (penguinModelData.index === 0) {
        penguinViewModel.previousIndex = penguinModelData.count - 1;
      }

      if (penguinModelData.index === penguinModelData.count - 1) {
        penguinViewModel.nextIndex = 0;
      }
     this.penguinView.render(penguinViewModel);
    };

    var penguinModel = new PenguinModel(XMLHttpRequest);
    console.dir(XMLHttpRequest);

    var targetElement = document.getElementById('listOfPenguins');
    var penguinView = new PenguinView(targetElement);

    var controller = new PenguinController(penguinView, penguinModel);

    controller.initialize();

    controller.onClickGetPenguin({ currentTarget: { dataset: { penguinIndex: 0 } } });
}
