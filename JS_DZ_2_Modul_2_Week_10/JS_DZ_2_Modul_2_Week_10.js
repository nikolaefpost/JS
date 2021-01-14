
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

    showInfo(){
      return  this.str = '<p style="border-radius: 50%; border: 1px solid black; line-height:'+this.diameter+
      'px; overflow: hidden; width: '+this.diameter+'px; height:'+this.diameter +
      'px;">-------------------------------</p> Радиус окружности: R= '+this.radius+'px; <br>'+
      'Диаметр окружности: D= ' + this.diameter + 'px; <br> Площадь окружности: S= ' + this.areaCircle()+
      'px2; <br> Длинна окружности: L= ' + this.circumFerence()+ 'px;';
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
      out101.innerHTML=userCircle.showInfo();
    }

    click102.onclick = function () {
      let a = new HtmlElement('a',false,'More...');     a.settingAttribute('href','https://www.lipsum.com/').settingAttribute('target','_blank');
      let p = new HtmlElement('p',false,'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'+
       'Etiam sodales lectus eget dictum fringilla. Cras euismod sapien ullamcorper tortor euismod'+
       'suscipit. Sed lobortis magna ut posuere faucibus. Etiam risus eros, elementum eu dolor quis,'+
       'pellentesque pharetra tellus. Curabitur tortor risus, fringilla ut faucibus sagittis, efficitur eget dui.'); p.settingStyle('text-align','justify').endtAttach(a);
      let h3 = new HtmlElement('h3',false,'What is Lorem Ipsum?');
      let img = new HtmlElement('img',true);            img.settingStyle('width','100%').settingAttribute('src','lorem-ipsum-fi-2.png').settingAttribute('alt','Lorem ipsum');
      let divS = new HtmlElement('div',false);          divS.settingStyle('width','300px').settingStyle('margin','10px').endtAttach(h3).endtAttach(img).endtAttach(p);
      let divF = new HtmlElement('div',false);          divF.settingAttribute('id','wrapper').settingStyle('display','flex').endtAttach(divS).endtAttach(divS);
      out102.innerHTML=divF.getHtml();
    }

    click101p.onclick = function () {
      let inputStyle = document.getElementById('input101p1').value.split(',')
      let str = document.getElementById('input101p2').value;
      let userText = new PrintMaсhine(inputStyle);

      console.log(userText.print(str));
      outp1.innerHTML=userText.print(str);
    }
  }

  //************************************** Практическое задание *****************************************************

  class PrintMaсhine {
    constructor([font_size, font_colors, font_family]) {
      this.font_size = font_size;
      this.font_colors = font_colors;
      this.font_family = font_family;
      this.str = '';
    }

    print(str){
      return this.str ='<span style=" font-size:' + this.font_size +'; color:' + this.font_colors+'; font-family:' + this.font_family+';">' + str + '</span>';
    }
  }
