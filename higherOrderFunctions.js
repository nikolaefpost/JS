
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


  function sum() {
    let sum=0;
    for (var i = 0; i < arguments.length; i++) {
      sum += arguments[i];
    }
    return sum;
  }
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

      User.prototype.sumNameCont = count_decorator(User.prototype.sumName)
      u1 = new User('AAA');
      u1.sumNameCont(1,2,3);
