

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

      trimSign(){
        let str = this[0];
        let temp = this[0];
        for (var i = 1; i < this.length; i++) {
          if (this[i]!=temp) {
            temp = this[i];
            str+=this[i];
          }
        }
        return str
      }

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
      // trimSign(){
      //   let arr = this.split('');
      //   arr = arr.filter((i)=>{
      //     let temp;
      //     if (i!=temp) {
      //     console.log(i);
      //      temp = i;
      //      return i;}
      //   }).join('')
      //   return arr
      // }
    }

    class MyDate extends Date{
      constructor(){
        super();
      }
      showDate(){
        let s = new Date(20, 1, 1990)
        console.log(s);
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
        return this.rezalt;
      }

      isFuture(){

      }

      isLeapYear(){

      }

      nextDay(){

      }
    }
