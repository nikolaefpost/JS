
// --------------------------------------------------------------------- 1-e задание --------------------------------------------------------------------------
  class Marker {
    constructor(color) {
      this.color = color;
      this._ink = 100;
      this.text = '';                                                           // поле для текста, который подготовлен к печати
      this.temp = ['',''];                                                      // поле для ненапечатанной части строки: this.temp.[0]- сама часть строки   this.temp.[2] - необходимое количество чернил
    }                                                                           //this.temp.[1] - для хранения статуса печати

    markerWrite1(str){
      for (var i = 0; i < str.length; i++) {                                    // метод готовит строку доступную к печати
        (this._ink > 0) ?  this.text += str[i]  : this.temp[0] += str[i];       // и сохраняет информацию о ненапечатаной части строки
        if (str[i] != ' ') this._ink -=0.5;
      }
      if (this._ink < 0) {this.temp[2] = this._ink; this._ink = 0;}             // сохраняются данные о необходимом количестве чернил
      this.writeStatus();
      return this;
    }

    // markerWrite2(str){
    //   this.text = str.split('').reduce((acc, cur) => {
    //     if (this._ink > 0 )  {
    //       acc+= cur;
    //       if (cur!=' ') this._ink -=0.5;
    //     } return acc;
    //   },'');
    //   this.text = '<p style = "margin-left:15px; color:' + this.color + ';">' + this.text + '</p>';
    //   return this;
    // }

    writeStatus(){
      if (this.temp.length > 2) this.temp[1] = '<tt> Закончились чернила! Чтобы допечатать оставшийся текст необходимо заправить маркер на'+ this.temp[2] +' едениц.</tt>';
      else this.temp[1]= '<tt>Печать успешно завершенна.</tt>';
      return this;
    }

    resumeWrite(){
      if(this._ink>0) {                                                         //
        let str = this.temp[0];
        this.temp[0] = '';
        this.markerWrite1(str);
      }
      return this;
    }

    print(){
      return '<p style = "margin-left:15px; color:' + this.color + ';">' + this.text + '</p>' + this.temp[1];
    }
  }

  class RefuelingMarker extends Marker  {
    get ink() {
      return this._ink;
    }

    set ink(fuel){
      if (Number(fuel)) {
        this._ink = this._ink + Math.abs(fuel);
        this.temp.length = 2;
        if (this._ink>100) this._ink = 100;
      }
      if (this.temp[0].length > 0) this.resumeWrite();
      return this;
    }
  }

// --------------------------------------------------------------------- 2-e задание --------------------------------------------------------------------------
class ExtentedDate extends Date {

  numberToText1(objDate){                                                        // метод преобразования числа из цифры в слова
    let str=[];
    if (objDate instanceof Date )  str.push(objDate.getDate().toString(), objDate.getMonth());                 // проверка является ли аргумент обьектом Date
    else { this.rezalt = ' Некорректный ввод данных'; return this; }
    if (str[0].length>2 || !(Number(str[0])) ) {this.rezalt='Введите число не болбше 2х знаков!'; return this;}
    if (str[0].length==1) str[0] ='0'+ str[0];
    let units1 = [
      ['',' первое',' второе',' третье',' четвертое',' пятое',' шестое',' семдьмое',' восьмое',' девятое'],
      [' десятое',' одиннадцатое',' двенадцатое',' тринадцатое',' четырнадцатое',' пятнадцатое',' шестнадцатое',' семнадцатое',' восемнадцатое',' девятнадцатое'],
      ['','',' двадцать(oe)',' тридцать(oe)']
    ];
    let units2 = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября', 'ноября', 'декабря'];
     (9 < (str[0] % 100) && (str[0] % 100) < 20) ? this.rezalt = units1[1][str[0][1]] : this.rezalt = units1[2][str[0][0]] + units1[0][str[0][1]];
     this.rezalt+=' '+units2[str[1]];
    return this;
  }

  numberToText2(){                                                        // метод преобразования числа из цифры в слова
    this.str=[];
    this.str.push(this.getDate().toString(), this.getMonth());
    if (this.str[0].length==1) this.str[0] ='0'+ this.str[0];
    let units1 = [
      ['',' первое',' второе',' третье',' четвертое',' пятое',' шестое',' семдьмое',' восьмое',' девятое'],
      [' десятое',' одиннадцатое',' двенадцатое',' тринадцатое',' четырнадцатое',' пятнадцатое',' шестнадцатое',' семнадцатое',' восемнадцатое',' девятнадцатое'],
      ['','',' двадцать(oe)',' тридцать(oe)']
    ];
    let units2 = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября', 'ноября', 'декабря'];
     (9 < (this.str[0] % 100) && (this.str[0] % 100) < 20) ? this.rezalt = units1[1][this.str[0][1]] : this.rezalt = units1[2][this.str[0][0]] + units1[0][this.str[0][1]];
     this.rezalt+=' '+units2[this.str[1]];
    return this;
  }
}


let objDate = new ExtentedDate().numberToText2();
//let w = new ExtentedDate().numberToText(objDate);
console.log(objDate.rezalt);












  window.onload = function () {

    click101.onclick = function () {
      let str = document.getElementById('input101').value;
      let color = document.getElementById('input102').value;
      let q = new RefuelingMarker(color).markerWrite1(str);
       out101.innerHTML=q.print();
      console.log(q, q.temp);

      q.ink = 26;                                                               // дозаправка чернил
      out101.innerHTML=q.print();
      console.log(q, q.temp);

      q.ink = 99;                                                               // дозаправка чернил
      console.log(q, q.temp);
    }
  }
