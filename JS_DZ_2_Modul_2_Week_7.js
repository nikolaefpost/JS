


  function Product(name_, quantity, statusShop) {
    this.name_ = name_;
    this.quantity = quantity;
    this.statusShop = statusShop;
  }

  let shop1 = new Product('мука ', 1, '&#10004;');
  let shop2 = new Product('яйца ', 20, '&#10066;');
  let shop3 = new Product('масло', 2, '&#10004;');
  let shop4 = new Product('пиво ', 1, '&#10066;');


  let shoppingList = [shop1, shop2, shop3, shop4];
  let shop = { list:shoppingList };

  shop.showList = function () {
    this.list.sort((a,b) => {if (a.statusShop > b.statusShop) return 1; else  return -1; } );
    let str='Список покупок:<br>';
    for (var i = 0; i < this.list.length; i++) {
      str +=this.list[i].name_+'-' +this.list[i].quantity+'-' +this.list[i].statusShop+'<br>'
    }
    return str
  }

  shop.addProduct = function (name_, quantity) {
    let k=0;
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].name_==name_) {
        this.list[i].quantity+=quantity;
        k++;
      }
    }
    if (k>0) { return this;}
    else {
      this.list[this.list.length]=new Product(name_, quantity, '&#10066;');
      return this;
    }
  }

  shop.buyProduct = function (name_) {
    let k=0;
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].name_==name_ && this.list[i].statusShop=='&#10066;') {
        this.list[i].statusShop='&#10004;';
        k++;
      }
    }
    if(k==0) alert('такого продукта нет в списке!')
    return this;
  }


  function outputFunction1() {

    out1.innerHTML=shop.addProduct('сыр ',1).buyProduct('пиво ').showList();
  }
