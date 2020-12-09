
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

  let myCar= new Car('Chevrolet', 'Lacetti', 2009, 90);



  function CommonFractions([numerator1,denominator1], [numerator2,denominator2]) {
    this.x = [numerator1,denominator1];
    this.y = [numerator2,denominator2];
    this.z = [0,0];
    this.nok = (Math.abs(this.x[1] * this.y[1])/grComFactor(this.x[1],this.y[1]));

    this.properFraction = function(){
      if (this.z[0]>this.z[1]) {
        return Math.floor(this.z[0]/this.z[1]) +'*'+ (this.z[0]-Math.floor(this.z[0]/this.z[1])*this.z[1]) + '/'+ this.z[1];
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
      if (this.x[0]/this.x[1]<this.y[0]/this.x[1]) return '-'+ this.properFraction() ;

      return this.properFraction();
    }
  }

  let r = new CommonFractions([2,4],[4,8]);
  r.additionFractions();
  console.log(r.subtractionFractions());











function functionName() {
  let s = document.getElementById('input_').value;
  ww.innerHTML=myCar.info()+'<br>' + 'Это расстояние ваш автомобиль проедет за: '+ myCar.travelTime(s) +' чч:мм:сс';
}
