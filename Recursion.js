
  function expoRecursion(x,n){                           // функция возведения в степень
    return (n != 0) ? x * expoRecursion(x,n - 1) : 1;
  }

  function grComFactor(a,b) {                           // функция нахождения НОД
    (Math.abs(a)>Math.abs(b)) ? a=a%b : b=b%a;
    return (a>0 && b>0) ? grComFactor(a,b) : a+b;
  }

  function maxNumber(str,i=1,max=str[0]) {             // функция нахождения наибольшего числа в строке
    if  (max < str[i]) max=str[i];
    return (i < str.length) ? maxNumber(str,++i,max) : max;
  }

  function  primeNumber(x,i=2) {                      // функция определения простого числа
    if (Math.abs(x)==i) return true;
    return ((Math.abs(x) % i) != 0) ? primeNumber(x,++i) : false;
  }

function functionName() {
//  nuberArea11.innerHTML=expoRecursion(5,3);
  nuberArea11.innerHTML=grComFactor(30,18)
//  nuberArea11.innerHTML=maxNumber('123456789876554');
//  nuberArea11.innerHTML=primeNumber(997);


}
