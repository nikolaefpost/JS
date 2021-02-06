
// --------------------------------------------------------------------- 1-e задание --------------------------------------------------------------------------

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
     let [a] = [...arguments]
      if (arguments[0]>end || arguments[0]<start) return alert( `введите число в диапазоне от ${start} до ${end}!`);
      return fnc.apply(this, arguments);
    }
  }

  function checkField(fnc, fncCheck) {
    return function () {
     let [a] = [...arguments]
      if (!isValidLastFirstName(a)) return alert( `имя и фамилия не может быть короче 2х букв!`);
      return fnc.apply(this, arguments);
    }
  }

  function isValidLastFirstName(name) {
    return ((typeof name)=='string' && name.length>=2)
  }




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
      out101.innerHTML = 'qwertyuu'
     // out101.style.color = "blue";
     // out101.style.fontWeight = "bold";
     // for (var key in out101.style) {
     //   console.log(key);
     // }

     console.log(out101.style.cssText);
    }

    click1p01.onclick = function () {
      let decRobot = robotDecorator(Autobots, 'explosion.png')('Оптимус', 'Прайм', 'Модуль «Оптимус»');
       decRobot.move(robotId);
    }
  }





















  // --------------------------------------------------------------------- Практическое задание --------------------------------------------------------------------------
    //                                                                       Декоратор класса

    class Autobots {
      constructor(name, clan, armament) {
        this._name = name;
        this.clan = clan;
        this.armament = armament;
        this.str = '';
      }

      move(e, distance = 1){
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
    }


    function robotDecorator(fnc, srcExp) {
      return function () {
       let s = new fnc( ...arguments);
       s.src = srcExp;
       // s.move = function (e) {
       //     fnc.prototype.move(e)
       // }
       return  s;
      }
    }
