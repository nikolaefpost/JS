
// --------------------------------------------------------------------- 1-e задание --------------------------------------------------------------------------
  class Marker_printer {
    constructor(color) {
      this.color = color;
      this._ink = 100;
      this.text = '';                                                           // поле для текста, который подготовлен к печати
      this.temp = ['',''];                                                      // поле для ненапечатанной части строки: this.temp.[0]- сама часть строки   this.temp.[2] - необходимое количество чернил
    }                                                                           //this.temp.[1] - для хранения статуса печати

    markerWrite1(str){
      for (var i = 0; i < str.length; i++) {                                    // метод готовит строку доступную к печати
        (this._ink > 0) ?  this.text += str[i]  : this.temp[0] += str[i];       // и сохраняет информацию о ненапечатаной части строки
        if (str[i] != ' ') this._ink -=0.5;
      }
      if (this._ink < 0) {this.temp[2] = this._ink; this._ink = 0;}             // сохраняются данные о необходимом количестве чернил
      this.writeStatus();
      return this;
    }

    // markerWrite2(str){
    //   this.text = str.split('').reduce((acc, cur) => {
    //     if (this._ink > 0 )  {
    //       acc+= cur;
    //       if (cur!=' ') this._ink -=0.5;
    //     } return acc;
    //   },'');
    //   this.text = '<p style = "margin-left:15px; color:' + this.color + ';">' + this.text + '</p>';
    //   return this;
    // }

    writeStatus(){
      if (this.temp.length > 2) this.temp[1] = '<tt> Закончились чернила! Чтобы допечатать оставшийся текст необходимо заправить маркер на'+ this.temp[2] +' едениц.</tt>';
      else this.temp[1]= '<tt>Печать успешно завершенна.</tt>';
      return this;
    }

    resumeWrite(){
      if(this._ink>0) {                                                         //
        let str = this.temp[0];
        this.temp[0] = '';
        this.markerWrite1(str);
      }
      return this;
    }
  }

  class RefuelingMarker extends Marker_printer  {
    get ink() {
      return this._ink;
    }

    set ink(fuel){
      if (Number(fuel)) {
        this._ink = this._ink + Math.abs(fuel);
        this.temp.length = 2;
        if (this._ink>100) this._ink = 100;
      }
      if (this.temp[0].length > 0) this.resumeWrite();
      return this;
    }
  }

  class Human {
    drawsMarker(marker){
      return '<p style = "margin-left:15px; color:' + marker.color + ';">' + marker.text + '</p>' + marker.temp[1];
    }


    refillsMarker(marker){
      marker.ink = 100;
      return this;
    }
  }

// --------------------------------------------------------------------- 2-e задание --------------------------------------------------------------------------
class ExtentedDate extends Date {

  numberToText2(){                                                        // метод преобразования числа из цифры в слова
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
    return this;
  }

  testTime(){
    return (this.getTime() > new Date().getTime());
  }

  testLeapYear(){
    this.userYear = this.getFullYear();
    return (( this.userYear % 4 == 0  && this.userYear % 100 == 0 && this.userYear % 400 == 0) || (this.userYear % 4 == 0  && this.userYear % 100 != 0));
  }

  nextDate(){
    this.setDate(this.getDate()+1);
    return this.toLocaleDateString();
  }
}

// --------------------------------------------------------------------- 3-e задание --------------------------------------------------------------------------

  class Employee {
    constructor(name, departmen, specialty, employment_date ) {
      this._name = name;
      this.departmen = departmen;
      this.specialty = specialty;
      this.employment_date = employment_date;
    }
  }

 class EmpTable  {
   constructor(arrEmployee) {
     this.Employee = arrEmployee;
     this.str = '';
   }

   getHtml(){
       this.str = '<table border="1"><caption>Список работников банка</caption><tr><th>ФИО</th><th>Подразделение'+
       '</th><th>Должность</th><th>Дата приема на работу</th></tr>';
       for (var i = 0; i < this.Employee.length; i++) {
         this.str += '<tr><td>'+this.Employee[i]._name + '</td><td>' + this.Employee[i].departmen + '</td><td>'
          + this.Employee[i].specialty + '</td><td>' + this.Employee[i].employment_date + '</td></tr>';
       }
       this.str += '</table>';
       return this.str;
     }
 }


  window.onload = function () {

    click101.onclick = function () {
     let str = document.getElementById('input101').value;
     let color = document.getElementById('input102').value;
     let q = new RefuelingMarker(color).markerWrite1(str);
     let vasya = new Human();
      out101.innerHTML=vasya.drawsMarker(q);
     console.log(q, q.temp);

     // vasya.refillsMarker(q);                                                               // дозаправка чернил
     out101.innerHTML=vasya.refillsMarker(q).drawsMarker(q);
     console.log(q, q.temp);
   }

    click201.onclick = function () {
      let str = document.getElementById('input201').value.split('.').map((x)=>Number(x));
      if (!(Number.isInteger(str[0]) && Number.isInteger(str[1]) && Number.isInteger(str[2]))) return out201.innerHTML='data entry is incorrect';           //делаем минимальную проверку на ошибку ввода
      let objDate = new ExtentedDate(str[2], str[1]-1, str[0] ).numberToText2();
      out201.innerHTML = objDate.rezalt +'<br>';
      out201.innerHTML+='является ли дата будущим? - ' + objDate.testTime() +'<br>';;
      out201.innerHTML+='является ли данный год высокосным? - ' + objDate.testLeapYear() + '<br>';
      out201.innerHTML+='следущаяя дата будет - ' + objDate.nextDate() +' '+ objDate.nextDate();
    }

    click301.onclick = function () {
      let employee1  = new Employee('Иванов И.', 'Юридическое управление', 'Юрисконсульт', '01.01.2020');
      let employee2 = new Employee('Горбунов Г.', 'Бухгалтерия', 'Бухгалтер', '01.06.2020');
      let employee3 = new Employee('Кобзар Ж.', 'Управление безопасности и контроля', 'Начальник отдела безопасности', '01.05.2016');
      let employee4 = new Employee('Легойда А.', 'Пиар (PR) и реклама.', 'Начальник отдела развития', '06.09.2018');

      let arrEmployee = [employee1, employee2, employee3, employee4];

      let userTab = new EmpTable(arrEmployee);
      out301.innerHTML = userTab.getHtml();
    }
  }
