
  window.onload = function () {
//------------------------------------------------------------------------------1е задание --------------------------------------------------------------------
    function showNews(targetClass) {
      let open;
      return function () {
        if (event.target.classList.contains(targetClass)) {
          if(open && open != event.target.nextElementSibling) open.hidden = true;
          let target_block = event.target.nextElementSibling;
          if (target_block) target_block.hidden = !target_block.hidden;
          open = target_block;
        }
      }
    }
    document.body.addEventListener('click', showNews('art_title'));
    //------------------------------------------------------------------------------2е задание --------------------------------------------------------------------
    let arrNews = [ '<h2> Lorem ipsum dolor sit amet</h2> Lorem ipsum dolor sit'+
      'amet, consectetur adipiscing elit. Nulla facilisis ipsum eros, non'+
      'malesuada lectus tincidunt a. Pellentesque non magna'+
      'auctor, tincidunt nisl sit amet, ornare diam. Proin accumsan ligula ac'+
      'nunc ultrices, a iaculis orci aliquet. Cras iaculis massa lacus, vitae'+
      'posuere nisi elementum a. Duis placerat porttitor dolor, vel pellentesque'+
      'magna accumsan finibus. Sed consequat tellus id mauris condimentum, sed'+
      'lobortis dolor ornare. Integer semper lectus ut risus sagittis dictum at'+
      'vitae ligula. Pellentesque auctor nunc quis vulputate euismod.',
      '<h2>Integer semper lectus ut risus</h2> Integer semper lectus ut risus,'+
       'consectetur adipiscing elit. Nulla facilisis'+
      'ipsum eros, non malesuada lectus tincidunt a. Pellentesque non magna'+
      'auctor, tincidunt nisl sit amet, ornare diam. Proin accumsan ligula ac'+
      'nunc ultrices, a iaculis orci aliquet. Cras iaculis massa lacus, vitae'+
      'posuere nisi elementum a. Duis placerat porttitor dolor, vel pellentesque'+
      'magna accumsan finibus. Sed consequat tellus id mauris condimentum, sed'+
      'lobortis dolor ornare. Integer semper lectus ut risus sagittis dictum at'+
      'vitae ligula. Pellentesque auctor nunc quis vulputate euismod.',
      '<h2>Duis placerat porttitor dolor</h2> Duis placerat porttitor dolor,'+
      'consectetur adipiscing elit. Nulla facilisis ipsum eros, non malesuad'+
       'lectus tincidunt a. Pellentesque non magna'+
      'auctor, tincidunt nisl sit amet, ornare diam. Proin accumsan ligula ac'+
      'nunc ultrices, a iaculis orci aliquet. Cras iaculis massa lacus, vitae'+
      'posuere nisi elementum a. Duis placerat porttitor dolor, vel pellentesque'+
      'magna accumsan finibus. Sed consequat tellus id mauris condimentum, sed'+
      'lobortis dolor ornare. Integer semper lectus ut risus sagittis dictum at'+
      'vitae ligula. Pellentesque auctor nunc quis vulputate euismod.',
      '<h2>Cras iaculis massa lacus, vitae</h2> Cras iaculis massa lacus,'+
       'vitae consectetur adipiscing elit. Nulla facilisis'+
      'ipsum eros, non malesuada lectus tincidunt a. Pellentesque non magna'+
      'auctor, tincidunt nisl sit amet, ornare diam. Proin accumsan ligula ac'+
      'nunc ultrices, a iaculis orci aliquet. Cras iaculis massa lacus, vitae'+
      'posuere nisi elementum a. Duis placerat porttitor dolor, vel pellentesque'+
      'magna accumsan finibus. Sed consequat tellus id mauris condimentum, sed'+
      'lobortis dolor ornare. Integer semper lectus ut risus sagittis dictum at'+
      'vitae ligula. Pellentesque auctor nunc quis vulputate euismod.',
    ]
    viewer.addEventListener('scroll', generationNews('my_article1', arrNews));


    function generationNews(generationClass, arrNews) {

      let matches = [];
      for (let i = 0; i < arrNews.length; i++) {
        let div = document.createElement('div');
        div.classList.add(generationClass);
        div.innerHTML = arrNews[i];
        matches.push(div);
      }
      scrolling.append(matches[0]);
      matches.shift();
      return function () {
        if (viewer.clientHeight > (scrolling.scrollHeight - viewer.scrollTop + 30)) {
          if(matches.length==0) return;
          scrolling.append(matches[0]);
          matches.shift();
        }
      }
    }

  //------------------------------------------------------------------------------3е задание --------------------------------------------------------------------


   
  }
