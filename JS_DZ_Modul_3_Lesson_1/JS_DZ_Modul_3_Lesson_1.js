
// --------------------------------------------------------------------- 1-e задание --------------------------------------------------------------------------letter check

  class User {
    constructor() {
      this._name = '';
      this.surname = '';
      this.age = 0;
      this.weight = 0;
    }

    setAge(age){
      if (Number.isInteger(age))  this.age = age;
      else this.err = 'введите целое число!';
      return this;
    }

    setWeight(weight){
      if (Number(weight))  this.weight = weight;
      else this.err = 'введите число!';
      return this;
    }

    setName(name){
      if (name)  this._name = name;
      else this.err = 'введите целое число!';
      return this;
    }

    setSurname(surname){
      if (surname)  this.surname = surname;
      else this.err = 'введите целое число!';
      return this;
    }
  }


  function boundFieldDecorator(fnc, start, end) {
    return function () {
      if (arguments[0]<end || arguments[0]>start) return fnc.apply(this, arguments);
    }
  }

  function checkField(fnc, fncCheck) {
    return function () {
     let [a] = [...arguments]
      if (isValidLastFirstName(a)) return fnc.apply(this, arguments);
    }
  }

  function isValidLastFirstName(name) {
    return ((typeof name)=='string' && name.length>=2)
  }


// --------------------------------------------------------------------- 1-e задание --------------------------------------------------------------------------letter check

  window.onload = function () {

    click101.onclick = function () {
      User.prototype.setAge = boundFieldDecorator(User.prototype.setAge, 0, 120);
      User.prototype.setWeight = boundFieldDecorator(User.prototype.setWeight, 35, 270);
      User.prototype.setName = checkField(User.prototype.setName, isValidLastFirstName);
      User.prototype.setSurname = checkField(User.prototype.setSurname, isValidLastFirstName);
      let q = new User();
      q.setAge(14);
      q.setWeight(120);
      q.setName('Bob');
      q.setSurname('Li');

      for (const [key, value] of Object.entries(q)) {
        out101.innerHTML +=`${key}: ${value} <br>`;
      }

    }

    // click0p01.onclick = function () {
    //   let decRobot = robotDecorator(Autobots, 'explosion.png')('Оптимус', 'Прайм', 'Модуль «Оптимус»');
    //    decRobot.move(robotId);
    // }

    click0p01.onclick = function () {
      let decRobot = robotDecorator(Autobots, 'explosion.png');
      let e = new  decRobot('Оптимус', 'Прайм', 'Модуль «Оптимус»');
      console.log(e);
        e.prototype.move(robotId);
    }

    click1p01.onclick = function () { // --------------- Практическое задание №1-------------------------------------
      out1p01.style.fontSize = '40px';
      out1p01.style.color = 'red';
      out1p01.innerHTML = Math.round(100*Math.random());
    }

    click2p01.onclick = function (e) { // --------------- Практическое задание №2-------------------------------------

      out2p01.innerHTML = clickCoord(e);
    }

    click3p01.onclick = function (e) { // --------------- Практическое задание №3-------------------------------------

      out3p01.style.marginLeft = '30px';
      out3p01.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a felis ullamcorper dui vehicula rhoncus.'+
       'Donec molestie nec libero vel porta. Nulla viverra lacus quis eros hendrerit, ac luctus lacus molestie. Praesent in risus'+
        'eros. Aenean porttitor ut erat quis sollicitudin. Fusce ac scelerisque erat. Mauris eu dolor vel libero gravida commodo ac'+
         'eu dui. Duis luctus varius sollicitudin. Donec dignissim mollis condimentum. Integer sed quam ut mi sagittis ullamcorper'+
          'quis in nisl.';
        out3p01.style.display == '' ?  out3p01.style.display = 'none' : out3p01.style.display = '';
          console.log(out3p01.style.display);
    }


  }





















  // --------------------------------------------------------------------- Практическое задание --------------------------------------------------------------------------
    //                                                                       Декоратор класса

    function Autobots(name, clan, armament) {

        this._name = name;
        this.clan = clan;
        this.armament = armament;
        this.str = '';

    }

    Autobots.prototype.move = function (e, distance = 1) {
      this.originalStyle = e.style;
      e.style.position = "relative";
      let self = this;
      (function animate() {
        if (distance <1000) {
          e.style.left = distance + "px";
          distance += distance;
          if (distance >900 && self.src) {e.setAttribute('src', self.src); e.style.left =  "80%"; }
          setTimeout(animate, 50);
        }
        setTimeout(()=>{e.style = self.originalStyle; e.setAttribute('src', 'unnamed.png')}, 2000);
      })();
    }

    // function robotDecorator(fnc, srcExp) {
    //   return function () {
    //    let s = new fnc( ...arguments);
    //    s.src = srcExp;
    //    // s.move = function (e) {
    //    //     fnc.prototype.move(e)
    //    // }
    //    return  s;
    //   }
    // }

    function robotDecorator(fnc, src) {
    return function () {
     this.src = src;
     console.log(this.__proto__.constructor);
      this.__proto__.constructor = fnc;
      this.move = Autobots.prototype.move;
     fnc.apply(this, arguments);
    }
  }
// --------------------------------------------------------------------- Практическое задание №2 --------------------------------------------------------------------------

function clickCoord(e) {
  out2p01.innerHTML = ('X= ' +  e.x + 'px' +'<br>'+'Y= ' +e.y + 'px');
}

// --------------------------------------------------------------------- Практическое задание №4 --------------------------------------------------------------------------

  function tabs(e) {
    console.log(e.target.id);
  }

  let ww= [1,1,1,1];
  let qq = ww[Symbol.iterator]();
  console.log(qq);
