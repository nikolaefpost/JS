
// --------------------------------------------------------------------- 1-e задание --------------------------------------------------------------------------
  class Marker {
    constructor(color) {
      this.color = color;
      this._ink = 100;
      this.text = ''
      this.temp = [''];
    }

    markerWrite1(str){
      for (var i = 0; i < str.length; i++) {

        (this._ink > 0) ?  this.text += str[i]  : this.temp[0] += str[i];
        if (str[i] != ' ') this._ink -=0.5;
      }
      if (this._ink < 0) {this.temp[1] = this._ink; this._ink=0;}
      return this;
    }

    markerWrite2(str){
      this.text = str.split('').reduce((acc, cur) => {
        if (this._ink > 0 )  {
          acc+= cur;
          if (cur!=' ') this._ink -=0.5;
        } return acc;
      },'');
      this.text = '<p style = "margin-left:15px; color:' + this.color + ';">' + this.text + '</p>';
      return this;
    }

    writeStatus(){
      if (this.temp.length > 1) this.text += '<small> Закончились чернила! Чтобы допечатать оставшийся текст необходимо заправить маркер на'+ this.temp[1] +' едениц.</small><br>';
      else this.text += '<small>Количество чернил в маркере '+ this.ink +' едениц.</small><br>';
      return this;
    }


    resumeWrite(){
      this.text = '';
      let str = this.temp[0];
      this.temp[0] = '';
      if(this._ink>0) this.markerWrite1(str);
      return this;
    }

    print(){
      this.text = '<p style = "margin-left:15px; color:' + this.color + ';">' + this.text + '</p>';
      return this;
    }
  }

  class RefuelingMarker extends Marker  {
    get ink() {
      return this._ink;
    }

    set ink(fuel){
      if (Number(fuel)) {
        this._ink = this._ink + Math.abs(fuel);
        this.temp.length = 1;
        if (this._ink>100) this._ink = 100;
      }
      return this;
    }
  }



  //let q = new Marker('red').markerWrite('');refueling marker
  //console.log(q.text);




  window.onload = function () {

    click101.onclick = function () {
      let str = document.getElementById('input101').value;
      let color = document.getElementById('input102').value;
      let q = new RefuelingMarker(color).markerWrite1(str).print().writeStatus();
      out101.innerHTML=q.text;

      q.ink = 20;                                                               // дозаправка чернил
      q.resumeWrite().print().writeStatus();
      out101.innerHTML+=q.text;

      q.ink = 6;                                                               // дозаправка чернил
      q.resumeWrite().print().writeStatus();
      out101.innerHTML+=q.text;
      console.log(q);
    }
  }
