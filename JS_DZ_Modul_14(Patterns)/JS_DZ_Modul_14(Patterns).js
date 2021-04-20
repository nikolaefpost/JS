
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

    let text ='Ferrari is one of the world’s most admired luxury sports car automakers. The company officially launched in 1947. However, the automaker’s legendary founder and namesake Enzo Ferrari was involved in the industry long before then. About Enzo.  Born in Modena, Italy in 1898, Enzo Ferrari started out as a race car driver. In the 1920s, he was made a driver with Alfa Romeo and won several racing awards including the 2nd Circuito di Modena. In 1929, Ferrari founded the Scuderia Ferrari, now the official race car division for Ferrari. It began, however, as a division of Alfa that specialized in preparing race cars to gentlemen drivers. This was at a time when sports car racing was really taking off as an activity for the rich and famous, who were really the only ones who could afford it. In 1931, Enzo finished in second place at the Circuito Tre Province, which would be his last time competing as a driver. He wanted to focus on his family and the birth of his first son Alfredo more commonly called Dino. However, he still continued working with Scuderia and building cars for Alfa until 1939. In September of that year, he left his position as Head of Alfa Corse to form his own car company Auto Avio Costruzioni in his hometown of Modena, Italy. As a condition of his departure, he was required not to use the Ferrari name in association with any of his cars or races for at least four years after. Honoring the agreement, the company name wasn’t changed to Auto Costruzioni Ferrari until 1957, and first car to bare the name Ferrari was released the Ferrari 125 S.';
    let p = new DomBuilder('p').withClass('text').withContent(text);
    let h2 = new DomBuilder('h2').withClass('red').withContent('Ferrari');
    let img = new DomBuilder('img').withAttribute('src', '54501-ferrari_krasnyj_sportkar_vid_szadi.jpg').withStyle('float', 'left').withStyle('margin-right', '30px').withAttribute('width', '250px');
    let div = new DomBuilder('div').withClass('main').withClass('shadow').withId('idName').withAttribute('data-number', 1).withChild(img).withChild(h2).withChild(p).result;
    document.body.append(div.element);
    console.log(div.print());
  }
