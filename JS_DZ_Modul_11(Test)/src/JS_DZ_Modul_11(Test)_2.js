

    class MyString extends String {
      remove(index){
        if (index>=0 && index<this.length-1) {
          return this.slice(0,index)+this.slice(index+1, this.length);
        } else   return this;
      }

      insert(index, sign){
        if (index<0) return sign+this;
        if (index>this.length-1) return this+sign;
        return this.slice(0,index)+sign+this.slice(index+1, this.length);
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
          } else {
            if (this.charCodeAt(i)>96 && this.charCodeAt(i)<123 || this.charCodeAt(i)>1071 && this.charCodeAt(i)<1104 || this.charCodeAt(i)==1105) {
              str+=this[i].toUpperCase();
            }
          }
        }
        return str;
      }

      counter(sign){
        let i=-1;
        let k =0;
        while (true) {
            i = this.indexOf(sign, i+1);
            if (i==-1) return k;
            k++
        }
      }
      trimSign(){
        let temp;
        let arr = this.split('').filter((i)=>{

          if (i!=temp) {
           temp = i;
           return i;}
        }).join('')
        return arr
      }
    }

    class MyDate extends Date{
      constructor(day, month, year){
        super(year, month-1, day);
      }
      showDate(){
        let user_date = [this.getDate().toString(), this.getMonth()];
        if (user_date[0].length==1) user_date[0] ='0'+ s[0];
        let units1 = [
          ['',' первое',' второе',' третье',' четвертое',' пятое',' шестое',' семдьмое',' восьмое',' девятое'],
          [' десятое',' одиннадцатое',' двенадцатое',' тринадцатое',' четырнадцатое',' пятнадцатое',' шестнадцатое',' семнадцатое',' восемнадцатое',' девятнадцатое'],
          ['','',' двадцатое',' тридцатoe']
        ];
        let units2 = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября', 'ноября', 'декабря'];
         (9 < (user_date[0] % 100) && (user_date[0] % 100) < 20) ? this.rezalt = units1[1][user_date[0][1]] : this.rezalt = units1[2][user_date[0][0]] + units1[0][user_date[0][1]];
         this.rezalt+=' '+units2[user_date[1]];
        return this.rezalt;
      }

      isFuture(){
        return (this.getTime() > new Date().getTime());
      }

      isLeapYear(){
        this.userYear = this.getFullYear();
        return (( this.userYear % 4 == 0  && this.userYear % 100 == 0 && this.userYear % 400 == 0) || (this.userYear % 4 == 0  && this.userYear % 100 != 0));
      }

      nextDay(){
        this.setDate(this.getDate()+1);
        this.rezalt = this.toLocaleDateString().split('.').map((i)=>{
          i=i.split('');
          if (i[0]==0) i.shift();
          return i.join('');
        }).join('/');
        return this.rezalt
      }
    }
