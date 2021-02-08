
// --------------------------------------------------------------------- 1-e задание --------------------------------------------------------------------------
  function letterCheck(e){
    if(!(e.charCode>64&&e.charCode<91 || e.charCode>96 && e.charCode<123 ||
    e.charCode>1039 && e.charCode<1104 || e.charCode==1025 || e.charCode==1105 )) {
      event.preventDefault();
    }
  }

  window.onload = function () {

    outArea.innerHTML =tab1;

    click101.onclick = function () {
      let str = input101.value;
      out101.innerHTML = `Здравствуйте  ${str}!`;
    }
// --------------------------------------------------------------------- 2-e задание --------------------------------------------------------------------------
    click201.onclick = function (e) {
     out201.style.display = 'flex';
     m001.className = 'main hystmodal__opened';
     m001.setAttribute('disabled', 'disabled');
    }

    click202.onclick = function (e) {
     out201.style.display = 'none';
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
        fnc.prototype.move = move;                                              // Можно ли динамически определять метод?
        fnc.apply(this, arguments);                                             // типа fnc.prototype[move] , но чтоб работал)
      }
      wrapper.prototype = fnc.prototype;
      return wrapper;
    }
// --------------------------------------------------------------------- Практическое задание №2 --------------------------------------------------------------------------

function clickCoord(e) {
  out2p01.innerHTML = ('X= ' +  e.x + 'px' +'<br>'+'Y= ' +e.y + 'px');
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
