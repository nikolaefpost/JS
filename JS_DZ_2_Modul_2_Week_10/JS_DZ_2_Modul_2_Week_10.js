
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

    endAttach(tagObj){
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

// --------------------------------------------------------------------- 3-e задание --------------------------------------------------------------------------

  class ClassCss1 {                                                             // класс ClassCss1 имитирует CSS класс
    constructor(name_) {                                                        // реализация с помощью Map()
      this.name_ = name_;
      this._style = new Map();
    }

    set_style(key, value){
      this._style.set(key, value);
      return this;
    }

    delete_style(key){
      this._style.delete(key);
      return this;
    }

    getCss1(){
      this.str ='.'+ this.name_ + '{ ';
      for (var [key, value] of this._style) this.str += key + ':' + value+'; ';
      this.str +='}';
      return this.str;
    }

    getCss2(){
      this.str ='.'+ this.name_ + '{ ';
      this._style.forEach((value, key)=> this.str+= key + ':' + value+ '; ');
      this.str +='}';
      return this.str;
    }
  }

  class ClassCss2 {                                                             // класс ClassCss2 имитирует CSS класс
    constructor(name_) {                                                        // реализация с помощью Set()
      this.name_ = name_;
      this._style = new Set();
    }

    set_style(key, value){
      this._style.add(key + ':' + value+'; ');
      return this;
    }

    delete_style(key){
        this._style.forEach((style)=> {if (style.indexOf(key)!=-1) this._style.delete(style)});
      return this;
    }

    getCss(){
      this.str ='.'+ this.name_ + '{ ';
      this._style.forEach((style)=> this.str+= style);
      this.str +='}';
      return this.str;
    }
  }


  class ClassCss3 {                                                             // класс ClassCss3 имитирует CSS класс
    constructor(name_) {                                                        // реализация с помощью массива
      this.name_ = name_;
      this._style = [];
    }

    set_style(key, value){
      this._style.push(key + ':' + value+'; ');
      return this;
    }

    delete_style(key){
      if (!key)  this._style.pop();
      else this._style = this._style.filter((style)=> {return style.indexOf(key)==-1});
      return this;
    }

    getCss1(){
      this.str ='.'+ this.name_ + '{ ' + this._style.reduce((acc, cur) => {return acc+=cur}) + '}';
      return this.str;
    }
  }

// --------------------------------------------------------------------- 4-e задание --------------------------------------------------------------------------

  class HtmlBlock {                                                             // class HtmlBlock принимает в конструктор два параметра:
    constructor(arrObj, objRootHtml) {
      this.classCss = arrObj;                                                   // arrObj массив обектов класса ClassCss1;
      this.objRootHtml = objRootHtml ;                                          // objRootHtml корневой элемент Html, как экзмпляр класса HtmlElement
      this.str =null;
    }

    getCode1(){
      if ((this.objRootHtml instanceof HtmlElement )&&(this.classCss.every(css => (css instanceof  ClassCss1))))           //  проверка обьектов на соответствие классам
      return  this.str = '<style>' + this.classCss.reduce((acc, cur) => {return acc+=cur.getCss2()},'') + '</style>' + this.objRootHtml.getHtml();
      else return 'data entry is not correct, classes do not match the declared';
    }

    getCode2(){
      if ((this.objRootHtml instanceof HtmlElement )&&(!this.classCss.find(css => !(css instanceof  ClassCss1))))           //  проверка обьектов на соответствие классам
      return  this.str = '<style>' + this.classCss.reduce((acc, cur) => {return acc+=cur.getCss2()},'') + '</style>' + this.objRootHtml.getHtml();
      else return 'data entry is not correct, classes do not match the declared';
    }
  }




  window.onload = function () {

    click101.onclick = function () {
      let userCircle = new Circle();
      let inputvalue = document.getElementById('input101').value;
      userCircle.radius = inputvalue;
      let str =  '<p style="border-radius: 50%; border: 1px solid black; line-height:'+userCircle.diameter+
      'px; overflow: hidden; width: '+userCircle.diameter+'px; height:'+userCircle.diameter +
      'px;">-------------------------------</p> Радиус окружности: R= '+userCircle.radius+'px; <br>'+
      'Диаметр окружности: D= ' + userCircle.diameter + 'px; <br> Площадь окружности: S= ' + userCircle.areaCircle()+
      'px2; <br> Длинна окружности: L= ' + userCircle.circumFerence()+ 'px;';
      out101.innerHTML=str;
    }

    click102.onclick = function () {
      let a = new HtmlElement('a',false,'More...').settingAttribute('href','https://www.lipsum.com/').settingAttribute('target','_blank');
      let p = new HtmlElement('p',false,'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'+
       'Etiam sodales lectus eget dictum fringilla. Cras euismod sapien ullamcorper tortor euismod'+
       'suscipit. Sed lobortis magna ut posuere faucibus. Etiam risus eros, elementum eu dolor quis,'+
       'pellentesque pharetra tellus. Curabitur tortor risus, fringilla ut faucibus sagittis, efficitur eget dui.').settingStyle('text-align','justify').endAttach(a);
      let h3 = new HtmlElement('h3',false,'What is Lorem Ipsum?');
      let img = new HtmlElement('img',true).settingStyle('width','100%').settingAttribute('src','lorem-ipsum-fi-2.png').settingAttribute('alt','Lorem ipsum');
      let divS = new HtmlElement('div',false).settingStyle('width','300px').settingStyle('margin','10px').endAttach(h3).endAttach(img).endAttach(p);
      let divF = new HtmlElement('div',false).settingAttribute('id','wrapper').settingStyle('display','flex').endAttach(divS).endAttach(divS);
      out102.innerHTML=divF.getHtml();
    }

    click104.onclick = function () {
      let wrap = new ClassCss1('wrap').set_style('display', 'flex');
      let block = new ClassCss1('block').set_style('width', '300px').set_style('margin', '10px');
      let imgCss = new ClassCss1('img').set_style('width', '100%');
      let text = new ClassCss1('text').set_style('text-align','justify');

      let a = new HtmlElement('a',false,'More...').settingAttribute('href','https://www.lipsum.com/').settingAttribute('target','_blank');
      let p = new HtmlElement('p',false,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. suscipit.'+
       'Etiam sodales lectus eget dictum fringilla. Cras euismod sapien ullamcorper tortor euismod  Sed lobortis'+
       ' magna ut posuere faucibus. Etiam risus eros, elementum eu dolor quis, pellentesque pharetra tellus.'+
       ' Curabitur tortor risus, fringilla ut faucibus sagittis, efficitur eget dui.').settingAttribute('class', 'text').endAttach(a);
      let h3 = new HtmlElement('h3',false,'What is Lorem Ipsum?');
      let img = new HtmlElement('img',true).settingAttribute('class', 'img').settingAttribute('src','lorem-ipsum-fi-2.png').settingAttribute('alt','Lorem ipsum');
      let divS = new HtmlElement('div',false).settingAttribute('class', 'block').endAttach(h3).endAttach(img).endAttach(p);
      let divF = new HtmlElement('div',false).settingAttribute('id','wrapper').settingAttribute('class', 'wrap').endAttach(divS).endAttach(divS);

      out104.innerHTML = new HtmlBlock([wrap, block, imgCss, text], divF).getCode1();
    }

    click101p.onclick = function () {
      let inputStyle = document.getElementById('input101p1').value.split(',')
      let str = document.getElementById('input101p2').value;
      let userText = new PrintMaсhine(inputStyle);
      outp1.innerHTML=userText.print(str);
    }

    click102p.onclick = function () {
      let art1 = new NewsArticle('Уважаемые студенты!', '1,01,2021', 'С 11.01 все занятия в Академия проводятся онлайн. В таком же режиме, как мы работали ранее в период карантина.  У кого возникают трудности с подключениям в Microsoft Teams - сообщите преподавателю или в учебную часть.', ['mystat','itstep']);
      let art2 = new NewsArticle('eee', '4,01,2021', 'ffffffffff С 11.01 все занятия в ', ['mystat','itstep']);
      let art3 = new NewsArticle('sss', '3,01,2021', 'sssssssssss С 11.01 все занятия в ', ['ddd','itstep']);
      let myFeed = new NewsFeed();
      myFeed.addNews(art1).addNews(art2).addNews(art3);
      //myFeed.deleteNews('eee');

      //outp2.innerHTML=myFeed.news[1].print();
      outp2.innerHTML=myFeed.sortNews().searchNews1('mystat').showNews();
    }
  }

  //************************************** Практическое задание №4 *****************************************************
// --------------------------------------------------------------------- 1-e задание --------------------------------------------------------------------------
  class PrintMaсhine {
    constructor([font_size, font_colors, font_family]) {
      this.font_size = font_size;
      this.font_colors = font_colors;
      this.font_family = font_family;
    }

    print(str){
      return this.str ='<span style=" font-size:' + this.font_size +'; color:' + this.font_colors+'; font-family:' + this.font_family+';">' + str + '</span>';
    }
  }
// --------------------------------------------------------------------- 2-e задание --------------------------------------------------------------------------
  class NewsArticle {
    constructor(heading, publication_date, text, arrTag) {
      this.heading = heading;
      this.text = text;
      this.publication_date =new Date (publication_date.split(',').reverse().join(','));
      this.tag = arrTag;
    }

    get date_(){
      let now_date = (new Date()-this.publication_date)/86400000;
      if (now_date<1) return this.publication_date='сегодня';
      if (now_date<7) return this.publication_date=Math.floor(now_date)+' дней назад';
      else return this.publication_date.toLocaleDateString();
    }

    get tag_(){
      let tag_str=''
      for (var i = 0; i < this.tag.length; i++) {
        tag_str+='#'+this.tag[i]+' ';
      }
      return tag_str;
    }

     print(){
       return this.str = '<div style="padding:20px;"><h3>'+this.heading+'</h3><small>'+this.date_+'</small><br><p>'+this.text+'<br><br><span>' + this.tag_ + '</span></p></div>';
     }
  }
// --------------------------------------------------------------------- 3-e задание --------------------------------------------------------------------------
  class NewsFeed {
    constructor() {
      this.news=[];
    }

    get feed_length(){
      return this.news.length;
    }

    showNews(){
    return  this.rezalt = this.news.reduce((acc, cur) => {return acc+=cur.print()},'');
    }

    addNews(articl){
      this.news.push(articl);
      return this;
    }

    deleteNews1(heading){
      if (!heading)  this.news.pop();
      else this.news = this.news.filter(function(art) {return art.heading!=heading});
      return this;
    }

    deleteNews2(heading){
      if (!heading) {
        this.news.pop();
      }else {
        let n = this.news.length;
        for (var i = 0; i < n; i++) {
          if(this.news[i].heading==heading){
             delete this.news[i];
             for (var j = i; j < n; j++) {
               this.news[j] = this.news[j+1]
             }
             this.news.length = this.news.length-1
             return this;
           }
        }
      }
    }

    searchNews1(tag){

      this.news = this.news.filter(function(art) { return art.tag.some(() =>{ return  (art.tag.indexOf(tag))!=-1 }) });
      return this;
    }

    searchNews2(tag){
      this.news = this.news.filter(function(art) { return art.tag.reduce(() =>{ return  art.tag.indexOf(tag) }) !=-1; });
      return this;
    }



    searchNews3(tag){
      for (var i = 0; i < this.news.length; i++) {
        for (var j = 0; j < this.news[i].tag.length; j++) {
            if(this.news[i].tag[j]==tag) return this.news[i].print();
        }
      }
    }

    sortNews(){
      this.news.sort((a, b) =>  {return b.publication_date - a.publication_date});
      return this;
    }
  }

  //************************************** Практическое задание №5 *****************************************************
// --------------------------------------------------------------------- 1-e задание --------------------------------------------------------------------------

  class Button {
    constructor(width, height, text) {
      this.width = width;
      this.height = height;
      this.text = text;
    }

    showBtn(){
      this.str = '<button style=" width:'+this.width+'; height:'+this.height+';">'+this.text+ '</button>';
      document.write(this.str);
    }
  }

  class BootstrapButton extends Button {
    constructor(width, height, text, color) {
      super(width, height, text);
      this.background = color;
    }
    showBtn(){
      this.str = '<button style=" width:'+this.width+'; height:'+this.height+'; background:'+this.background+';">'+this.text+ '</button>';
      document.write(this.str);
    }
  }

//let btn = new BootstrapButton('200px', '50px', 'www', '#b8d5e3');
//btn.showBtn();

// --------------------------------------------------------------------- 2-e задание --------------------------------------------------------------------------

  class GeometricFigure {                                                       // без проверок, только логика
    constructor(name_, a, b) {
      this.name_ = name_;
      this.a = a;
      this.b = b;
    }

    get figure(){
      return this.name_;
    }

    showField(){
      return  this.str = `Фигура-${this.figure},  стороны a:${this.a}см и b:${this.b}см.`
    }

    square(){
      return  this.square = this.a*this.b;
    }

    perimeter(){
      return  this.perimeter = (this.a+this.b)*2;
    }
  }

  class Rectangle extends  GeometricFigure {
    showField(){
      super.showField();
      return  this.str += ` Площадь S=${this.square()}см2, периметр L=${this.perimeter()}см.<br>`
    }
  }

  class SquareLike extends  GeometricFigure {
    square(){
      return  this.square = this.a**2;
    }

    showField(){
      super.showField();
      return  this.str += ` Площадь S=${this.square()}см2, периметр L=${this.perimeter()}см.<br>`
    }
  }

  class Triangle extends  GeometricFigure {
    constructor(name_, a, b, angle) {
      super(name_, a, b);
      this.angle = angle;
    }
    square(){
      return  this.square = this.a*this.b/2*Math.sin(this.angle*Math.PI/180);
    }

    perimeter(){
      this.c= Math.sqrt(this.a**2+this.b**2-2*this.a*this.b*Math.cos(this.angle*Math.PI/180));
      return  this.perimeter = this.a+this.b + this.c;
    }

    showField(){
      super.showField();
      return  this.str += ` Площадь S=${this.square()}см2, периметр L=${this.perimeter()}см.<br>`
    }
  }

  // let fig1 = new Rectangle('прямоуголник', 20, 40);
  // let fig2 = new SquareLike('квадрат', 20, 20);
  // let fig3 = new Triangle('треуголник', 20, 50, 30);
  // let arrFig = [fig1, fig2, fig3]
  // arrFig.reduce((acc, cur) => {return acc+=document.write(cur.showField())},'') ;
// --------------------------------------------------------------------- 3-e задание --------------------------------------------------------------------------

  class ExtentedArray extends  Array {

    getString(separator){
      return this.str =  this.join(separator);
    }

    getHtml(tagName){
      this.str =  this.reduce((acc, cur) => {return acc+= '<' + tagName+'>' + cur +'</' + tagName+'>'},'');
      if (tagName=='li'||tagName=='Li')  this.str ='<ul>'+this.str+'</ul>';
      return this.str;
    }
  }

  // let q = new ExtentedArray('aaa', 'bbb', 'ccc', 'ddd').getHtml('p');
  // document.write(q);
  // console.log(q);
