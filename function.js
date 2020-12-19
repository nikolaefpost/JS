
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

  function Elevator(cargo) {
    this.cargo = cargo;
    this.floor = 1;
    this.doors = false;                                             //   false  -  открыта
  }
  let elevator_ = new Elevator(300);

  Elevator.prototype.moove = function (buttonFloor, weight) {            //  buttonFloor - кнопка выбора этажа
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

  Elevator.prototype.call = function (buttonCall) {                 //  buttonCall - кнопка вызова на этаже (номер этажа)
    if(this.doors == false && this.floor != buttonCall) this.doors = true;
    while (this.floor!=buttonCall) {
    (buttonCall>this.floor) ? this.floor++ : this.floor--;
    }
    this.doors = false;
    console.log(this.doors);
    setTimeout(this.closingDoors(), 30000);
  }

  Elevator.prototype.closingDoors = function () {this.doors = true;}
  setInterval(elevator_.closingDoors(), 30000);


  elevator_.moove(5,290);
  elevator_.call(3);
  console.log(elevator_.floor,elevator_.doors);
