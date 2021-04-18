
  window.onload = function() {
    class Element {
      constructor(text) {
        this.element = document.createElement(text);
        this.child=[];
      }
      setId(value){
        this.element.setAttribute('id', value)
      }
      addClass(cssClass){
        this.element.classList.add(cssClass);
      }
      setContent(text){
        this.element.append(document.createTextNode(text));
        // this.element.innerHTML += text;
      }
      setStyle(style_name, value){
        this.element.style[style_name] = value;
      }
      setHasAttribute(name, value){
        this.element.setAttribute(name, value)
      }
      addChild(child) {
        this.element.append(child.result.element);
        this.child.push(child.result)
      }
      print() {
        return this.element.outerHTML;
        // let str = '<'+this.element.localName;
        // if(this.element.id) str+= ' id="'+this.element.id+'" ';
        // if(this.element.classList) str+= ' class="'+this.element.className+'">';
        // for (var i = 0; i < this.element.childNodes.length; i++) {
        //   if(typeof this.element.childNodes[i].data == 'string') str+=this.element.childNodes[i].data;
        // }
        // if (this.child.length>0){
        //   for (var i = 0; i < this.child.length; i++) {
        //     str+=this.child[i].print();
        //   }
        // }
        // str += '</'+this.element.localName+'>';
        // return str;
      }
    }

    class DomBuilder {
      constructor(tagName) {
        this.result = new Element(tagName);
      }
      // create(){
      //   this.result = new Element(tagName);
      //   return this;
      // }
      withClass(className) {
        this.result.addClass(className)
        return this;
      }
      withId(idName){
        this.result.setId(idName)
        return this;
      }
      withStyle(style, value){
        this.result.setStyle(style, value);
        return this;
      }
      withAttribute(name, value){
        this.result.setHasAttribute(name, value);
        return this;
      }
      withChild(childElem){
        this.result.addChild(childElem);
        return this;
      }
      withContent(text){
        this.result.setContent(text);
        return this;
      }
    }
//------------------------------------------------------------ clients code -----------------------------------------------------------------------------
    let q1 = new DomBuilder('span').withClass('red').withContent('1-span');
    let q2 = new DomBuilder('span').withClass('red').withContent('2-span');
    let img = new DomBuilder('img').withAttribute('src', '54501-ferrari_krasnyj_sportkar_vid_szadi.jpg').withStyle('float', 'left');
    let q = new DomBuilder('p').withClass('main').withClass('red1').withId('idName').withStyle('color', 'blue')
    .withAttribute('data-number', 1).withContent('some text').withChild(q1).withChild(q2).withChild(img).result;
    out.append(q.element);
    console.log(q.print());


  }
