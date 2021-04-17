
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
        let textNode = document.createTextNode(text);
        this.element.append(textNode);
        // this.element.innerHTML += text;
      }
      addChild(child) {
        this.element.append(child.result.element);
        this.child.push(child.result)
      }
      print() {
        // return this.element.outerHTML;
        let str = '<'+this.element.localName;
        if(this.element.id) str+= ' id="'+this.element.id+'" ';
        if(this.element.classList) str+= ' class="'+this.element.className+'">';
        for (var i = 0; i < this.element.childNodes.length; i++) {
          if(typeof this.element.childNodes[i].data == 'string') str+=this.element.childNodes[i].data;
        }
        if (this.child.length>0){
          for (var i = 0; i < this.child.length; i++) {
            str+=this.child[i].print();
          }
        }
        str += '</'+this.element.localName+'>';
        return str;
      }
    }

    class DomBuilder {
      constructor() {}
      create(tagName){
        this.result = new Element(tagName);
        return this;
      }
      withClass(className) {
        this.result.addClass(className)
        return this;
      }
      withId(idName){
        this.result.setId(idName)
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

    let q1 = new DomBuilder().create('span').withClass('red').withContent('1-span');
    let q2 = new DomBuilder().create('span').withClass('red').withContent('2-span');
    let q = new DomBuilder().create('p').withClass('main').withClass('red1').withId('idName').withContent('some text').withChild(q1).withChild(q2);

    console.log(q.result.print());
    out.append(q.result.element)

  }
