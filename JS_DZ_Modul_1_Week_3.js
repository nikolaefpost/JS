
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

  function divisors (){
    let userNumbers = prompt("Введите целое число", "45");
    const p = /^[0-9]+$/g;
    if (!p.test(userNumbers))  {
      nuberArea2.innerHTML= 'Нужно ввести целое число, сэр!';
      return false;
    }
    let rezultArray = [], j=0;
    for (var i = 0; i < userNumbers; i++) {
      if (userNumbers%i==0) {
        rezultArray[j++] = i;
      }
    }
    nuberArea2.innerHTML='У числа '+userNumbers+' следущие делители: '+rezultArray.toString();
  }


  function digitСapacity (){
    let userNumbers = prompt("Введите целое число", "234567856");    //  Самый простой вариант:
    const p = /^[0-9]+$/g;                                           // i=userNumbers.length;
    if (!p.test(userNumbers))  {
      nuberArea3.innerHTML= 'Нужно ввести целое число, сэр!';
      return false;
    }
    let i=0, j=userNumbers;
    while (j>0) {
      j =  Math.floor(j/10);
      ++i;
    }
    nuberArea3.innerHTML='В числе '+userNumbers+': '+i+' цифр.';
  }

  function arrayNumbers (){
    let userNumbers = prompt("Введите  числа, через пробел, допускается ввод отрицательных чисел, вещественных чисел через точку и ноль", "18 30 -12 456 0 -45 75 876.5 -1 23");
    var arrayOfStrings = userNumbers.split(' ');
    let k=l=lo=nc=c=0;
    for (var i = 0; i < arrayOfStrings.length; i++) {
      if (arrayOfStrings[i]%2==0) {
        if (!(arrayOfStrings[i]==0)) c++;
        else lo++;
      }
      else nc++;
      if (arrayOfStrings[i]>0) {k++; console.log(arrayOfStrings[i]);}
      if (arrayOfStrings[i]<0) l++;
    }
    nuberArea4.innerHTML='В массиве чисел: '+arrayOfStrings.toString()+'--- четных чисел: '+c+', не четных: '+nc+', положительных:'+k+', отрицательных:'+l+', равных нулю:'+lo ;
  }

  function arrayNumbers (){
    do {
      let userNumbers = prompt("Введите  числа, через пробел, допускается ввод отрицательных чисел, вещественных чисел через точку и ноль", "18 30 -12 456 0 -45 75 876.5 -1 23");
      var arrayOfStrings = userNumbers.split(' ');

} while (userNumbers);


    nuberArea4.innerHTML='В массиве чисел: '+arrayOfStrings.toString()+'--- четных чисел: '+c+', не четных: '+nc+', положительных:'+k+', отрицательных:'+l+', равных нулю:'+lo ;
  }
