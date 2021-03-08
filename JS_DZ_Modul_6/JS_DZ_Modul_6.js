
  window.onload = function () {
  //------------------------------------------------------------------------------1е задание --------------------------------------------------------------------
  let text_default ='Viverra suspendisse potenti nullam ac. Eget mauris pharetra et ultrices. Elementum nibh tellus molestie nunc non blandit massa enim. Dapibus ultrices in iaculis nunc sed augue lacus viverra vitae. Nam aliquam sem et tortor. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. At in tellus integer feugiat. Nisl tincidunt eget nullam non nisi est sit. Tempor orci eu lobortis elementum nibh. Nunc consequat interdum varius sit amet.';
  text_.addEventListener('focus', function() {console.log(text_); document.forms[0].button.hidden = false; document.querySelector('textarea').value = text_default});
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
    console.log(document.forms.buy_form);
    document.forms.buy_form.book.value = book;
    }
  }

  function buyBook() {
    event.preventDefault();
//------------------------------------------------------------------------------ блок проверок
    if (!document.forms.buy_form.book.value) {document.forms.buy_form.book.placeholder = 'выберите книгу, пожайлуста!'; return;}
    let n = document.forms.buy_form.quantity.value;
    if (!/^[0-9]+$/.test(n)) {document.forms.buy_form.quantity.placeholder = 'введите количество книг, пожайлуста!'; return;}
    let name = document.forms.buy_form.name.value;
    if (!/^[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{0,}\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,}(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?$/.test(name)) {name =''; document.forms.buy_form.name.placeholder = 'введите Имя и Фамилию, пожайлуста!'; return;}
    if (!document.forms.buy_form.address.value) {document.forms.buy_form.address.placeholder = 'введите адрес, пожайлуста!'; return;}
    if (!document.forms.buy_form.date_.value) {alert('выберите дату, пожайлуста!'); return;}

    let div = document.createElement('div');
    div.classList.add('rezult_div');
    let text = document.forms.buy_form.name.value + ', thanks for the order,<br><br>book: "'+document.forms.buy_form.book.value+'" in quantity: '+ n +', will be delivered on '+document.forms.buy_form.date_.value+' to '+ document.forms.buy_form.address.value;
    div.innerHTML += text;
    let rezult = document.createElement('h3');
    rezult.innerHTML = 'Rezult:';
    main.append(div);
    div.before(rezult);
    // document.forms.buy_form.submit();                                        // пока некуда отправлять)
    document.querySelector('.by_books').remove();
  }
  //------------------------------------------------------------------------------2е задание --------------------------------------------------------------------
  group_selection.addEventListener('click', createELesson);
  button_is.addEventListener('click', saveLesson);
  let students = [['Иванов И.', 'Петров П.', 'Сидоров С.'], ['Трампов Т.', 'Псаки П', 'Байденович Б']];
  let lessons = new Map();
  let i;
  let form1 = document.forms.is_present;
  function createELesson() {

    i = document.forms.is_present.group.value + '-' + document.forms.is_present.lesson.value;

    // console.log(lessons.has(i));
    // console.log(i);
    if (lessons.has(i)) {
      console.log(i);
      console.log(lessons.has(i));
      document.forms.select_is.hidden = true;
      is_present.after(lessons.get(i));
      return;
    }
    if (document.forms.saved) document.forms.saved.remove();
    let group = students[document.forms.is_present.group.value];

    let td_st = document.getElementsByClassName('st');
    for (var i = 0; i < td_st.length; i++) {
      td_st[i].innerText = group[i];
    }
    document.forms.select_is.hidden = false;
    document.forms.select_is.reset();
    // console.log(td_st);
  }
  function saveLesson() {
    i = document.forms.is_present.group.value + '-' + document.forms.is_present.lesson.value;
    let temp = document.forms.select_is.cloneNode(true);
    console.log(temp.name);
    temp.name = 'saved';
    console.log(temp);
    let topic = temp.topic.value;
    let is = [((temp.check1.checked)?'present':''), ((temp.check2.checked)?'present':''), ((temp.check3.checked)?'present':'')];
    task = {'topic':topic, 'is':is };
    temp.topic.remove();
    let span = document.createElement('span');
    span.innerText = topic;
    temp.children[0].append(span);
    for (var j = 1; j < 4; j++) {
      temp.children[1].rows[j].cells[1].innerHTML = is[j-1];
       }
       console.log(temp);
    lessons.set(i, temp)
    console.log(lessons);
  }
}
