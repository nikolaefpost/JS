
  class ArrObj {
    constructor(str) {
      this.arr = str.split(' ');
      this.rezalt =[];
    }

    eveNumbers (){
      this.arr = this.arr.filter((num) => num%2==0);
      return this;
    }

    sumNumbers (){
      this.arr = this.arr.reduce((acc, cur) => {return acc+=Number(cur)},0);
      return this;
    }

    maxNumbers (){
      this.rezalt = Math.max.apply(this, this.arr);
      return this;
    }

    addNumbers (elmArr,n){
      if (this.arr.length>n){
        for (var i = this.arr.length-1; i > n; --i) {
          this.arr[i+1]=this.arr[i]
          console.log(this.arr[i]);
        }
        this.arr[n]=elmArr;
      } else this.arr[n]=elmArr;
      return this;
    }

    deleteNumbers (n){
      if (this.arr.length>n){
        for (var i = n; i < this.arr.length-1; i++) this.arr[i]=this.arr[i+1];
        this.arr.length=this.arr.length-1;
      }
      return this;
    }
  }

 q = new ArrObj('12 13 6 78 23 89 67 23 09 66 44');
 //q.stringToArr='12 12 34 67 77';
console.log( q.deleteNumbers(0).arr);

  class Button {
    constructor(width, height, text) {
      this.width = width;
      this.height = height;
      this.text = text;
    }

    showBtn(){
      this.str = '<button style=" width:'+this.width+'; height:'+this.height+';">'+this.text+ '</button>';
      document.write(this.str);
    }
  }

  class BootstrapButton extends Button {
    constructor(width, height, text, color) {
      super(width, height, text);
      this.color = color;
    }
    showBtn(){
      this.str = '<button style=" width:'+this.width+'; height:'+this.height+'; color:'+this.color+';">'+this.text+ '</button>';
      document.write(this.str);
    }
  }

  let r = new Button('30px', '30px', 'wwwwwwwww' );
