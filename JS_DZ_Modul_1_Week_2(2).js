  const p = /^[0-9]+$/g;

  function age () {
    const userAge = prompt("Введите ваш возраст цифрами:", "25");
    if (p.test(userAge)) {
      if(userAge >= 0 && userAge<12) nuberArea0.innerHTML= 'Вы ещё ребенок.';
      if(userAge >= 12 && userAge<18) nuberArea0.innerHTML= 'Вы уже подросток.';
      if(userAge >= 18 && userAge<60) nuberArea0.innerHTML= 'Вы взрослый человек.';
      if(userAge >= 60) nuberArea0.innerHTML= 'Жизнь только начинается, вы пенсионер!';
    }
    else nuberArea0.innerHTML= 'Нам нужна только цифра, сэр!';
  }

  function specialSymbol (){
    const buttonNumber = document.getElementById("FormButton").options.selectedIndex;
    switch (buttonNumber) {
      case 0:
      nuberArea1.innerHTML= 'Ваш символ _)_';
      break;
      case 1:
      nuberArea1.innerHTML= 'Ваш символ _!_';
      break;
      case 2:
      nuberArea1.innerHTML= 'Ваш символ _@_';
      break;
      case 3:
      nuberArea1.innerHTML= 'Ваш символ _#_';
      break;
      case 4:
      nuberArea1.innerHTML= 'Ваш символ _$_';
      break;
      case 5:
      nuberArea1.innerHTML= 'Ваш символ _%_';
      break;
      case 6:
      nuberArea1.innerHTML= 'Ваш символ _^_';
      break;
      case 7:
      nuberArea1.innerHTML= 'Ваш символ _&_';
      break;
      case 8:
      nuberArea1.innerHTML= 'Ваш символ _*_';
      break;
      case 9:
      nuberArea1.innerHTML= 'Ваш символ _(_';
      break;
      default:
      nuberArea1.innerHTML= 'Нужно выбрать клавишу от 0 до 9';
    }
  }

  function sameNumbers() {         																					// работает с любыми символами
    const userNumber = prompt("Введите любое число:", "123678943");
    nuberArea.innerHTML= 'В числе: '+ userNumber;
    var arrayOfStrings = userNumber.split('');
    let m=0;
    for (let i = 0; i < arrayOfStrings.length; i++){
      let j=i, k=0;
      while (j>=0 ) {
        j =	arrayOfStrings.indexOf(arrayOfStrings[i], ++j);
        if (arrayOfStrings[i] && j>=0) {
          arrayOfStrings[j]=null;
          k++;
        }
        if	(j==-1 && k>0)  {
          nuberArea.innerHTML+= ', число '+ arrayOfStrings[i] + ' повторяется ' + k +' раз(а)';
          m++
        }
      }
    }
    if (m<=0) nuberArea.innerHTML+= ', числа не повторяются.';
  }


  function leapYear () {
    const userYear = prompt("Введите интересующий вас год:", "2020");
    const p = /^[0-9]{4,4}$/g;
    if (p.test(userYear)) {
      if(( userYear % 4 == 0  && userYear % 100 == 0 && userYear % 400 == 0) || (userYear % 4 == 0  && userYear % 100 != 0)) yearArea.innerHTML=userYear +' -этот год высокосный';
      else yearArea.innerHTML=userYear +' -этот год не высокосный';
    }
    else alert("Нам нужна только 4х значная цифра, сэр!");
  }

  function Palindrome () {																								// работает с любыми символами
    const userNumber = prompt("Введите любое число:", "123454321");
    let i=0;
    if	(isPalindrome(userNumber,i))  nuberArea2.innerHTML= 'Число '+ userNumber + ' является палиндромом.';
    else nuberArea2.innerHTML= 'Число '+ userNumber + ' не является палиндромом.';
    function isPalindrome(s,i) {
      return (i=i||0)<0||i>=s.length>>1||s[i]==s[s.length-1-i]&&isPalindrome(s,++i);
    }
  }

  function currencyExchange () {
    let amountMoney = document.getElementById('amount').value;
    const p = /^\d+(?:[\.,]\d+)?$/g;
    const EURO = .85015;
    const UAN = 28.19630;
    const RUB = 77.11482;
    let rezult_=0;
    if (p.test(amountMoney)) {
      if (document.getElementById('r1').checked)  rezult_=(amountMoney*EURO).toFixed(2) +' EURO';
      if (document.getElementById('r2').checked)  rezult_=(amountMoney*UAN ).toFixed(2) +' UAN';
      if (document.getElementById('r3').checked)  rezult_=(amountMoney*RUB ).toFixed(2) +' RUB';
      field.innerHTML=amountMoney + '$ '+ 'составляет ' +rezult_;
    }
  }

  function discountBuy () {
    let userMoney = prompt("Введите сумму покупки,гр:", "599.95");
    let discount_  = 0;
    const p = /^\d+(?:[\.,]\d+)?$/g;
    if (!p.test(userMoney)) nuberArea3.innerHTML= 'Нам нужна только цифра, сэр!';
    else {
      if(userMoney >= 200 && userMoney<300) discount_ = 3;
      if(userMoney >= 300 && userMoney<500) discount_ = 5;
      if(userMoney >= 500) discount_ = 7;
      nuberArea3.innerHTML= 'Ваша скидка составляет: '+ discount_ + ' %,'+ ' сумма с учетом скидки: ' + (userMoney*(100 - discount_)/100).toFixed(2) + ' гр.';
    }
  }

  function geometricСalculations (){
    let perimeterSquare = prompt("Введите периметр  квадрата, м:", "20");
    let circumFerence = prompt("Введите длину окружности, м:", "30");
    const p = /^\d+(?:[\.,]\d+)?$/g;
    const p1 = /^\d+(?:[\.,]\d+)?$/g;
    if (p.test(perimeterSquare) && p1.test(circumFerence)) {
      let m = (perimeterSquare>>2)/(circumFerence/Math.PI);
      if (m>=1)  nuberArea4.innerHTML= 'Окружность может быть вписана в квадрат.'
      else nuberArea4.innerHTML= 'Окружность не может быть вписана в квадрат.'
    }
    else  nuberArea4.innerHTML= 'Нам нужна только цифра, сэр!';
  }

  function TestD () {
    let rezult_=0;
    if (document.getElementById('rr2').checked)  rezult_+=2;
    if (document.getElementById('pp1').checked)  rezult_+=2;
    if (document.getElementById('ss1').checked)  rezult_+=2;
    field5.innerHTML='Поздравляю! Вы набрали '+ rezult_ +' баллов(а)';
  }

  function nextDay (){
    let userDay = prompt("Введите дату в формате: dd.mm.yyyy", "15.11.2020");
    let d = userDay.split(".");
    d[1] -= 1;
    let rezultDay = new Date(d[2], d[1], d[0]);
    if ((rezultDay.getFullYear() == d[2]) && (rezultDay.getMonth() == d[1]) && (rezultDay.getDate() == d[0])) {
      rezultDay.setDate(rezultDay.getDate() + 1);
      nuberArea6.innerHTML=rezultDay.getDate()+'.'+(rezultDay.getMonth()+1)+'.'+rezultDay.getFullYear();
    } else {
      alert("Введена некорректная дата!");
    }
  }
