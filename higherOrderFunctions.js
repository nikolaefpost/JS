
// --------------------------------------------------------- декоратор добавляет счетчик ----------------------------------------------------------------
  function count_decorator(fnc) {
    let count = 0;
    function wrapper() {
      count++;
      fnc.apply(this, arguments);;
    }
    wrapper.count = function () {
      return count;
    }
    return wrapper;
  }

  function hello() { console.log('hello'); }

  // let decorHello = count_decorator(hello);
  // decorHello(); decorHello(); decorHello();
  // console.log(decorHello.count());

// --------------------------------------------------------- декоратор кеширует функцию ----------------------------------------------------------------
//                                                                1й вариант

  function cache_decorator(fnc) {
    let cache = new Map();
    function wrapper() {
      let h = hash(...arguments);
      if (cache.has(h))  return cache.get(h);
      else {
        let answ = fnc(...arguments);
        cache.set(h, answ );
        return answ;
      }
    }
    function hash() { return [...arguments].join('.') }
    return wrapper;
  }


  // function sum() {
  //   let sum=0;
  //   for (var i = 0; i < arguments.length; i++) {
  //     sum += arguments[i];
  //   }
  //   return sum;
  // }
  // let decorHello = cache_decorator(sum);
  // decorHello(1); decorHello(2, 3); decorHello(3,4); decorHello(1); decorHello(3,4);
  // console.log(decorHello(3,4));
//                                                                2й вариант

      function memoize1(fnc) {
        let cache = {};
        return function () {
          let key = arguments.length + Array.prototype.join.call(arguments, '.');
          if (key in cache) return cache[key];
          else return cache[key] = fnc.apply(this, arguments);
        };
      }

      function memoize2(fnc) {
        let cache = new Map();
        return function () {
          let key = arguments.length + [...arguments].join('.');
          if (!cache.has(key))  cache.set(key, fnc.apply(this, arguments) );
          return cache.get(key);
        }
      }

      // let decorHello = memoize2(sum);
      // decorHello(1); decorHello(2, 3); decorHello(3,4); decorHello(1); decorHello(3,4);
      // console.log(decorHello(3,4));


      class User {
        constructor(name) {
          this._name = name;
        }
        sumName() {
          let sum=0;
          for (var i = 0; i < arguments.length; i++) {
            sum += arguments[i];
          }
          console.log(this._name+' '+sum);
        }
      }

      // User.prototype.sumNameCont = count_decorator(User.prototype.sumName)
      // u1 = new User('AAA');
      // u1.sumNameCont(1,2,3);


// --------------------------------------------------------- декоратор региструрует время выполнения оригинального метода  ----------------------------------------------------------------

  function trace(fnc) {
    return function () {
      let time_start = new Date().getTime();
      let rezult = fnc.apply(this, arguments);
      let time_end = new Date().getTime();
      console.log('время выполнения метода -' + (time_end - time_start) + ' мсек', fnc.name);
      return rezult;
    }
  }

  // User.prototype.sumNameCont = trace( User.prototype.sumName)
  // u1 = new User('AAA');
  // u1.sumNameCont(1,2,3);

// --------------------------------------------------------- иммитация метода BIND  ---------------------------------------------

  function bind(f,o) {
    if (f.bind) return f.bind(o);
    else return function () {
      return f.apply(o, arguments);
    }
  }

  // function getName() {console.log(this._name);}
  // bind(getName, u1)();

// --------------------------------------------------------- функция высшего порядка ЛОГИЧЕСКОЕ ОТРИЦАНИЕ  ---------------------------------------------

  function not(fnc) {
    return function () {
      let rezult = fnc.apply(this, arguments);
      return !rezult;
    };
  }

// ---------------------------------------------------------------- функция высшего порядка mapper  ------------------------------------------------------

  function mapper(fnc) {
    return function (a) { return a.map(fnc); }                                 // принимает массив и применяет fnc ко всем элементам
  }

// --------------------------------------------------------- функция высшего порядка f(g( ... ))  ---------------------------------------------

  function compose(f,g) {                                                       // f и g вызываются с тем же this как и возвращаемая функция
    return function () {                                                        // для вызова f используется call т.к. передается одно значение
      return f.call(this, g.apply(this, arguments));                            // g - apply - передается массив значений
    }
  }




// --------------------------------------------------------- частичное применение аргументов  ---------------------------------------------

  function array(a, n) { return Array.prototype.slice.call(a, n || 0); }        // вспомогателная функция преобразует arguments в настоящий массив

  function partialLeft(fnc /*, ...*/) {                                         // привязывает аргументы вызываемой функции начиная слева
    let args = arguments;
    return function () {
      let a = array(args, 1);
      a = a.concat(array(arguments));
      console.log(a);
      return fnc.apply(this, a);
    }
  }

  function partialRight(fnc /*, ...*/) {                                         // привязывает аргументы вызываемой функции начиная справа
    let args = arguments;
    return function () {
      let a = array(arguments);
      console.log(a);
      a = a.concat(array(args, 1));
      console.log(a);
      return fnc.apply(this, a);
    }
  }

  function partial(fnc /*, ...*/) {                                             // неопределенные значения значения в списке аргументов заполняются значениями
    let args = arguments;                                                       // из внутреннего списка аргументов
    return function () {
      let a = array(args, 1);
      let i=j=0;
      for (; i < a.length; i++) { if  (a[i] === undefined) a[i] = arguments[j++]; }
      a = a.concat(array(arguments, j));
      return fnc.apply(this, a);
    }
  }
  let fnc = function (x, y, z) { return x *(y-z);}
  // console.log(partial(fnc,undefined, 2)(3, 4));

// ------------------------------------------------ практическое применение функций вычшего порядка  ---------------------------------------------

  let data = [1,1,3,5,5];
  let sum = function (x,y) { return x+y; };
  let product = function (x,y) { return x*y; };
  let neg = partial(product, -1);
  let square = partial(Math.pow, undefined, 2);
  let sqrt = partial(Math.pow, undefined, .5);
  let reciprocal = partial(Math.pow, undefined, -1);                            // вычисляем среднее и стандартное отклонение

  let mean = product(data.reduce(sum), reciprocal(data.length));
  let stdev = sqrt(product(data.map(compose(square, partial(sum, neg(mean)) ) ).reduce(sum), reciprocal(sum(data.length, -1))));
  console.log(mean, stdev);

  console.log(mapper(square)(data));


// --------------------------------------------------------- использывание callee ----------------------------------------------------------------

  function check(arg) {
    let actual = arg.length;                                                    //  ожидается кол-во аргументов
    let expected = arg.callee.length;                                           //  фактическое кол-во аргументов
    if (actual !== expected) throw new Error('ожидается: ' + expected + '; получено ' + actual);
  }
