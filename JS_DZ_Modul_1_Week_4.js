
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
      if (s%i==0) rezultArray[j++] = i;
    }
    return rezultArray;
  }

  function isPerfectNumber (){
    let userNumbers = prompt("Введите целое число", "28");
    let q=0;
    const p = /^[0-9]+$/g;
    if (!p.test(userNumbers))  {
      nuberArea4.innerHTML= 'Нужно ввести целое число, сэр!';
      return false;
    }
    q = perfectNumber(userNumbers);                                 //   строка 62 Замыкание ???
    nuberArea4.innerHTML='У числа '+userNumbers+' следущие делители: '+q.toString();
    if (q.reduce(function(x,y) { return x+y; })==userNumbers) nuberArea4.innerHTML+=' это число СОВЕРШЕННОЕ!!!';
    else nuberArea4.innerHTML+=' это число НЕ совершенное!!!';
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
      q = perfectNumber(i);                               // строка 62
      let sum=0;                                         // //if (q.reduce(function(x,y) { return x+y; })==i) tempArr.push(i);
      for (let i = 0; i < q.length; i++) sum+=q[i];     //не работает с диапазоном  больше 100.
      if (sum==i) tempArr.push(i);
      i++;
    }
    nuberArea5.innerHTML='В диапазоне от '+arrayOfStrings[0]+' до '+arrayOfStrings[1]+ ' находятся следущие совершенные числа: ' + tempArr.join() ;
  }

  function setUserTime(arr) {
    let UserTime = new Date;
    UserTime.setHours(arr[0], arr[1], arr[2] );
    if ((UserTime.getHours() == arr[0]) && (UserTime.getMinutes() == arr[1]) && (UserTime.getSeconds() == arr[2])) return UserTime;
    else return false;
  }

  function innerTime() {
    let tempTime = prompt("Введите время в формате: час,мин,сек", "15,30,00");
    tempTime = tempTime.split(",");
    tempTime[1] ? tempTime[1] : tempTime[1]=0;                         // если минуты не введены утанавливаем 00;
    tempTime[2] ? tempTime[2] : tempTime[2]=0;                        // если секунды не введены утанавливаем 00;
    if (setUserTime(tempTime)) nuberArea6.innerHTML=setUserTime(tempTime).toLocaleTimeString();
    else nuberArea6.innerHTML="Введено некорректное время!";
  }




  function getUserSeconds(arr1,arr2) {
    arr2 ? arr2 : arr2=[0,0,0];
    let UserTime = new Date;
    UserTime.setHours(arr1[0], arr1[1], arr1[2] );
    let nullTime = new Date;
    nullTime.setHours(arr2[0], arr2[1], arr2[2] );
    if ((UserTime.getHours() == arr1[0]) && (UserTime.getMinutes() == arr1[1]) && (UserTime.getSeconds() == arr1[2]) && (nullTime.getHours() == arr2[0]) && (nullTime.getMinutes() == arr2[1]) && (nullTime.getSeconds() == arr2[2])){
      let rezalt_= (UserTime.getTime() - nullTime.getTime())/1000;
      return rezalt_;
    } else return false;
  }

  function innerSeconds() {
    let tempTime = prompt("Введите время в формате: час,мин,сек", "09,30,00");
    tempTime ? tempTime = tempTime.split(","): tempTime = [0,0,0];
    if (getUserSeconds(tempTime)) nuberArea8.innerHTML='С начала суток прошло: '+  getUserSeconds(tempTime)+' секунд';
    else nuberArea8.innerHTML="Введено некорректное время!";
  }

function getUserTime(cek1,cek2) {
  cek2 ? cek2 : cek2=0;
  let rezalt_=cek1-cek2;
  let UserTime = new Date;
  UserTime.setHours(0, 0, rezalt_ );
  return UserTime.toLocaleTimeString();
}

  function innerSecondstoHour() {
    let tempTime = prompt("Введите время в сек", "1200");
    tempTime ? tempTime: tempTime = 0;
    nuberArea9.innerHTML= tempTime +'  секунд составляет: '+  getUserTime(tempTime)+' час,мин,сек';
  }

  function innertimeComparison() {
    let tempTime = prompt("Введите два значения  времени в формате: час,мин,сек", " 09:14:00 ,21:33:56 ");
    tempTime ? tempTime = tempTime.split(","): tempTime = [[0,0,0], [0,0,0]];
    if(tempTime[0]<tempTime[1]); tempTime.reverse()
    let UserTime1 = tempTime[0].split(":");
    let UserTime2 = tempTime[1].split(":");
    nuberArea10.innerHTML='Разница во времени между :'+tempTime[0]+' и: '+tempTime[1]+' составляет: '+getUserTime(getUserSeconds(UserTime1,UserTime2));
  }

  function setUserTime1() {
    nuberArea7.innerHTML='Текущее время: '+(new Date).toLocaleTimeString();
    setInterval(setUserTime1, 1000  );
  }
  window.onload = setUserTime1;
