
  window.onload = function() {
    class Element {
      constructor(text) {
        this.element = document.createElement(text)
      }
      setId(value){
        this.element.setAttribute('id', value)
      }
      addClass(cssClass){
        this.element.classList.add(cssClass);
      }
      setContent(text){
        this.element.innerHTML += text;
      }
      addChild(child) {
        this.element.append(child);
      }
      print() {
        // this.str = `<`;
        return this.element;
      }
    }

    class DomBuilder {
      constructor() {

      }
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

    let q1 = new DomBuilder().create('span').withClass('red');
    let q = new DomBuilder().create('p').withClass('main').withId('idName').withChild(q1.result.element).withContent('text');

    console.log(q.result.print());
    out.append(q.result.element)

  }
