
// --------------------------------------------------------------------- 1-e задание --------------------------------------------------------------------------
  class Circle {
    constructor() {
      this._radius=0;
    }

    get radius() {
      return this._radius;
    }

    get diameter() {
      return this._radius*2;
    }

    set radius(value) {
      (!Number(value)) ? alert('Введите число!') : this._radius = Math.abs(value);
      return this;
    }

    areaCircle(){
      return Math.PI*this._radius*this._radius;
    }

    circumFerence(){
      return Math.PI*this._radius*2;
    }
  }
// --------------------------------------------------------------------- 2-e задание --------------------------------------------------------------------------
  class HtmlElement {
    constructor(name_, self_сlosing, text) {
      this.name_=name_;
      this.self_сlosing=self_сlosing;
      this.text = text ? text : '';
      this.style = ['style="','"'];
      this.attribute = [];
      this.attachment = [];
    }

    settingAttribute(attribute,value){
      this.attribute.push(attribute+'="'+value+'"');
      return this;
    }

    settingStyle(attribute,value){
      this.style[this.style.length] = this.style[this.style.length-1];
      this.style[this.style.length-2] = attribute+': '+value+';';
      return this;
    }

    startAttach(tagObj){
      if (this.attachment.length>0){
        let n = this.attachment.length;
        for (var i = 0; i < n; i++) {
          this.attachment[i+1]=this.attachment[i];
        }
      }
      this.attachment[0] = tagObj;
      return this;
    }

    endtAttach(tagObj){
      this.attachment.push(tagObj);
      return this;
    }

    getHtml(){
      let str = '<'+this.name_ +' '
      if(this.attribute.length>0) str+= this.attribute.join(' ')+' ';
      if(this.style.length>2) str+= this.style.join(' ');
      str+='>'+this.text;
      if (this.attachment.length>0){
        for (var i = 0; i < this.attachment.length; i++) {
        str+=this.attachment[i].getHtml();
      }
    }

      if(!this.self_сlosing) str+='</'+this.name_+'>'
      return str;
    }
  }


  window.onload = function () {


    click101.onclick = function () {
      let userCircle = new Circle();
      let inputvalue = document.getElementById('input101').value;
      userCircle.radius = inputvalue;

      let a ='<p style="border-radius: 50%; border: 1px solid black; line-height:'+userCircle.diameter+
      'px; overflow: hidden; width: '+userCircle.diameter+'px; height:'+userCircle.diameter +
      'px;">-------------------------------</p> Радиус окружности: R= '+userCircle.radius+'px; <br>'+
      'Диаметр окружности: D= ' + userCircle.diameter + 'px; <br> Площадь окружности: S= ' + userCircle.areaCircle()+
       'px2; <br> Длинна окружности: L= ' + userCircle.circumFerence()+ 'px;';
      out101.innerHTML=a;
    }

    click102.onclick = function () {
      let a = new HtmlElement('a',false,'More...');
      a.settingAttribute('href','https://www.lipsum.com/').settingAttribute('target','_blank');
      let p = new HtmlElement('p',false,'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'+
       'Etiam sodales lectus eget dictum fringilla. Cras euismod sapien ullamcorper tortor euismod'+
       'suscipit. Sed lobortis magna ut posuere faucibus. Etiam risus eros, elementum eu dolor quis,'+
       'pellentesque pharetra tellus. Curabitur tortor risus, fringilla ut faucibus sagittis, efficitur eget dui.');
       p.settingStyle('text-align','justify').endtAttach(a);
      let h3 = new HtmlElement('h3',false,'What is Lorem Ipsum?');
      let img = new HtmlElement('img',true);
      img.settingStyle('width','100%').settingAttribute('src','lorem-ipsum-fi-2.png').settingAttribute('alt','Lorem ipsum');
      let divS = new HtmlElement('div',false);
      divS.settingStyle('width','300px').settingStyle('margin','10px').endtAttach(h3).endtAttach(img).endtAttach(p);
      let divF = new HtmlElement('div',false);
      divF.settingAttribute('id','wrapper').settingStyle('display','flex').endtAttach(divS).endtAttach(divS);
      console.log(divS.getHtml());
      out102.innerHTML=divF.getHtml();
    }
  }




//let div = new HtmlElement('div',false);
//let hr = new HtmlElement('hr',true);
//let br = new HtmlElement('br',true);
//div.settingStyle('id','vsdvdsds').settingStyle('id','vsdvdsds').endAttach(hr).startAttach(br);

//console.log(div.attachment);
//q.radius=12;
//console.log(q.circumFerence());
