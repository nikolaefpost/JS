
  function sortNumbers (){
    let userNumbers = prompt("Введите два числа, через запятую", "18,30");
    const p = /^[0-9]*[,][0-9]*$/g;
    if (p.test(userNumbers))  var arrayOfStrings = userNumbers.split(',');
    else {
      nuberArea0.innerHTML= 'Нужно ввести два целых числа через запятую, сэр!';
      return false;
    }
    let a =Number(arrayOfStrings[0]);
    let b =Number(arrayOfStrings[1]);
    if (a<b) {
      nuberArea0.innerHTML='Результат вычисления: -1';
      return -1;
    }
    if (a>b) {
      nuberArea0.innerHTML='Результат вычисления: 1';
      return 1;
    }
    else {
      nuberArea0.innerHTML='Результат вычисления: 0';
      return 0;
    }
  }

  function factorial(n) {
    return (n != 1) ? n * factorial(n - 1) : 1;
  }

  function computationFactorial (){
    let userNumbers = prompt("Введите целое число", "45");
    const p = /^[1-9][0-9]*$/g;
    if (!p.test(userNumbers))  {
      nuberArea1.innerHTML= 'Нужно ввести целое число,больше нуля, сэр!';
      return false;
    }
    nuberArea1.innerHTML= 'Факториал числа: '+userNumbers+' равен : '+  factorial(userNumbers)+' .' ;
  }

  function concatNumber (){
    let userNumbers = prompt("Введите три числа, через запятую", "18,30,9");
    const p = /^[0-9]+[,][0-9]+[,][0-9]+$/g;
    if (!p.test(userNumbers))  {
      nuberArea2.innerHTML= 'Нужно ввести три целых числа через запятую, сэр!';
      return false;
    }
    arrayOfStrings = userNumbers.split(',').join('');
    nuberArea2.innerHTML='Результат вычисления чисел '+userNumbers+ ' в строку: '+arrayOfStrings;
  }

  function areaSquare () {
    let userNumbers = prompt('Введите значение сторон прямоугольника через запятую или  сторону квадрата: ', '23,12');
    const p = /^\d+(?:[\.,]\d*)?$/g;
    if (p.test(userNumbers)) {
      let arrayOfStrings = userNumbers.split(',');
      if (!arrayOfStrings[1]) nuberArea3.innerHTML='Площадь квадрата с стороной '+arrayOfStrings[0]+ 'м  равна: '+arrayOfStrings[0]**2+' м2';
      else nuberArea3.innerHTML='Площадь прямоугольника со сторонами '+arrayOfStrings[0]+'м и '+arrayOfStrings[1]+'м  равна: '+ arrayOfStrings[1]*arrayOfStrings[0]+' м2';
    }
    else nuberArea3.innerHTML='Нужно ввести два целых числа через запятую или одно если у вас квадрат, сэр!';
  }

  function perfectNumber(s) {
    let rezultArray = [], j=0, a=[];
    for (var i = 0; i < s; i++) {
      if (s%i==0) {
        rezultArray[j++] = i;
      }
    }
    a[0]='У числа '+s+' следущие делители: '+rezultArray.toString();
    a[1] = (rezultArray.reduce(function(x,y) { return x+y; })==s);
    return a;
  }

  function isPerfectNumber (){
    let userNumbers = prompt("Введите целое число", "28");
    let q=0;
    const p = /^[0-9]+$/g;
    if (!p.test(userNumbers))  {
      nuberArea4.innerHTML= 'Нужно ввести целое число, сэр!';
      return false;
    }
    q = perfectNumber(userNumbers);                                 // Замыкание ???
    nuberArea4.innerHTML='У числа '+userNumbers+' следущие делители: '+q[0];
    if (q[1]) nuberArea4.innerHTML=q[0]+' это число СОВЕРШЕННОЕ!!!';
    else nuberArea4.innerHTML=q[0]+' это число НЕ совершенное!!!';
  }

  function isPerfectNumberArea (){
    let userNumbers = prompt("Введите диапазон чисел, через запятую", "3,34");
    const p = /^[0-9]+[,][0-9]+$/g;
    if (p.test(userNumbers))  var arrayOfStrings = userNumbers.split(',');
    else {
      nuberArea5.innerHTML= 'Нужно ввести два целых числа через запятую, сэр!';
      return false;
    }
    let i =Number(arrayOfStrings[0]), tempArr=[];
    while (i<=arrayOfStrings[1]) {
      q = perfectNumber(i);
      console.log(q);
      if (q[1]) tempArr.push(i);
      i++;
    }
    nuberArea5.innerHTML='В диапазоне от '+arrayOfStrings[0]+' до '+arrayOfStrings[1]+ ' находятся следущие совершенные числа: ' + tempArr.join() ;
  }
