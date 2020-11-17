
  function sumNumbers (){
    let userNumbers = prompt("Введите диапазон чисел, через запятую", "3,34");
    const p = /^[0-9]*[,][0-9]*$/g;
    if (p.test(userNumbers))  var arrayOfStrings = userNumbers.split(',');
    else {
      nuberArea0.innerHTML= 'Нужно ввести два целых числа через запятую, сэр!';
      return false;
    }
    let i =Number(arrayOfStrings[0]), rezalt_=0;
    while (i<=arrayOfStrings[1]) {
      rezalt_+=i;
      i++;
    }
    nuberArea0.innerHTML='Сумма всех чисел в диапазонене от '+arrayOfStrings[0]+' до '+arrayOfStrings[1]+ ' = ' + rezalt_ ;
  }


  function greatestCommonFactor (){
    let userNumbers = prompt("Введите два числа, через запятую", "18,30");
    const p = /^[0-9]*[,][0-9]*$/g;
    if (p.test(userNumbers))  var arrayOfStrings = userNumbers.split(',');
    else {
      nuberArea1.innerHTML= 'Нужно ввести два целых числа через запятую, сэр!';
      return false;
    }
    let a =Number(arrayOfStrings[0]);
    let b =Number(arrayOfStrings[1]);
    while (a!=0 && b!=0) {
      if (a>b) a=a%b;
      else b=b%a;

    }
    nuberArea1.innerHTML='Наибольший общий делитель равен '+(a+b) ;
  }
divisors
  function divisors (){
    let userNumbers = prompt("Введите целое число", "45");
    const p = /^[0-9]+$/g;
    if (p.test(userNumbers))  var arrayOfStrings = userNumbers.split(',');
    else {
      nuberArea2.innerHTML= 'Нужно ввести целое число, сэр!';
      return false;
    }
    nuberArea1.innerHTML='Наибольший общий делитель равен '
    let a =Number(arrayOfStrings[0]);
    let b =Number(arrayOfStrings[1]);
    while (a!=0 && b!=0) {
      if (a>b) a=a%b;
      else b=b%a;

    }
    nuberArea1.innerHTML='Наибольший общий делитель равен '+(a+b) ;
  }
