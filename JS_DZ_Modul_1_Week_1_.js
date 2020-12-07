
  function hello(){
    var userName = prompt("Как вас зовут?", "Введите ваше имя.");
    if (userName){
      alert("Рад вас видеть, " + userName + "!");
      haispan.innerHTML = "Рады видеть вас " + userName ;
    }
  }

  function age(){
    const userAge = prompt("Сколько вам лет?", "18");
    const p = /^[0-9]+$/g;
    const YEAR = 2020;
    if (p.test(userAge)) {
      const userYear = YEAR - 	userAge;
      alert("Вы родились в " + userYear + " году.");
    }
    else alert("Нам нужна только цифра, сэр!");
  }

  function areaSquare(){
    const sideSquare = prompt("Введите сторону квадрата, м:", "10");
    const p = /^\d+(?:[\.,]\d+)?$/g;
    if (p.test(sideSquare)) {
      const Square = parseInt(sideSquare, 10)**2;
      alert("площадь квадрата " + Square + " М2.");
    }
    else alert("Нам нужна только цифра, сэр!");
  }

  function desiredSpeed(){
    const distance = prompt("Введите расстояние между городами, км:", "10");
    const movingTime = prompt("Введите время пути, час:", "1");
    const p = /^[0-9]+$/g;
    const pr = /^[0-9]+$/g;
    if (pr.test(movingTime) && p.test(distance)) {
      const Speed =distance/movingTime;
      alert("необходимая скорость " + Speed + " км/ч.");
    }
    else alert(p.test(distance)   + " Нам нужна только цифра, сэр! ");
  }

  function areaCircle(){
    const radiusCircle = prompt("Введите радиус окружности, м:", "10");
    const p = /^\d+(?:[\.,]\d+)?$/g;
    if (p.test(radiusCircle)) {
      const Square = parseInt(radiusCircle, 10)**2*Math.PI;
      alert("площадь окружности " + Square + " М2.");
    }
    else alert("Нам нужна только цифра, сэр!");
  }

  function сonverter(){
    const dollar = prompt("Введите сумму, $:", "100");
    const EURO = .8501492537313433;
    const p = /^\d+(?:[\.,]\d+)?$/g;
    if (p.test(dollar)) {
      const transferEuro = dollar*EURO;
      alert("получается аж " + transferEuro.toFixed(2) + " евро.");
    }
    else alert("Нам нужна только цифра, сэр!");
  }

  function сonverterDisk(){
    const diskSpace = prompt("Введите емкость флешки, ГБ:", "32");
    const GBINMb = 1024;
    const MBSPACE = 850;
    const p = /^[0-9]+$/g;
    if (p.test(diskSpace)) {
      const transferMB = diskSpace*GBINMb/MBSPACE;
      alert("на вашу флешку запишется " + transferMB.toFixed() + " файлов размером 850МБ");
    }
    else alert("Нам нужна только цифра, сэр!");
  }

  function buyСhocolate(){
    const money_ = prompt("Введите сумму денег в кошельке, гр:", "99.99");
    const сhocolate_ = prompt("Введите стоимость одной шоколадки, гр:", "9.99");
    const p1 = /^\d+(?:[\.,]\d{1,2})?$/g;
    const p2 = /^\d+(?:[\.,]\d{1,2})?$/g;
    if (p1.test(money_) && p2.test(сhocolate_)) {
      if (money_ < сhocolate_) alert('Увы, Вы не сможете ничего купить. У Вас всего '+ money_ +' гр.');
      else {
        const amountСhocolate = Math.floor(money_/сhocolate_);
        const surrender = money_ % сhocolate_;
        alert("Вы сможете купить " + amountСhocolate + " шоколадок(ки). Ваша сдача " + surrender.toFixed(2) +' гр.');
      }
    }
    else alert("Введите сумму денег цифрами, сэр!");
  }

  function reversNumber() {
    let freeNumber = Math.abs(prompt("Введите произвольное целое  число: ", "123"));
    const p = /^[0-9]{1,16}$/g;                        // работает только с разрядностью <=16
    if (p.test(freeNumber)) {
      let result_ = 0;
      while (freeNumber>0) {                          // есть вариант намного проще
        result_ = result_*10 + freeNumber%10;         // alert(freeNumber.split("").reverse().join(""));
        freeNumber = Math.floor(freeNumber/10);
      }
      alert("Ваше число наоборот будет "+ result_);
    }
    else alert("Введите целое число, максимальный разряд 16,  сэр!");
  }

  function parityNumber(){
    const freeNumber = Math.abs(prompt("Введите произвольное целое  число: ", "123"));
    const p = /^[0-9]+$/g;
    if (p.test(freeNumber)){
      let result_ = ((freeNumber&1)==0) ? 'четное': 'нечетное';
      alert("Ваше число "+ result_);
    }
    else alert("Введите целое число,  сэр!");
  }
