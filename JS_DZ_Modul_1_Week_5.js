
  function expoRecursion(x,n){
    return (n != 0) ? x * expoRecursion(x,n - 1) : 1;
  }

  function grComFactor(a,b) {
    if (a<0)
    (a>b) ? a=a%b : b=b%a;
    return (a>0 && b>0) ? grComFactor(a,b) : a+b;
  }

function maxNumber(str) {
  let max , i;
  i ? i=1 : i;
  max ? max=str[0] : max;
console.log(i,max);

    if (str[i]>max) max=str[i];
    i++;
    console.log(i,max);
    //i++;
    return (i<str.length) ? maxNumber(str) : max;

}








function functionName() {
  nuberArea11.innerHTML=maxNumber('123456');
}


  function factorial(n) {
    return (n != 1) ? n * factorial(n - 1) : 1;
  }
