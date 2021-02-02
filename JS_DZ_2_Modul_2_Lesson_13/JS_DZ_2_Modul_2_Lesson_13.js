
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
     out101.innerHTML = q;
    }
  }
