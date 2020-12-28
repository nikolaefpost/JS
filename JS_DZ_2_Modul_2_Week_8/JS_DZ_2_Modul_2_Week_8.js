
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
        if (this.str[i]==' ') this.rezalt+=this.str[i+1].toUpperCase();
      }
      return this;
    }

    concatStr(...arg){                                                          //метод принимает любое количество строк, объединяет их в одну длинную строку ивозвращает ее
      for (var i = 0; i < arguments.length; i++) {                              //this.str += Array.prototype.slice.call(arguments).reduce((acc, cur) =>acc+=cur ); альтернативный вариант.
        this.str+=arguments[i];
      }
    return this.str;
    }

    calculator(){
      this.sign = ['+','-','*','/'];
      this.rezalt = this.sign.reduce((acc, cur) => this.str.indexOf(cur)!=-1 ? acc=this.str.indexOf(cur) : acc, '');

    }
  }


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
  }

  //let q = new StringObj('dgblkoEdflk');
  //console.log(q.concatStr('100% бесплатно', 'увеличение продаж', 'только сегодня', 'не удаляйте', 'xxx')); // проверка 6-го задания
  let q = new StringObj(' 523 + 45 ');
  q.calculator();
  console.log(q.rezalt);

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
