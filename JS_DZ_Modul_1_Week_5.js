
  function expoRecursion(x,n){
    return (n != 0) ? x * expoRecursion(x,n - 1) : 1;
  }

  function z(a,b) {

      console.log(a,b);
        if ((a>b)&&(a==0 || b==0)) z(a%b,b);
        console.log(a,b);
        if ((b>a)&&(a==0 || b==0)) z(a,b%a);
        console.log(a,b);
   return (a+' '+b);


  }









function functionName() {
  alert(z(30,18));
}


  function factorial(n) {
    return (n != 1) ? n * factorial(n - 1) : 1;
  }
