
  function remainderDivision(x,y) {                                               // находения остатка от делени
    let rezalt_=x -Math.floor(x/y)*y;
    return rezalt_
  }

//**********  ссоздание и наследование с помощью prototype (по старому)**********************************************

  function Person(name_, surname, age) {
    this.name_ = name_;
    this.surname = surname;
    this.surname = surname;
  }
  Person.prototype.shouName = function () {
    console.log(this.name_);
  }

  function Student(name_, surname, age, mark) {
    Person.call(this, name_, surname, age);
    this.mark = mark;
  }
  Student.prototype = Object.create(Person.prototype);
  Student.prototype.constructor = Student;

  Student.prototype.shousurName = function () {
    console.log(this.surname);
  }

//*****************************  пример обьекта лифт **********************************************

  function Elevator(cargo) {
    this.cargo = cargo;
    this.floor = 1;
    this.doors = false;                                                         //   false  -  открыта
  }
  let elevator_ = new Elevator(300);

  Elevator.prototype.moove = function (buttonFloor, weight) {                   // метод движения лифта  buttonFloor - кнопка выбора этажа
    this.doors = true;
    if (this.doors && weight<this.cargo) {
      while (this.floor!=buttonFloor) {
      (buttonFloor>this.floor) ? this.floor++ : this.floor--;
      }
    } else {
      alert('Превышенна грузоподьемность лифта');
    }
    this.doors = false;
    setTimeout(this.closingDoors(), 30000);
  }

  Elevator.prototype.call = function (buttonCall) {                              // метод вызова лифта buttonCall - кнопка вызова на этаже (номер этажа)
    if(this.doors == false && this.floor != buttonCall) this.doors = true;
    while (this.floor!=buttonCall) {
    (buttonCall>this.floor) ? this.floor++ : this.floor--;
    }
    this.doors = false;
    setTimeout(this.closingDoors(), 30000);
  }

  Elevator.prototype.closingDoors = function () {if(!this.doors) this.doors = true;}
  setInterval(elevator_.closingDoors(), 30000);


  elevator_.moove(5,290);
  elevator_.call(3);
  elevator_.moove(9,290);
  //console.log(elevator_.floor,elevator_.doors);

  //******************************** переопределение конструктора Array**********************************

  class MyArray extends Array {
  // при использовании таких методов, как map(), который возвращает конструктор по умолчанию, возвращает родительский объект Array вместо объекта MyArray.
  static get [Symbol.species]() { return Array; }
}
//var a = new MyArray(1,2,3);
//var mapped = a.map(x => x * x);

//console.log(mapped instanceof MyArray); // false
//console.log(mapped instanceof Array);   // true

// --------------------------------------------------------- Создаём собственный итератор  ---------------------------------------------

  class IterableObject1 extends Object {
    constructor(object) {
        super();
        Object.assign(this, object);
    }
    [Symbol.iterator]() {
        const entries = Object.entries(this);
        let index = 0;
        return {
            next() {
                const result = {
                    value: entries[index],
                    done: index >= entries.length
                };
                index++;
                return result;
            }
        }
    }
  }

  class IterableObject2 extends Object {
    constructor(object) {
        super();
        Object.assign(this, object);
      }
    [Symbol.iterator]() {
        const entries = Object.entries(this);
        let index = -1;
        return {
            next() {
                index++;
                return {
                    value: entries[index],
                    done: index >= entries.length
                }
            }
        }
    }
}
  // let o = Object.create(Object.prototype);
  // o['1'] = 'a';
  // o['2'] = 'b';
  // o['3'] = 'c';


  const ourArray = [1, 2, 3];

const iterator = ourArray[Symbol.iterator]();

const secondIterator = iterator[Symbol.iterator]();

for (let element of secondIterator) {
    console.log(element);
}
