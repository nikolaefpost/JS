
  class StringObj {
    constructor(str) {
      this.str = str;
      this.rezalt ='';
    }

    showInfo(){                                                                 // метод вывода информации о строке
      let k=0, l=0, m=0;
      for (var i = 0; i < this.str.length; i++) {
        if(Number(this.str[i])) k++;
        if(this.str.charCodeAt(i)>64&&this.str.charCodeAt(i)<91 || this.str.charCodeAt(i)>96 && this.str.charCodeAt(i)<123 ||
        this.str.charCodeAt(i)>1039 &&this.str.charCodeAt(i)<1104 || this.str.charCodeAt(i)==1025 || this.str.charCodeAt(i)==1105 ){
          l++;
        }
      }
      m = this.str.length - k -l;
      this.rezalt = `В данной строке ${k} цифр(ы), ${l} букв(ы) и ${m} других символов.`;
      return this;
    }

    numberToText(){                                                             // метод преобразования числа из цифры в слова
      if (this.str.length>3 || !(Number(this.str)) ) {this.rezalt='Введите число не болбше 3х знаков!'; return this;}
      if (this.str.length==2) this.str='0'+ this.str;
      if (this.str.length==1) this.str='00'+ this.str;
      let units = [
        ['',' один',' два',' три',' четыре',' пять',' шесть',' семь',' восемь',' девять'],
        [' десять',' одиннадцать',' двенадцать',' тринадцать',' четырнадцать',' пятнадцать',' шестнадцать',' семнадцать',' восемнадцать',' девятнадцать'],
        ['','',' двадцать',' тридцать',' сорок',' пятьдесят',' шестьдесят',' семьдесят',' восемьдесят',' девяносто'],
        ['',' сто',' двести',' триста',' четыреста',' пятьсот',' шестьсот',' семьсот',' восемьсот',' девятьсот'],
      ];
      if (9<(this.str%100)&&(this.str%100)<20) this.rezalt = units[3][this.str[0]] + units[1][this.str[2]];
      else this.rezalt = units[3][this.str[0]] + units[2][this.str[1]] + units[0][this.str[2]];
      return this;
    }

    replaceStr(){                                             //метод заменяет числа на нижнее подчеркивание, заглавные буквы преобразует в строчные и на оборот
      for (var i = 0; i < this.str.length; i++) {
        if (this.str.charCodeAt(i)>64&&this.str.charCodeAt(i)<91 || this.str.charCodeAt(i)>1039 &&this.str.charCodeAt(i)<1104 || this.str.charCodeAt(i)==1025){
          this.rezalt+=this.str[i].toLowerCase();
        } else {
          if (this.str.charCodeAt(i)>96 && this.str.charCodeAt(i)<123 || this.str.charCodeAt(i)>1071 && this.str.charCodeAt(i)<1104 || this.str.charCodeAt(i)==1105) {
            this.rezalt+=this.str[i].toUpperCase();
          } else {
            if (Number(this.str[i])) {
              this.rezalt+='_';
            } else {
              this.rezalt += this.str[i];
            }
          }
        }
      }
      return this;
    }

    replaceHyphen(){                                                            // метод преобразует названия css стилей с дефисом в название в СamelСase стиле
      for (var i = 0; i < this.str.length; i++) {
        if(this.str[i]=='-') {
          i++;
          this.rezalt+=this.str[i].toUpperCase();
        }else {
          this.rezalt += this.str[i];
        }
      }
      return this;
    }

    abbreviation(){                                                             // метод  который принимает словосочетаниеи превращает его в аббревиатуру
      if (this.str[0]!=' ') {
        this.rezalt+=this.str[0].toUpperCase();
      }
      for (var i = 0; i < this.str.length; i++) {
        if ((this.str[i]==' ')&&(this.str[i+1]!=' ')) this.rezalt+=this.str[i+1].toUpperCase();
      }
      return this;
    }

    concatStr(...arg){                                                          //метод принимает любое количество строк, объединяет их в одну длинную строку ивозвращает ее
      for (var i = 0; i < arguments.length; i++) {                              //this.str += Array.prototype.slice.call(arguments).reduce((acc, cur) =>acc+=cur ); альтернативный вариант.
        this.str+=arguments[i];
      }
    return this.str;
    }


  calculator(){                                                                 // метод принимает строку с примером, определяет, какие действие необходимо выполнить
    this.sign = ['+','-','*','/'];                                              // (+ - * /), переводит операнды в числа, решает пример и возвращает результат,
    this.rezalt=0;                                                              // если строку невозможно перевести в число генерирует ошибку
    let m=0;
    for (var i = 0; i < this.str.length; i++) {
      if (this.sign.indexOf(this.str[i])!=-1) {
        if (parseFloat(this.str.slice(m,i))) {
          this.rezalt+= parseFloat(this.str.slice(m,i));
          this.rezalt+= this.str[i];
          m=i+1;
        } else {
          alert('Ошибка ввода данных!');
          this.rezalt='ERROR';
          return this;
        }
      }
    }
    if (parseFloat(this.str.slice(m))) {
      this.rezalt+= parseFloat(this.str.slice(m));
      this.rezalt = eval(this.rezalt);
    } else {
      alert('Ошибка ввода данных!');
      this.rezalt='ERROR';
    }
    return this;
  }

  calculator2(){                                                                 //   отличается НЕ ИСПОЛЬЗУЕТ EVAL
    this.sign = ['+','-','*','/'];                                              //    не определяет приритеты операций
    this.rezalt='';
    let m=0;
    for (var i = 0; i < this.str.length; i++) {
      if (this.sign.indexOf(this.str[i])!=-1) {
        if (parseFloat(this.str.slice(m,i))&&parseFloat(this.str.slice(i+1))) {
          this.rezalt ? this.rezalt : this.rezalt=parseFloat(this.str.slice(0,i));
          m=i+1;
          switch (this.str[i]) {
            case '+': this.rezalt += parseFloat(this.str.slice(m)); break;
            case '-': this.rezalt -= parseFloat(this.str.slice(m)); break;
            case '*': this.rezalt *= parseFloat(this.str.slice(m)); break;
            case '/': this.rezalt /= parseFloat(this.str.slice(m)); break;
          }
        } else {
          alert('Ошибка ввода данных!');
          this.rezalt='ERROR';
          return this;
        }
      }
    }

    return this;
  }

  // parseUrl(){                                                                // используя конструктор URL
  //   this.url = new URL(this.str);                                            // метод получает url и выводит  информацию о нем
  //   this.rezalt = `Разбор url:<br> протокол - ${this.url.protocol}, <br>  домен - ${this.url.hostname}, <br> путь -  ${this.url.pathname} `;
  //   return this;
  // }

  parseUrl(){                                                                   // метод получает url и выводит  информацию о нем +'путь: '+ this.str.slice(n+1);
    let m,n,k,h=0;
    m = this.str.indexOf('//');
    if (m!=-1) {
      this.rezalt= 'протокол: '+ this.str.slice(0,m)+'<br>';
      n = this.str.indexOf('/',m+2);
      k = this.str.indexOf('?',n+1);
      h = this.str.indexOf('#',k+1);
      if (n!=-1) {
        this.rezalt+= 'домен: '+ this.str.slice(m+2,n)+'<br>';
          if (k!=-1) {
            this.rezalt += 'путь: '+ this.str.slice(n+1,k)+'<br>';
              if (h!=-1) {
                this.rezalt += 'запрос: '+ this.str.slice(k+1,h)+'<br>' +'хеш: '+ this.str.slice(h+1);
              } else { this.rezalt+= 'запрос: '+ this.str.slice(k+1);}
          }else { this.rezalt+= 'путь: '+ this.str.slice(n+1);}
      } else { this.rezalt+= 'домен: '+ this.str.slice(m+2);}
  } else { this.rezalt+= 'эта строка не url!';}
  return this;
  }

  createSplit(sign){                                                            // метод имитирует метод Array.prototype.split
    this.rezalt=[];                                                             // принимает разделитель sign
    let subStr='';                                                              // не использует Array.prototype.slice
    for (var i = 0; i < this.str.length; i++) {
      if (this.str[i]!=sign) subStr+=this.str[i];
      if (this.str[i]==sign) {this.rezalt.push(subStr); subStr='';}
    }
    this.rezalt.push(subStr);
    return this;
  }

  templateStr(){                                                                // метод принимает первым параметром шаблон, в тексте которого должен использоваться %,
    this.createSplit(',');                                                      // после символа % указывается индекс входного параметра. При выводе вместо %индекс
    this.template = this.rezalt[0];                                             // выводится значение соответствующего входного параметра.
    for (var i = 1; i < this.rezalt.length; i++) {
      this.template=this.template.replace(('%'+i), this.rezalt[i]);
    }
    return this;
  }
  }



  /*calculator1(){
    this.sign = ['+','-','*','/'];
    this.mass = [];
    this.rezalt=0;
    let m=0;
    for (var i = 0; i < this.str.length; i++) {
    if (this.sign.indexOf(this.str[i])!=-1) {
      this.mass.push(parseInt(this.str.slice(m,i-1)));
      this.mass.push(this.str[i]);
      m=i+1;
    }
  }
  this.mass.push(parseInt(this.str.slice(m)));
  for (var i = 0; i < this.mass.length; i++) {
    this.rezalt+= this.mass[i];
  }
  this.rezalt = eval(this.rezalt);
}*/

  window.onload = function () {

    click81.onclick = function () {
      let str = document.getElementById('input81').value;
      let strObj_ = new StringObj(str);
      out81.innerHTML= strObj_.showInfo().rezalt;
    }
    click82.onclick = function () {
      let str = document.getElementById('input82').value;
      let strObj_ = new StringObj(str);
      out82.innerHTML= strObj_.numberToText().rezalt;
    }

    click83.onclick = function () {
      let str = document.getElementById('input83').value;
      let strObj_ = new StringObj(str);
      out83.innerHTML= strObj_.replaceStr().rezalt;
    }

    click84.onclick = function () {
      let str = document.getElementById('input84').value;
      let strObj_ = new StringObj(str);
      out84.innerHTML= strObj_.replaceHyphen().rezalt;
    }

    click85.onclick = function () {
      let str = document.getElementById('input85').value;
      let strObj_ = new StringObj(str);
      out85.innerHTML= strObj_.abbreviation().rezalt;
    }

    click87.onclick = function () {
      let str = document.getElementById('input87').value;
      let strObj_ = new StringObj(str);
      out87.innerHTML=strObj_.calculator().str+' = '+ strObj_.rezalt;
    }

    click88.onclick = function () {
      let str = document.getElementById('input88').value;
      let strObj_ = new StringObj(str);
      out88.innerHTML=strObj_.parseUrl().rezalt;
    }

    click89.onclick = function () {
      let str = document.getElementById('input891').value;
      let sign = document.getElementById('input892').value;
      let strObj_ = new StringObj(str);
      out89.innerHTML=strObj_.createSplit(sign).rezalt;
    }

    click810.onclick = function () {
      let str = document.getElementById('input810').value;
      let strObj_ = new StringObj(str);
      out810.innerHTML=strObj_.templateStr().template;
    }
  }

  let q = new StringObj('Today is %1 %2.%3.%4”, “Monday”, 10,8,2020');
  q.templateStr();
  //console.log(q.concatStr('100% бесплатно', 'увеличение продаж', 'только сегодня', 'не удаляйте', 'xxx')); // проверка 6-го задания


//************************************** Практическое задание *****************************************************

  StringObj.prototype.comparison = function (str) {                             // сравнение двух строк
    if (this.str.length>str.length) return 1;
    if (this.str.length<str.length) return -1;
    if (this.str.length==str.length) return 0;
  }

  StringObj.prototype.firstUp = function () {                                   // первая буква заглавная
    for (var i = 0; i < this.str.length; i++) {
      if(this.str[i]!=' ') {
        this.str = this.str[i].toUpperCase() +this.str.slice(i+1);
        break;
      }
    }
    return this;
  }

  StringObj.prototype.vowelSearch = function () {
    this.vowel = 'аеёиоуыэюяeyuioa';
    this.k = (this.str.toLowerCase().split('').reduce((acc, cur) => this.vowel.includes(cur) ? acc += cur : acc, '')).length;
    return this;
  }

  StringObj.prototype.filterSpam = function () {
    this.spam = ['100% бесплатно', 'увеличение продаж', 'только сегодня', 'не удаляйте', 'xxx'];
    this.rezalt = this.spam.reduce((acc, cur) => this.str.toLowerCase().indexOf(cur) !=-1 ? acc+=', '+cur : acc, '');
    if (this.rezalt !='') console.log('Это спам');
    else console.log('Строка прошла проверку');
  /*  for (var i = 0; i < this.spam.length; i++) {                             альтернативный вариант
      this.rezalt = this.str.toLowerCase().indexOf(this.spam[i]);
      if(this.rezalt>=0) { console.log('Это спам'); break;}
    }
    if (this.rezalt==-1) console.log('Строка прошла проверку');*/
    return this;
  }
  //let a = 'ldgblkdflk';
//  let b = 'ldgblkdflk';
  //let q = new StringObj('100% Бесплатно dgblkoEdflk не удаляйте');
  //let q1 = new StringObj('ldgblkdflk');
  //console.log(q.vowelSearch().k);
  //q.concatStr(q,q1);
