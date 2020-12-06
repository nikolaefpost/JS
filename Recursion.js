
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
//  nuberArea11.innerHTML=grComFactor(30,18)
//  nuberArea11.innerHTML=maxNumber('123456789876554');
//nuberArea11.innerHTML=primeNumber(997);
//nuberArea11.innerHTML=reversNumber1(String(123456).split(''));
//nuberArea11.innerHTML=reversNumber2(1234567);
nuberArea11.innerHTML=sumNumbers(1234)
}

function outputNumbers1(x,y,i=y) {
  return (x<y) ? outputNumbers(x,--y) +', '+ i: i;
}

function outputNumbers2(x,y,i=x) {
  return (x<y) ? outputNumbers2(++x,y) +', '+ i: i;
}

  function reversNumber1(arr, i=0, m) {                               //  решение с помощью массива
    m=arr[i];
    arr[i]=arr[(arr.length-1)-i];
    arr[(arr.length-1)-i]=m;
    //arr[i] = arr[i] ^ arr[(arr.length-1)-i];                        // используя побитовый обмен значений переменных
    //arr[(arr.length-1)-i] = arr[i] ^ arr[(arr.length-1)-i];
    //arr[i] = arr[i] ^ arr[(arr.length-1)-i];
    return  (i<(arr.length/2-1)) ? reversNumber1(arr,++i, m) : arr.join('');
  }

  function reversNumber2(n, result_=0) {            sumNumbers                  // с помощью арефметических вычислений
    result_ +=  + n%10;
    n = Math.floor(n/10);
    return  (n>0) ? reversNumber2(n, result_) : result_;
  }

  function sumNumbers(n, result_=0) {
    result_ +=  n%10;
    n = Math.floor(n/10);
    return  (n>0) ? sumNumbers(n, result_) : result_;
  }
