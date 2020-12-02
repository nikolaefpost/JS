
  function expoRecursion(x,n){
    return (n != 0) ? x * expoRecursion(x,n - 1) : 1;
  }

  function grComFactor(a,b) {
    (Math.abs(a)>Math.abs(b)) ? a=a%b : b=b%a;
    return (a>0 && b>0) ? grComFactor(a,b) : a+b;
  }

  function maxNumber1(str,i,max) { // i,max - не обязательные параметры
    i ? i : i=1;
    max ? max : max=str[0];
    if  (max < str[i]) max=str[i];
    return (i < str.length) ? maxNumber1(str,++i,max) : max;
  }









function functionName() {
  nuberArea11.innerHTML=maxNumber1('123456784321');
}


  function factorial(n) {
    return (n != 1) ? n * factorial(n - 1) : 1;
  }
