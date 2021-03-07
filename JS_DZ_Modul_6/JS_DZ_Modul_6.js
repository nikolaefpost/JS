
  window.onload = function () {
  //------------------------------------------------------------------------------1е задание --------------------------------------------------------------------
  let text_default ='Viverra suspendisse potenti nullam ac. Eget mauris pharetra et ultrices. Elementum nibh tellus molestie nunc non blandit massa enim. Dapibus ultrices in iaculis nunc sed augue lacus viverra vitae. Nam aliquam sem et tortor. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. At in tellus integer feugiat. Nisl tincidunt eget nullam non nisi est sit. Tempor orci eu lobortis elementum nibh. Nunc consequat interdum varius sit amet.';
  document.querySelector('textarea').addEventListener('focus', function() {document.forms[0].button.hidden = false; document.querySelector('textarea').value = text_default});
  button.addEventListener('click', editText);
  function editText() {
    let text_area = document.querySelector('textarea');
    if (text_area.value) {
      let div = document.createElement('div');
      div.innerText = text_area.value;
      div.classList.add('rezult_div');
      if (document.forms[0].font_align.value) div.style.textAlign = document.forms[0].font_align.value;
      if (document.forms[0].bold.checked) div.style.fontWeight = document.forms[0].bold.value;
      if (document.forms[0].underline.checked) div.style.textDecoration = document.forms[0].underline.value;
      if (document.forms[0].italic.checked) div.style.fontStyle = document.forms[0].italic.value;

      document.forms[0].remove()
      area_div.innerHTML += '<h3>Rezult:</h3>';
      area_div.append(div);
    }
  }
  //------------------------------------------------------------------------------2е задание --------------------------------------------------------------------
  document.querySelector('.by_books').addEventListener('click',selectBook);
  button_buy.addEventListener('click',buyBook);
  function selectBook() {
    if (event.target.name=='button') {
    let book = event.target.parentElement.children[1].firstChild.data;
    document.forms[1].book.value = book;
    }
  }

  function buyBook() {
    // event.preventDefault();
    document.forms[1].submit()
    let div = document.createElement('div');
    let text = document.forms[1].name.value + ', thanks for the order,<br><br>book '+document.forms[1].book.value+' will be delivered on '+document.forms[1].date_.value+' to '+ document.forms[1].address.value;
    div.innerHTML = text;
    div.classList.add('rezult_div');
    main.innerHTML += '<h3>Rezult:</h3>';
    main.append(div);
    document.querySelector('.by_books').remove();
  }
  }
