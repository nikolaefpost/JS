


  function Shopping(name_, quantity, statusShop) {
    this.name_ = name_;
    this.quantity = quantity;
    this.statusShop = statusShop;
  }

  let shop1 = new Shopping('мука', 1, '&#10004;');
  let shop2 = new Shopping('яйца', 20, '&#10066;');
  let shop3 = new Shopping('масло', 2, '&#10004;');
  let shop4 = new Shopping('пиво', 1, '&#10066;');


  let shoppingList = [shop1, shop2, shop3, shop4];

  Array.prototype.showList = function () {
    this.sort((a,b) => {if (a.statusShop > b.statusShop) return 1; else  return -1; } );
    let str='Список покупок:<br>';
    for (var i = 0; i < this.length; i++) {
      str +=this[i].name_+'-' +this[i].quantity+'-' +this[i].statusShop+'<br>'
    }
    return str
  }

  Array.prototype.addProduct = function (name_, quantity) {
    let k=0;
    for (var i = 0; i < this.length; i++) {
      if (this[i].name_==name_) {
        this[i].quantity+=quantity;
        k++;
      }
    }
    if (k>0) { return this;}
    else {
      this[this.length]=new Shopping(name_, quantity, '&#10066;');
      return this;
    }
  }

  Array.prototype.buyProduct = function (name_) {
    let k=0;
    for (var i = 0; i < this.length; i++) {
      if (this[i].name_==name_ && this[i].statusShop=='&#10066;') {
        this[i].statusShop='&#10004;';
        k++;
      }
    }
    if(k==0) alert('такого продукта нет в списке!')
    return this;
  }


  function outputFunction1() {

    out1.innerHTML=shoppingList.addProduct('водка',20).buyProduct('пиво').showList();
  }
