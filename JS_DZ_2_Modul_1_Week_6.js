
  function Car(brand, model, made, speed) {
    this.brand = brand;
    this.model = model;
    this.made = made;
    this.speed = speed;

    this.info = function() {
      let str = 'Автомобиль: '+this.brand+' '+this.model+', год выпуска: '+this.made+', средняя скорость: '+this.speed+' км/ч.';
      return str;
    };

    this.travelTime = function(s) {
      let rezalt_=0;
      if (s/this.speed>4) {
        let restSpeed = 4*this.speed/5;
        let lastTime=(s/restSpeed)%5;
        rezalt_=s/restSpeed-lastTime +  lastTime*restSpeed/this.speed;
      }else {
        rezalt_=s/this.speed;
      }
      rezalt_=getUserTime(Math.floor(rezalt_*3600));
      return  rezalt_;
    };
  }

  function CommonFractions([numerator1,denominator1], [numerator2,denominator2]) {
    this.x = [numerator1,denominator1];
    this.y = [numerator2,denominator2];
    this.z = [0,0];
    this.nok = (Math.abs(this.x[1] * this.y[1])/grComFactor(this.x[1],this.y[1]));                      // grComFactor(a,b)   функция нахождения НОД из JS_DZ_Recursion.js

    this.properFraction = function(){                                                                   // метод формирует правильную дробь из не правильной и выдает строку
      if (this.z[0]>this.z[1]) {
        return Math.floor(this.z[0]/this.z[1]) +'*'+ (this.z[0] - Math.floor(this.z[0]/this.z[1])*this.z[1]) +'/'+ this.z[1];
      }else {
        return  this.z[0]+ '/'+ this.z[1];
      }
    }

    this.additionFractions = function() {
      let numerator = +this.nok/this.x[1]*this.x[0] + this.nok/this.y[1]*this.y[0];
      let nod = grComFactor(numerator,this.nok);
      this.z[0] = numerator/nod;
      this.z[1] = this.nok/nod;
      return this.properFraction();
    }

    this.subtractionFractions = function() {
      let numerator = Math.abs(+this.nok/this.x[1]*this.x[0] - this.nok/this.y[1]*this.y[0]);
      if (numerator==0) return '0' ;
      let nod = grComFactor(numerator,this.nok);
      this.z[0] = numerator/nod;
      this.z[1] = this.nok/nod;
      if (this.x[0]/this.x[1]<this.y[0]/this.x[1]) return '-'+ this.properFraction();
      return this.properFraction();
    }

    this.multFractions = function() {
      this.z[0] = this.x[0]*this.y[0];
      this.z[1] = this.x[1]*this.y[1];
      let nod=grComFactor(this.z[0],this.z[1]);
      this.z=this.z.map((a)=>{return a/nod})
      return this.properFraction();
    }

    this.divFractions = function() {
      this.z[0] = this.x[0]*this.y[1];
      this.z[1] = this.x[1]*this.y[0];
      let nod=grComFactor(this.z[0],this.z[1]);
      this.z=this.z.map((a)=>{return a/nod})
      return this.properFraction();
    }
  }



  let myCar= new Car('Chevrolet', 'Lacetti', 2009, 90);

  function outputFunction0() {
    let s = document.getElementById('input1').value;
    output_field0.innerHTML=myCar.info()+'<br>' + 'Это расстояние ваш автомобиль проедет за: '+ myCar.travelTime(s) +' чч:мм:сс';
  }

  function outputFunction1() {
    let a1 = Number(document.getElementById('input3').value);
    let b1 = Number(document.getElementById('input4').value);
    let a2 = Number(document.getElementById('input5').value);
    let b2 = Number(document.getElementById('input6').value);
    let sign = document.getElementById('input7').value;
    let r = new CommonFractions([a1,b1],[a2,b2]);
    switch (sign) {
      case '+':
      out.innerHTML = ' = '+r.additionFractions();
      break;
      case '-':
      out.innerHTML = ' = '+r.subtractionFractions();
      break;
      case '*':
      out.innerHTML = ' = '+r.multFractions();
      break;
      case '/':
      out.innerHTML = ' = '+r.divFractions();
      break;
      default:
      out.innerHTML = 'введите одно из 4х действий: [+] [-] [*] [/]';
    }
  }

  let userTime = new Date;

  userTime.show = function() {
    return this.toLocaleTimeString();
  }

  userTime.setMySec = function(s) {
    this.s = new Date(Date.parse(this)+s*1000);
    return this.show.call(this.s);
  }

  userTime.setMyMin = function(m) {
    return this.setMySec(m*60);
  }

  userTime.setMyHour = function(h) {
    return this.setMySec(h*3600);
  }

  //console.log(userTime.show());
  //console.log(userTime.setMySec(120));
  //console.log(userTime.setMyMin(3));
  //console.log(userTime.setMyHour(1));
  //console.log(userTime.s);

  let timeObj = {                                       //  альтернативная реализация объекта, описывающего время
    myTime:[0,0,0],
    get timesout (){
      for (var i = 0; i < 3; i++) {
        if (this.myTime[i]<10) {
          this.myTime[i] = '0'+this.myTime[i];
        }
      }
      return this.myTime[0] +':'+ this.myTime[1] +':'+ this.myTime[2];
    },
    set timesout(str){
      str = str.split(':');
      str[0]=Number(str[0]);
      if (str[0]<=23 && str[0]>0) {
        this.myTime[0] = str[0];
      }else {return console.log('ERROR');}
      for (var i = 1; i < 3; i++) {
        str[i]=Number(str[i]);
        if (str[i]<60 && str[i]>=0) {
          this.myTime[i] = str[i];
        }else {return console.log('ERROR');}
      }
    }
  }

  timeObj.setMyHour1 = function (h){
    if (Number.isInteger(h)) {
      this.myTime[0]+=h;
      (this.myTime[0]>23) ? this.myTime[0]=this.myTime[0]%24: 0 ;
    } else {return console.log('ERROR');}
  }

  timeObj.setMyMin1 = function (m) {
    if (Number.isInteger(m)) {
      this.myTime[1]+=m;
      if (this.myTime[1]>59) {
        this.setMyHour1(Math.floor(m/60));
        this.myTime[1]=this.myTime[1]%60;
      }
    }
  }

  timeObj.setMySec1 = function (s) {
    if (Number.isInteger(s)) {
      this.myTime[2]+=s;
      if (this.myTime[2]>59) {
        this.setMyMin1(Math.floor(s/60));
        this.myTime[2]=this.myTime[2]%60;
      }
    }
  }


  timeObj.timesout='23:59:0';
  timeObj.setMySec1(3600);
  console.log(timeObj.timesout);




/************ ПРАКТИЧЕСКОЕ ЗАДАНИЕ *****************************************************/


  let rectangle = {
    x1:0,
    y1:0,
    x2:0,
    y2:0,
    get coordRect() {
      return 'x1='+this.x1+ ', y1='+this.y1+ '; x2='+this.x2+ ', y2='+this.y2+';';
    },

    set coordRect(arr) {
      if (Array.isArray(arr) && arr.length==4 && Number.isInteger(arr[0])&& Number.isInteger(arr[1])&& Number.isInteger(arr[2])&& Number.isInteger(arr[3])) {
        this.x1 = arr[0];
        this.y1 = arr[1];
        this.x2 = arr[2];
        this.y2 = arr[3];
      }else {
        alert('ERROR');
      }
    }
  }

  rectangle.width = function() {
    return Math.abs(this.x1-this.x2);
  }

  rectangle.height = function() {
    return Math.abs(this.y1-this.y2);
  }

  rectangle.square = function() {
    return this.height()*this.width() ;
  }

  rectangle.perimeter = function() {
    return (this.height()+this.width())*2 ;
  }

  rectangle.changeW = function(a) {
    if (this.x1>this.x2) this.x1 = this.x1 + a;
    else this.x2 = this.x2 + a;
  }

  rectangle.changeH = function(b) {
    if (this.y1>this.y2) this.y1 = this.y1 + b;
    else this.y2 = this.y2 + b;
  }

  rectangle.changeAll = function(a,b) {
    this.changeW(a);
    this.changeH(b);
  }

  rectangle.shiftX = function(a) {
    this.x1 = this.x1 + a;
    this.x2 = this.x2 + a;
  }

  rectangle.shiftY = function(b) {
    this.y1 = this.y1 + b;
    this.y2 = this.y2 + b;
  }

  rectangle.shiftAll = function(a,b) {
    this.shiftX(a);
    this.shiftY(b);
  }

  rectangle.test = function(a,b) {
    let xArea;
    let yArea;
    if (this.x1<this.x2) {
      if (this.x1<=a && a<=this.x2) xArea=true;
      else xArea=false;
    }else {
      if (this.x2<=a && a<=this.x1) xArea=true;
      else xArea=false;
    }
    if (this.y1<this.y2) {console.log();
      if (this.y1<=b && b<=this.y2)  yArea=true;
      else yArea=false;
    }else {
      if (this.y2<=b && b<=this.y1) yArea=true;
      else yArea=false;
    }
    if (xArea&&yArea) return true;
    else return false;
  }

  //rectangle.coordRect=[3,4,1,2];
  //console.log(rectangle.coordRect);
  //console.log(rectangle.height());
  //rectangle.shiftAll(6,6);
  //console.log(rectangle.coordRect);
  //console.log(rectangle.test(8,10));
