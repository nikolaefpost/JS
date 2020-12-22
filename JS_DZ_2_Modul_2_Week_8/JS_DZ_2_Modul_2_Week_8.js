
  class StringObj {
    constructor(str) {
      this.str = str;
      this.rezalt ="";
    }

    showInfo(){
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

    numberToText(){
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

    replaceStr(){
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

}


//str = '363'
//let strObj_ = new StringObj(str);
//console.log(strObj_.numberToText());
 //function out() {
//  let str = document.getElementById('input81').value;
//  let strObj_ = new StringObj(str);
//  out81.innerHTML=strObj_.showInfo();
//}
