
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





/*  function getMultipliers(number: int): vector<int>
        // сюда складываем множители
        result = vector<int>
        // число, у которого осталось найти множители
        curNum = number
         // число, на которое пытаемся делить
        probe = 2
        while curNum ≠ 1
            if curNum mod probe ≠0
                // проверены все множители из [2; probe]
                probe++
            else
                // делим пока делится
                curNum /= probe
                result += [probe]
         return result
*/

function functionName() {
//  nuberArea11.innerHTML=expoRecursion(5,3);
//  nuberArea11.innerHTML=grComFactor(30,18)
//  nuberArea11.innerHTML=maxNumber('123456789876554');
//nuberArea11.innerHTML=primeNumber(997);
nuberArea11.innerHTML=numberFactors(74);





//nuberArea11.innerHTML=reversNumber1(String(123456).split(''));
//nuberArea11.innerHTML=reversNumber2(1234567);
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

  function reversNumber2(n, result_=0) {                             // с помощью арифметических вычислений
    result_ +=  + n%10;
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
