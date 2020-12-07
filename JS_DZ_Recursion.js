
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

  function numberFactors(n,result='',i=2) {            // функция вывода всех множителей
    if (n%i==0) {result+=i; n=n/i;}
    return  (n!=1) ? numberFactors(n,result,++i) : result;
  }

  function  outputFibonacci(n) {                      // функция
    return (n>2) ? outputFibonacci(n-1) +  outputFibonacci(n-2) : 1;
  }




function functionName() {
  var val = document.getElementById('input_').value.split(' ');
  console.log(val);

//nuberArea11.innerHTML=expoRecursion(val[0],val[1] );
//  nuberArea11.innerHTML=grComFactor(30,18)
//  nuberArea11.innerHTML=maxNumber('123456789876554');
//nuberArea11.innerHTML=primeNumber(997);
//nuberArea11.innerHTML=numberFactors(74);
//nuberArea11.innerHTML=outputFibonacci(7);

//nuberArea11.innerHTML=reversNumber1(val);
nuberArea11.innerHTML=reversNumber2(val[0]);
//nuberArea11.innerHTML=sumNumbers(1234);
//nuberArea11.innerHTML=outputParenthesis1(10);
}

//  ПРАКТИЧЕСКАЯ РАБОТА

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

  function reversNumber2(n, result_=0) {
    console.log(n);                          // с помощью арифметических вычислений
    result_ =result_*10  + n%10;
    n = Math.floor(n/10);
    return  (n>0) ? reversNumber2(n, result_) : result_;
  }

  function sumNumbers(n, result_=0) {                                // cуммирование чисел
    result_ +=  n%10;
    n = Math.floor(n/10);
    return  (n>0) ? sumNumbers(n, result_) : result_;
  }

  function  outputParenthesis1(n,str='') {
    str= '('+str+')'
    return  (n>0) ? outputParenthesis1(--n,str) : str;
  }

  function  outputParenthesis2(n,arr=[]) {
    arr.unshift('(');      arr.push(')');
    return  (n>0) ? outputParenthesis2(--n,arr) : arr.join('');
  }
