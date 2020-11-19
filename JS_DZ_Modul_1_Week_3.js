
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

  function numberLength(someNumbers) {
    let i=0, j=someNumbers;
    while (someNumbers>0) {
      someNumbers =  Math.floor(someNumbers/10);
      ++i;
    }
    return i;
  }

  function digitСapacity (){
    let userNumbers = prompt("Введите целое число", "234567856");    //  Самый простой вариант:
    const p = /^[0-9]+$/g;                                           // i=userNumbers.length;
    if (!p.test(userNumbers))  {
      nuberArea3.innerHTML= 'Нужно ввести целое число, сэр!';
      return false;
    }
    let i=numberLength(userNumbers);
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

  function loopСalculator (){
    let rezult_=0;
    do {
      var userNumbers = prompt("Введите два числа и математический оператор между ними", "32 >> 4");
      if(userNumbers) {
        alert(userNumbers+' = '+eval(userNumbers) );
        rezult_=userNumbers;
      }
    } while (userNumbers);
    nuberArea5.innerHTML='Цикл остановлен:) ' + rezult_+' = '+eval(rezult_);
  }

  function numberShift() {
    let userNumbers = prompt("Введите целое число и число сдвига цифр через запятую", "23455677888, 5"); //  Не исползуя(почти) свойсва строк и массивов JS
    if (!userNumbers) return false;
    let arrayOfStrings = userNumbers.split(',');
    let i =numberLength(arrayOfStrings[0]);
    let n = arrayOfStrings[1], rezult_=arrayOfStrings[0], m;
    for (var k = 0; k < n; k++) {
      m = Math.floor(rezult_/10**(i-1));
      rezult_=((rezult_ - m*(10**(i-1)))*10 + m);
    }
    nuberArea6.innerHTML='Ваше число ' + arrayOfStrings[0] +' сдвинутое на '+ arrayOfStrings[1] + ' знаков = '+ rezult_;
  }

  function numberShift1() {                                                                                   // Используя мощь JS)
    let userNumbers = prompt("Введите целое число и число сдвига цифр через запятую", "456jfhjhc65, 6");
    if (!userNumbers) return false;
    let arrayOfStrings = userNumbers.split(',');
    let arrayNumber = arrayOfStrings[0].split('');
    let n = arrayOfStrings[1], rezult_=0, m;
    for (var k = 0; k < n; k++) {
      m = arrayNumber.shift();
      rezult_ = arrayNumber.push(m);
    }
    nuberArea7.innerHTML='Ваше число ' + arrayOfStrings[0] +' сдвинутое на '+ arrayOfStrings[1] + ' знаков = '+ arrayNumber.join('');
  }
