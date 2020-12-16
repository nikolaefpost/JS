


  function Product(name_, quantity, statusShop) {
    this.name_ = name_;
    this.quantity = quantity;
    this.statusShop = statusShop;
  }

  let shop1 = new Product('мука', 1, '&#10004;');
  let shop2 = new Product('яйца', 20, '&#10066;');
  let shop3 = new Product('масло', 2, '&#10004;');
  let shop4 = new Product('пиво', 1, '&#10066;');


  let shoppingList = [shop1, shop2, shop3, shop4];
  function Shop_(arr) {
    this.list = arr;
  }
  let shop = new Shop_(shoppingList);

  Shop_.prototype.showList = function () {
    this.list.sort((a,b) => {if (a.statusShop > b.statusShop) return 1; if (a.statusShop < b.statusShop) return -1; else  return 0; } );
    let str='Список покупок:<br>';
    for (var i = 0; i < this.list.length; i++) {
      str +=this.list[i].name_+'-' +this.list[i].quantity+'-' +this.list[i].statusShop+'<br>'
    }
    return str
  }

  Shop_.prototype.addProduct = function (name_, quantity) {
    let k=0;
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].name_==name_) {
        this.list[i].quantity+=+quantity;
        k++;
      }
    }
    if (k>0) { return this;}
    else {
      this.list[this.list.length]=new Product(name_, quantity, '&#10066;');
      return this;
    }
  }

  Shop_.prototype.buyProduct = function (name_) {
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
    let p1 = document.getElementById('input8').value;
    let p2 = Number(document.getElementById('input9').value);
    if ((typeof p1)=='string' && p2>0) {
      out1.innerHTML=shop.addProduct(p1,p2).showList();
    }
    if ((typeof p1)=='string' && p2=='') {
      out1.innerHTML=shop.buyProduct(p1).showList();
    }
  }
