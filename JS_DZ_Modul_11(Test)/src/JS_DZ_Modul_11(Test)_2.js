
  class MyString extends String {
    remove(index){
      if (index>=0 && index<this.length-1) {
        return this.slice(0,index)+this.slice(index+1, this.length);
      } else   return this;
    }

    insert(index, sign){
      if(typeof index != 'number' ) return this;
      if (index<0) return sign+this;
      if (index>this.length-1) return this+sign;
      return this.slice(0,index)+sign+this.slice(index+1, this.length);
    }

    trimSign(){
      let temp;
      let arr = this.split('').filter((i)=>{
        if (i!=temp) { temp = i; return i; }
      }).join('')
      return arr
    }
    // trimSign(){
    //   let str = this[0];
    //   let temp = this[0];
    //   for (var i = 1; i < this.length; i++) {
    //     if (this[i]!=temp) {
    //       temp = this[i];
    //       str+=this[i];
    //     }
    //   }
    //   return str
    // }

    toggle(){
      let str = '';
      for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i)>64&&this.charCodeAt(i)<91 || this.charCodeAt(i)>1039 &&this.charCodeAt(i)<1104 || this.charCodeAt(i)==1025){
          str+=this[i].toLowerCase();
        } else if (this.charCodeAt(i)>96 && this.charCodeAt(i)<123 || this.charCodeAt(i)>1071 && this.charCodeAt(i)<1104 || this.charCodeAt(i)==1105) {
            str+=this[i].toUpperCase();
          } else str+=this[i];
      }
      return str;
    }

    counter(sign){
      if (sign == '' || sign == null || sign == undefined) return 0;
      let i=-1;
      let k =0;
      while (true) {
        i = this.indexOf(sign, i+1);
        if (i==-1) return k;
        k++
      }
    }
  }

  class MyDate extends Date{
    constructor(day, month, year){
      super(year, month-1, day);
      this.day = day;
      this.month = month;
      this.user_date = [this.getDate().toString(), this.getMonth()];
    }
    showDate(){

      if(+this.user_date[0] != this.day || this.user_date[1]+1 != this.month) return 'You entered a date that does not exist!'
      if (this.user_date[0].length==1) this.user_date[0] ='0'+ this.user_date[0];
      let units1 = [
        ['',' первое',' второе',' третье',' четвертое',' пятое',' шестое',' семдьмое',' восьмое',' девятое'],
        [' десятое',' одиннадцатое',' двенадцатое',' тринадцатое',' четырнадцатое',' пятнадцатое',' шестнадцатое',' семнадцатое',' восемнадцатое',' девятнадцатое'],
        ['','',' двадцать(ое)',' тридцатoe']
      ];
      let units2 = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября', 'ноября', 'декабря'];
      (9 < (this.user_date[0] % 100) && (this.user_date[0] % 100) < 20) ? this.rezalt = units1[1][this.user_date[0][1]] : this.rezalt = units1[2][this.user_date[0][0]] + units1[0][this.user_date[0][1]];
      this.rezalt+=' '+units2[this.user_date[1]];
      return this.rezalt;
    }

    isFuture(){
      if(+this.user_date[0] != this.day || this.user_date[1]+1 != this.month) return 'You entered a date that does not exist!'
      return (this.getTime() > new Date().getTime());
    }

    isLeapYear(){
      if(+this.user_date[0] != this.day || this.user_date[1]+1 != this.month) return 'You entered a date that does not exist!'
      this.userYear = this.getFullYear();
      return (( this.userYear % 4 == 0  && this.userYear % 100 == 0 && this.userYear % 400 == 0) || (this.userYear % 4 == 0  && this.userYear % 100 != 0));
    }

    nextDay(){
      if(+this.user_date[0] != this.day || this.user_date[1]+1 != this.month) return 'You entered a date that does not exist!'
      this.setDate(this.getDate()+1);
      this.rezalt = this.toLocaleDateString().split('.').map((i)=>{
        i=i.split('');
        if (i[0]==0) i.shift();
        return i.join('');
      }).join('/');
      return this.rezalt
    }
  }

  function sum(a, b) {
    if (a== undefined || b== undefined || a== null || b== null || isNaN(a) || isNaN(b)) throw new SyntaxError();
    return +a + +b;
  }
