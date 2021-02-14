
// --------------------------------------------------------------------- 1-e задание --------------------------------------------------------------------------
  function letterCheck(e){
    if(!(e.charCode>64&&e.charCode<91 || e.charCode>96 && e.charCode<123 ||
    e.charCode>1039 && e.charCode<1104 || e.charCode==1025 || e.charCode==1105 )) {
      event.preventDefault();
    }
  }

// --------------------------------------------------------------------- 3-e задание --------------------------------------------------------------------------

  window.onload = function () {
    let elements = m001.querySelectorAll('button');

    click101.onclick = function () {
      let str = input101.value;
      out101.innerHTML = `Здравствуйте  ${str}!`;
    }
// --------------------------------------------------------------------- 2-e задание --------------------------------------------------------------------------
    click201.onclick = function (e) {
     out201.style.display = 'flex';
     for (let x of elements) x.setAttribute("disabled", "true");
     input101.setAttribute("disabled", "true");
     m001.className = 'main hystmodal__opened';
    }

    click202.onclick = function (e) {
     out201.style.display = 'none';
     for (let x of elements) x.removeAttribute("disabled");
     input101.removeAttribute("disabled");
     m001.className = 'main';
    }




// --------------------------------------------------------------------- Практическое задание robotDecorator ----------------------------------------------------------------
    click0p01.onclick = function () {
      let decRobot = robotDecorator(Autobots, 'explosion.png', move);
      let e = new  decRobot('Оптимус', 'Прайм', 'Модуль «Оптимус»');
      e.move(robotId);
    }

    click1p01.onclick = function () { // --------------- Практическое задание №1-------------------------------------
      out1p01.style.fontSize = '40px';
      out1p01.style.color = 'red';
      out1p01.innerHTML = Math.round(100*Math.random());
    }

    click2p01.onclick = function (e) { // --------------- Практическое задание №2-------------------------------------
      out2p01.innerHTML = clickCoord(e);
    }

    click3p01.onclick = function (e) { // --------------- Практическое задание №3-------------------------------------
      out3p01.style.marginLeft = '30px';
      out3p01.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a felis ullamcorper dui vehicula rhoncus.'+
       'Donec molestie nec libero vel porta. Nulla viverra lacus quis eros hendrerit, ac luctus lacus molestie. Praesent in risus'+
       'eros. Aenean porttitor ut erat quis sollicitudin. Fusce ac scelerisque erat. Mauris eu dolor vel libero gravida commodo ac'+
       'eu dui. Duis luctus varius sollicitudin. Donec dignissim mollis condimentum. Integer sed quam ut mi sagittis ullamcorper'+
       'quis in nisl.';
       out3p01.style.display == '' ?  out3p01.style.display = 'none' : out3p01.style.display = '';
    }


  }

// --------------------------------------------------------------------- Практическое задание --------------------------------------------------------------------------
//                                                                       Декоратор класса

    function Autobots(name, clan, armament) {
        this._name = name;
        this.clan = clan;
        this.armament = armament;
        this.str = '';
    }

      function move(e, distance = 1) {
      this.originalStyle = e.style;
      e.style.position = "relative";
      let self = this;
      (function animate() {
        if (distance <1000) {
          e.style.left = distance + "px";
          distance += distance;
          if (distance >900 && self.src) {e.setAttribute('src', self.src); e.style.left =  "80%"; }
          setTimeout(animate, 50);
        }
        setTimeout(()=>{e.style = self.originalStyle; e.setAttribute('src', 'unnamed.png')}, 2000);
      })();
    }


    function robotDecorator(fnc, src, someMethod) {
      let wrapper = function () {
        this.src = src;
        fnc.prototype.move = someMethod;                                              // Можно ли динамически определять метод?
        fnc.apply(this, arguments);                                             // типа fnc.prototype[move] , но чтоб работал)
      }
      wrapper.prototype = fnc.prototype;
      return wrapper;
    }
// --------------------------------------------------------------------- Практическое задание №2 --------------------------------------------------------------------------

function clickCoord(e) {
  out2p01.innerHTML = ('X= ' +  e.x + 'px' +'<br>'+'Y= ' +e.y + 'px');
  console.log(e.layerY);
  // if (e.y > 1250 && e.y) {
  //
  // }
}

// --------------------------------------------------------------------- Практическое задание №4 --------------------------------------------------------------------------
let tab1 = 'Hypertext Markup Language (HTML) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript. Web browsers receive HTML documents from a web server or from local storage and render the documents into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.'
let tab2 = 'CSS is designed to enable the separation of presentation and content, including layout, colors, and fonts.[3] This separation can improve content accessibility, provide more flexibility and control in the specification of presentation characteristics, enable multiple web pages to share formatting by specifying the relevant CSS in a separate .css file which reduces complexity and repetition in the structural content as well as enabling the .css file to be cached to improve the page. '
let tab3 = 'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser  use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles. Read more about JavaScript.'
  function tabs(e) {
    switch (e.target.id) {
      case 'tab1': outArea.innerHTML =tab1 ;  break;
      case 'tab2': outArea.innerHTML =tab2 ;  break;
      case 'tab3': outArea.innerHTML =tab3; break;
      default: outArea.innerHTML =tab1; break;
    }
  }

// --------------------------------------------------------------------- Практическое задание №5 --------------------------------------------------------------------------

  function deleteNews(e) {
    e.path[2].style.display = 'none';
  }

// --------------------------------------------------------------------- Практическое задание №6 --------------------------------------------------------------------------
function addProgress(e) {
  let q = parseInt(pr.style.width);
  if (q < 100)  pr.style.width = (q+5)+'%';
}

// ---------------------------------------------------------------------Самостоятельное практическое задание  --------------------------------------------------------------------------

  class IterableObject extends Object {
    constructor(object) {
        super();
        Object.assign(this, object);
    }

    *[Symbol.iterator]() {
        const entries = Object.entries(this);
        for (var i = 0; i < entries.length; i++) {
        yield  entries[i]
        }

    }
  }

const iterableObject = new IterableObject({
    1: 'a',
    2: 'b',
    3: 'c'
});

for (let element of iterableObject) {
    console.log(element);
}


function* generateEven() {
  for (let i = 0; true; i+=2) yield i;
}

function* generateOdd() {
  for (let i = 1; true; i+=2) yield i;
}

function* generatePasswordCodes() {

  while(true) {
    let i = 0;
        i++
    console.log(i);
    if (i%2==0) {
      console.log(i);
      yield* generateEven();
    }else {
      console.log(i);
      yield* generateOdd();
    }

  }


}

let t = generatePasswordCodes();
// t.next();
// t.next();
t.next(1);
t.next(1);
console.log(t.next());

let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    return {
      start: this.from,
      end: this.to,
      next() {
        if (this.start <= this.end) {
          return { done: false, value: this.start++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};
console.log([...range]);

  let obj1 = {
    arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [Symbol.iterator](a, b){
      return {
        a: this.arr,
        i:a,
        next(){
          if (this.i <= b) return {done: false, value: this.a[this.i++]};
          else return {done: true};
        }
      }
    }
  }

  let obj2 = {
    arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    *[Symbol.iterator](a, b){
      for (; a < b;   b--) {
        yield this.arr[b];
      }
    }
  }

  const iterator = obj2[Symbol.iterator](2,6);
  let result = iterator.next();
console.log(result);
  while (!result.done) {
      const element = result.value;
      console.log(element);
      result = iterator.next();
  }

  // const iterator = obj[Symbol.iterator](2,6);
  // do {
  //   let result = iterator.next();
  //   if (result.done) break;
  //   console.log(result.value);
  // } while (true);

  function* generate1() {
    yield 1;
		yield 3
    yield 5;
		}

		function* generate2() {
      yield 0;
      yield 2
      yield 4;
		}

		let generator1 = generate1();
		let generator2 = generate2();

		function* generatePasswordCodes(a) {
			for (let i=0; i<a; i++ ){
        console.log(i);
			if(i%2==0) yield* generator2;
			else yield* generator1;
			}
		}
		let sequence1 = [ ...generatePasswordCodes(6)];


		console.log(sequence1);






    function* gen() {
      let rezalt = 0;
      let ask1 = yield "2 + 2 = ?";
      if (ask1 == 4) {console.log('true'); rezalt++}
      else console.log('false');

      let ask2 = yield "3 * 3 = ?"
      if (ask2 == 9) {console.log('true'); rezalt++}
      else console.log('false');

      let ask3 = yield "4 * 4 = ?"
      if (ask3 == 16) {console.log('true'); rezalt++}
      else console.log('false');

      yield rezalt;
    }
    let generator = gen();
    console.log( generator.next().value );
    console.log( generator.next(8).value );
    console.log( generator.next(9).value );
    console.log( generator.next(16).value );
    console.log( generator.next().value );


    function* generate3(modulus, a, c, seed) {
  			  while(true)
          seed = (a * seed + c) % modulus;
  				yield seed;
  		}
