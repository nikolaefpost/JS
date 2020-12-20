


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
      if (this.list[i].name_==name_ && this.list[i].statusShop !='&#10004;') {
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


  function outputFunction2() {
    let p1 = document.getElementById('input8').value;
    let p2 = Number(document.getElementById('input9').value);
    if ((typeof p1)=='string' && p2>0) {                              // выполнится если оба параметра заполнены первый строка второй число >0                   -            добавим продукт в список
      out1.innerHTML=shop.addProduct(p1,p2).showList();
    }
    if ((typeof p1)=='string' && p2=='') {                           // выполнится если один параметр заполнен  строкой второй пропущен (без значения)           -            купим продукт
      out1.innerHTML=shop.buyProduct(p1).showList();
    }
  }
//----------------------------------------------------------------------------------   2е ЗАДАНИЕ  ----------------------------------------------------------------------------------

  function ProductSale(name_, quantity, productPrice) {
    this.name_ = name_;
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productSum = this.quantity*this.productPrice;
  }

  let checkEl1 = new ProductSale('мука', 1, 30);
  let checkEl2 = new ProductSale('яйца', 20, 2);
  let checkEl3 = new ProductSale('масло', 2, 40);
  let checkEl4 = new ProductSale('пиво', 1, 20);


  let storeCheck = [checkEl1, checkEl2, checkEl3, checkEl4];
  function Store_(arr) {
    this.list = arr;
    this.str = '';
    this.sum = 0;
  }
  let store = new Store_(storeCheck);

  Store_.prototype.showList = function () {
    this.str='Чек магазина:<br>';
    for (var i = 0; i < this.list.length; i++) {
      this.str +=(i+1)+'. '+ this.list[i].name_ +'-'+ this.list[i].quantity +'шт.-'+ this.list[i].productPrice +'гр.----'+ this.list[i].productSum +'гр.<br>';
    }
    return this;
  }

  Store_.prototype.calcProductSum = function () {
    this.sum=0;
    this.str += '<hr><br>Итого по чеку: ';
    for (var i = 0; i < this.list.length; i++) {
      this.sum += this.list[i].productSum
    }
    this.str +=this.sum+' гр.';
    return this;
  }

  Store_.prototype.maxProductSum = function () {
    this.list.sort((a, b) => b.productSum - a.productSum);
    this.str +='<hr>самая дорогая покупка:<br>'+this.list[0].name_ +'-'+ this.list[0].quantity +'шт.-'+ this.list[0].productPrice +'гр.----'+ this.list[0].productSum +'гр.<br>';
    return this;
  }

  Store_.prototype.averageCheck = function () {
    this.str += '<hr>средняя стоимость одного товара в чеке: ';
    this.sum=0;
    for (var i = 0; i < this.list.length; i++) {
      this.sum += this.list[i].productSum
    }
    this.str +=this.sum/this.list.length+' гр.';
    return this;
  }

  /*window.onload = function () {
    click1.onclick = function () {out2.innerHTML=store.showList().str;}
    click2.onclick = function () {out2.innerHTML=store.calcProductSum().str;}
    click3.onclick = function () {out2.innerHTML=store.maxProductSum().str;}
    click4.onclick = function () {out2.innerHTML=store.averageCheck().str;}
  }*/


//----------------------------------------------------------------------------------   3е ЗАДАНИЕ  ----------------------------------------------------------------------------------


  function StyleElement(name_, value) {
    this.name_ = name_;
    this.quantity = value;
  }

  style_color = new StyleElement('color', 'red');
  style_font = new StyleElement('font-size', '22px');
  style_align = new StyleElement('text-align', 'center');
  style_dec = new StyleElement('text-decoration', 'underline');
  style_weight = new StyleElement('font-weight', 'bold');

  let styleList = [style_color, style_font, style_align, style_dec, style_weight];

  function StyleObj(arr) {
    this.list = arr;
    this.str = '';
  }
  style_obj = new StyleObj(styleList);
  console.log(style_obj.list[0].quantity);

  StyleObj.prototype.formation = function () {
    this.str += 'style="';
    for (var i = 0; i < this.list.length; i++) {
      this.str +=this.list[i].name_+':'+this.list[i].quantity+'; '
    }
    this.str +='"';
    return this;
  }

  StyleObj.prototype.show = function (text) {
    text='<p '+this.str+'>'+text+'</p>'
    document.write(text);
  }
  let userText ='Это третье домашнее задание JS_DZ_2_Modul_2_Week_7.js. &#160; Текст должен быть жирным, красным, подчеркнутым, размером 22 пикселя и выровнен по центру.'
  style_obj.formation().show(userText);

  //----------------------------------------------------------------------------------   4е ЗАДАНИЕ  ----------------------------------------------------------------------------------


  class Audience {
    constructor(number, seats, faculty) {
    this.number = number;
    this.seats = seats;
    this.faculty = faculty;
    }
  }

  audience1 = new Audience('№1',16 ,'front-end');
  audience2 = new Audience('№2',8 ,'front-end');
  audience3 = new Audience('№3',6 ,'front-end');
  audience4 = new Audience('№4',20 ,'back-end');
  audience5 = new Audience('№5',12 ,'back-end');
  audience6 = new Audience('№6',6 ,'back-end');
  audience7 = new Audience('№7',18 ,'design');
  audience8 = new Audience('№8',10 ,'design');
  audience9 = new Audience('№9',12 ,'design');

  let audienceList = [audience1, audience2, audience3, audience4, audience5, audience6, audience7, audience8, audience9];

  class AudienceObj {
    constructor(arr) {
      this.list = arr;
      this.str = '';
    }

    showList(faculty) {
      this.str='Список аудиторий:<br>';
      for (var i = 0; i < this.list.length; i++) {
        console.log(faculty);
        if(faculty&&this.list[i].faculty!=faculty) {continue;}
        this.str +=(i+1)+'. аудитория: '+ this.list[i].number +'- кол-во мест: '+ this.list[i].seats +' факультет: '+ this.list[i].faculty +'<br>';
      }
      return this;
    }

    showGroup(obj) {
      this.str='Список аудиторий для группы-'+obj.name_+': <br>';
      for (var i = 0; i < this.list.length; i++) {
        console.log(this.list[i].faculty!=obj.faculty && this.list[i].seats<obj.students);
        if(this.list[i].faculty==obj.faculty && this.list[i].seats>obj.students) {
          this.str +=(i+1)+'. аудитория: '+ this.list[i].number +'- кол-во мест: '+ this.list[i].seats +' факультет: '+ this.list[i].faculty +'<br>';
        }
      }
      return this;
    }

    sortGroupSeats(){
      this.list.sort((a,b) => {if (a.seats < b.seats) return 1; if (a.seats > b.seats) return -1; else  return 0; } );
      return this;
    }
    sortNameFaculty(){
      this.list.sort((a,b) => {if (a.faculty > b.faculty) return 1; if (a.faculty < b.faculty) return -1; else  return 0; } );
      return this;
    }

  }

  class Group  {
    constructor(name_, students, faculty) {
      this.name_ = name_;
      this.students = students;
      this.faculty = faculty;
    }
  }
  let front_end = new Group('F02',7,'front-end' )
  let audienceObj_ = new AudienceObj (audienceList);

  window.onload = function () {
    click1.onclick = function () {out2.innerHTML=store.showList().str;}
    click2.onclick = function () {out2.innerHTML=store.calcProductSum().str;}
    click3.onclick = function () {out2.innerHTML=store.maxProductSum().str;}
    click4.onclick = function () {out2.innerHTML=store.averageCheck().str;}

    click5.onclick = function () {out3.innerHTML=audienceObj_.showList().str;}
    click6.onclick = function () {
      let p1 = 0;
      if (document.getElementById('input41').value) p1 = document.getElementById('input41').value;
      out3.innerHTML=audienceObj_.showList(p1).str;
    }
    click7.onclick = function () {out3.innerHTML=audienceObj_.showGroup(front_end).str;}
    click8.onclick = function () {out3.innerHTML=audienceObj_.sortGroupSeats().showList().str;}
    click9.onclick = function () {out3.innerHTML=audienceObj_.sortNameFaculty().showList().str;}
  }
