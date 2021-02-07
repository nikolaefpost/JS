
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
     this.employee = arrEmployee;
     this.str = '';
   }

   getHtml(){
       this.str = '<table border="1" ><caption>Список работников банка</caption><tr><th>ФИО</th><th>Подразделение'+
       '</th><th>Должность</th><th>Дата приема на работу</th></tr>';
       for (var i = 0; i < this.employee.length; i++) {
         this.str += '<tr><td>'+this.employee[i]._name + '</td><td>' + this.employee[i].departmen + '</td><td>'
          + this.employee[i].specialty + '</td><td>' + this.employee[i].employment_date + '</td></tr>';
       }
       this.str += '</table>';
       return this.str;
     }
 }

// --------------------------------------------------------------------- 4-e задание --------------------------------------------------------------------------

class StyledEmpTable extends EmpTable{

  getStyles(arrTegStr){
    this.styles = '<style>';
    this.styles += arrTegStr.reduce((acc, cur) => {return acc+=cur},'');
    this.styles += '</style>';
    return this;
  }
  getHtml(){
    super.getHtml();
    return this.str += this.styles ? this.styles : '';
  }

  getHtml1(){
    super.getHtml();
    let head = document.getElementsByTagName('head')[0];
    head.innerHTML += this.styles ? this.styles : '';
    return this.str;
  }

}

class tegStyle {
  constructor(name_) {                                                        // реализация с помощью Map()
    this.name_ = name_;
    this._style = new Map();
  }

  set_style(key, value){
    this._style.set(key, value);
    return this;
  }

  delete_style(key){
    this._style.delete(key);
    return this;
  }

  getCss(){
    this.str =this.name_ + ' { ';
    for (var [key, value] of this._style) this.str += key + ':' + value+'; ';
    this.str +='}';
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

     out101.innerHTML=vasya.refillsMarker(q).drawsMarker(q);                    // дозаправка чернил
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


    let employee1  = new Employee('Иванов И.', 'Юридическое управление', 'Юрисконсульт', '01.01.2020');
    let employee2 = new Employee('Горбунов Г.', 'Бухгалтерия', 'Бухгалтер', '01.06.2020');
    let employee3 = new Employee('Кобзар Ж.', 'Управление безопасности и контроля', 'Начальник отдела безопасности', '01.05.2016');
    let employee4 = new Employee('Легойда А.', 'Пиар (PR) и реклама.', 'Начальник отдела развития', '06.09.2018');
    let arrEmployee = [employee1, employee2, employee3, employee4];
    // let head = document.getElementsByTagName('head')[0];

    click301.onclick = function () {
      let userTab = new EmpTable(arrEmployee);
      out301.innerHTML = userTab.getHtml();
      out401.innerHTML = '';
    }

    click401.onclick = function () {
      let userTab = new StyledEmpTable(arrEmployee);
      let tbl = new tegStyle('table').set_style('border-bottom-right-radius', '5px').set_style('box-shadow', '10px 5px 5px grey').set_style('border', 'none').getCss();
      let cpt = new tegStyle('caption').set_style('padding', '10px').set_style('color', 'white').set_style('background', '#4682B4').set_style('border-top-right-radius', '5px').set_style('font-weight', 'bold').getCss();
      let th = new tegStyle('th').set_style('border-bottom', '3px solid #B9B29F').set_style('padding', '10px').set_style('text-align', 'left').getCss();
      let td = new tegStyle('td').set_style('padding', '10px').set_style('border-top-right-radius', '5px').getCss();
      let tr = new tegStyle('tr').set_style('background', 'white').getCss();

      //head.innerHTML += userTab.getStyles([tbl, cpt, th, td, tr]).styles;
      //out401.innerHTML = userTab.getStyles([tbl, cpt, th, td, tr]).getHtml();
      out401.innerHTML = userTab.getStyles([tbl, cpt, th, td, tr]).getHtml();
      out301.innerHTML = '';
    }

  }













































    function shake(e, oncomplete, distance, time) {
	// Обработка аргументов
	if (typeof e === "string")
		e = document.getElementByld(e);

	if (!time) time = 500;
	if (!distance) distance = 5;
	var originalStyle = e.style.cssText;	// Сохранить оригинальный стиль e
	e.style.position = "relative";			// Сделать относит. позиционируемым
	var start = (new Date()).getTime();		// Запомнить момент начала анимации
	animate();								// Запустить анимацию

	// Эта функция проверяет прошедшее время и изменяет координаты e.
	// Если анимацию пора завершать, восстанавливает первоначальное состояние
	// элемента e. Иначе изменяет координаты e и планирует следующий свой вызов.
	function animate() {
		var now = (new Date()).getTime();	// Получить текущее время
		var elapsed = now-start;			// Сколько прошло времени с начала?
		var fraction = elapsed / time;		// Доля от требуемого времени?
		if (fraction < 1) {
			// Если рано завершать анимацию
			// Вычислить координату x элемента e как функцию от доли общего
			// времени анимации. Здесь используется синусоидальная функция,
			// а доля общего времени воспроизведения умножается на 4pi,
			// поэтому перемещение взад и вперед выполняется дважды.
			var x = distance * Math.sin(fraction*4*Math.PI);
			e.style.left = x + "px";

			// Попробовать вызвать себя через 25 мсек или в конце запланированного
			// отрезка общего времени воспроизведения. Мы стремимся сделать
			// анимацию гладкой, воспроизводя ее со скоростью 40 кадров/сек.
			setTimeout(animate, Math.min(25, time-elapsed));
		}
		else {	// Иначе анимацию пора завершать
			e.style.cssText = originalStyle;	// Восстановить первонач. стиль
			if (oncomplete) oncomplete(e);		// Вызвать ф-цию обратного вызова
		}
	}
}

// Растворяет e от состояния полной непрозрачности до состояния полной прозрачности
// за указанное количество миллисекунд. Предполагается, что, когда вызывается
// эта функция, e полностью непрозрачен. oncomplete - необязательная функция,
// которая будет вызвана с элементом e в виде аргумента по завершении анимации.
// Если аргумент time не задан, устанавливается интервал 500 мсек.
// Эта функция не работает в IE, но ее можно модифицировать так, чтобы
// в дополнение к свойству opacity она использовала нестандартное
// свойство filter, реализованное в IE.
function fadeOut(e, oncomplete, time) {
	if (typeof e === "string")
		e = document.getElementByld(e);

	if (!time) time = 500;

	// В качестве простой "функции перехода", чтобы сделать анимацию немного
	// нелинейной, используется Math.sqrt: сначала растворение идет быстро,
	// а затем несколько замедляется.
	var ease = Math.sqrt;
	var start = (new Date()).getTime();		// Запомнить момент начала анимации
	animate();	// И запустить анимацию

	function animate() {
		var elapsed = (new Date()).getTime()-start;	// Прошедшее время
		var fraction = elapsed/time;				// Доля от общего времени

		if (fraction < 1) {	// Если не пора завершать
			var opacity = 1 - ease(fraction);		// Вычислить непрозрачн.
			e.style.opacity = String(opacity);		// Установить ее в e
			setTimeout(animate,	Math.min(25, time-elapsed));
		}
		else {	// Иначе завершить
			e.style.opacity = "0";	// Сделать e полностью прозрачным
			if (oncomplete) oncomplete(e); // Вызвать ф-цию обратного вызова
		}
	}
}
