
  function Car(brand, model, made, speed) {
    this.brand = brand;
    this.model = model;
    this.made = made;
    this.speed = speed;

    this.info = function() {
      let str = 'Автомобиль: '+this.brand+' '+this.model+', год выпуска: '+this.made+' года, средняя скорость: '+this.speed;
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
      return 'Ваш автомобиль проедет '+s+ ' км за: '+ rezalt_+' чч:мм:сс';
    };
  }

  let myCar= new Car('Chevrolet', 'lacetti', 2009, 90);



function functionName() {
  let s = document.getElementById('input_').value;
  ww.innerHTML=myCar.info()+'<br>'+myCar.travelTime(s);
}
