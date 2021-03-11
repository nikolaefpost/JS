
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
    if (!document.forms.buy_form.book.value) {toolTip('.in_book') ; return;}
    let n = document.forms.buy_form.quantity.value;
    if (!/^[0-9]+$/.test(n)) {toolTip('.in_quantity'); return;}
    let name = document.forms.buy_form.name.value;
    if (!/^[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{0,}\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,}(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?$/.test(name)) {toolTip('.in_name'); return;}
    if (!document.forms.buy_form.address.value) {toolTip('.in_address'); return;}
    if (!document.forms.buy_form.date_.value) {toolTip('.in_date'); return;}

    let div = document.createElement('div');
    div.classList.add('rezult_div');
    let text = document.forms.buy_form.name.value + ', thanks for the order,<br><br>book: "'+document.forms.buy_form.book.value+'" in quantity: '+ n +', will be delivered on '+document.forms.buy_form.date_.value+' to '+ document.forms.buy_form.address.value;
    div.innerHTML += text;
    let rezult = document.createElement('h3');
    rezult.innerHTML = 'Rezult:';
    document.querySelector('.by_books').after(div);
    div.before(rezult);
    // document.forms.buy_form.submit();                                        // пока некуда отправлять)
    document.querySelector('.by_books').remove();
  }

   function toolTip(class_) {                                                   // ОТОБРАЖЕНИЕ РЕЗУЛЬТАТОВ ПРОВЕРКИ
    let hint;
    let target = document.querySelector(class_);
    let form = document.querySelector('.buy_form');
    let hintText = target.dataset.tooltip;
    if (!hintText) return;

    hint = document.createElement('div');
    hint.className = 'tooltip';
    hint.innerHTML = hintText;
    form.append(hint);

    let coords = target.getBoundingClientRect();
    let left = coords.left + (target.offsetWidth - hint.offsetWidth) / 2;

    let top = coords.top - hint.offsetHeight - 5;
    if (top < 0) {top = coords.top + target.offsetHeight + 5;}

    hint.style.left = left + 'px';
    hint.style.top = top + 'px';
    console.log(target.className);
    if (target.className == 'in_book'){
      form.onmouseout = function () {
        if (hint) {
          hint.remove();
          hint = null;
        }
      }
    }
    target.onmouseover = function () {
      if (hint) {
        hint.remove();
        hint = null;
      }
    }
  }
  //------------------------------------------------------------------------------3е задание --------------------------------------------------------------------
  let students = [['Иванов И.', 'Петров П.', 'Сидоров С.','Емельянов Э.'], ['Трампов Т.', 'Псаки П', 'Байденович Б']];
  document.body.addEventListener('click', createLesson(students));


  function createLesson(arrHuman) {                                             // ФУНКЦИЯ ПРИНИМАЕТ МАССИВ СТУДЕНТОВ
    let lessons = new Map();                                                    // Map ДЛЯ ХРАНЕНИЯ СОХРАНЕНИЙ ЖУРНАЛА
    let group;
    for (var g = 1; g < arrHuman.length+1; g++) {                               // ФОРМИРОВАНИЕ СПИСКА ГРУПП СОГЛАСНО МАССИВА СТУДЕНТОВ
      group += '<option value="'+(g-1)+'">Group '+ g +'</option>';
    }
    document.forms.is_present.group.innerHTML = group;
    return  function () {
      let form1 = document.forms.is_present;
      let form2 = document.forms.select_is;
      let i = form1.group.value + '-' + form1.lesson.value;                     // i - КЛЮЧ Map СОХРАНЕНИЯ

      if (event.target == form1.group_selection) {                              // ПРОВЕРКА НА СОХРАНЕННЫЕ УРОКИ(КЭШ)
        if (lessons.has(i)) {
          if (document.forms.saved) document.forms.saved.remove();
          form2.hidden = true;
          form1.after(lessons.get(i));
          return;
        }
        if (document.forms.saved) document.forms.saved.remove();
        let group = arrHuman[form1.group.value];                                // ФОРМИРОВАНИЕ СПИСКА  СТУДЕНТОВ
        let tab_str = '<tr><th>Name</th><th>Is present</th></tr>';
        for (var k = 0; k < group.length; k++) {
          tab_str +='<tr><td>'+ group[k] + '</td><td><input type="checkbox"></td></tr>';
        }
        form2.children[1].innerHTML = tab_str;
        if (form2.hidden) form2.hidden = false;
        form2.reset();
      }

      if (event.target == form2.button_is) {                                    // СОХРАНЕНИЕ УРОКА
        let temp = form2.cloneNode(true);
        temp.name = 'saved';
        let topic = temp.topic.value;
        temp.topic.remove();
        temp.button_is.remove();
        let span = document.createElement('span');
        span.innerText = topic;
        temp.children[0].append(span);
        for (var j = 1; j < temp.children[1].rows.length; j++) {
          temp.children[1].rows[j].cells[1].innerHTML = (form2.children[1].rows[j].cells[1].children[0].checked)?'present':'';
        }
        lessons.set(i, temp)
      }
    }
  }

//------------------------------------------------------------------------------4е задание --------------------------------------------------------------------

  function byTickets() {
    let arr_seats = [[new Array(28), new Array(28), new Array(28)], [new Array(28), new Array(28), new Array(28)]]


    let form = document.forms.option_tickets;
    let target_date = form.date_.value;
    let target_direction = form.direction_.value;
    console.log(target_date);
    let target_train = arr_seats[target_direction][target_date];
    console.log(target_train);
    let table = document.querySelector('.train');
    // for (let i = 0; i < target_train.length; i++) {
    //   i = Math.floor(i);
    //   (i%2==0) ? table.rows[0].cells[Math.floor(i/2)].children[0].checked = target_train[i] : table.rows[1].cells[Math.floor(i/2)].children[0].checked = target_train[i];
    //
    // }
    let seats=[];
    for (let i = 0, j=0 ; i < 14; i++) {
      console.log(table.rows[j].cells[i].innerText);
      if (table.rows[j].cells[i].children[0].checked) seats.push([table.rows[j].cells[i].innerText, target_date, target_direction]);
      if (i==13 && j!=1) {i=0; j=1;}
    }

    let table_str ='<table><tr><th>Direction</th><th>Date</th><th>Seats</th</tr>';
    for (var i = 0; i < seats.length; i++) {
    table_str += '<tr><td>' +seats[i][2]+ '</td><td>' +seats[i][1] +'</td><td>'+seats[i][0]+'</td></tr>'
    }

    console.log(seats);
  }
  document.forms.option_tickets.target_selection.addEventListener('click', byTickets);

}
