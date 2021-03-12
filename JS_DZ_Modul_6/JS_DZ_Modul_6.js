
  window.onload = function () {
  //------------------------------------------------------------------------------1е задание --------------------------------------------------------------------
  let text_default ='Viverra suspendisse potenti nullam ac. Eget mauris pharetra et ultrices. Elementum nibh tellus molestie nunc non blandit massa enim. Dapibus ultrices in iaculis nunc sed augue lacus viverra vitae. Nam aliquam sem et tortor. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. At in tellus integer feugiat. Nisl tincidunt eget nullam non nisi est sit. Tempor orci eu lobortis elementum nibh. Nunc consequat interdum varius sit amet.';
  text_.addEventListener('focus', function() {document.forms[0].button.hidden = false; document.querySelector('textarea').value = text_default});
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
    let arr_train = ['Nikolaev-Moscow', 'Moscow-Nikolaev'];
    let arr_date = ['10.03.2012', '11.03.2012', '12.03.2012'];
    let button_buy = document.querySelector('.button_buy');
    let button_tickets = document.querySelector('.button_tickets');
    let table_selects = document.querySelector('.table_select');
    let seats=[];                                                               // МАССИВ ДЛЯ ХРАНЕНИЯ БИЛЕТОВ
    let table = document.querySelector('.train');
    let form = document.forms.option_tickets;
    const RATE = 300;
    let target_date;
    let target_direction;
    let target_train;

    form.target_selection.addEventListener('click', selectTrain);
    form.date_.addEventListener('change', selectTrain);
    form.direction_.addEventListener('change', selectTrain);
    button_buy.addEventListener('click', bookTickets);


    function selectTrain() {
      table_selects.hidden = false;
      target_date = form.date_.value;
      target_direction = form.direction_.value;
      target_train = arr_seats[target_direction][target_date];

      for (let i = 0; i < target_train.length; i++) {
        if (target_train[i]=='&#10004') {
          if (i%2==0) {table.rows[0].cells[Math.floor(i/2)].innerHTML = (i+2) + '&#10004';}
          else { table.rows[1].cells[Math.floor(i/2)].innerHTML =i+ '&#10004';}
        }else{
          if (i%2==0) {table.rows[0].cells[Math.floor(i/2)].innerHTML = (i+2) + ' <input type="checkbox">';}
          else { table.rows[1].cells[Math.floor(i/2)].innerHTML = i + ' <input type="checkbox">'; }
        }
      }
    }

    function bookTickets() {
      for (let i = 0; i < target_train.length; i++) {
        i = Math.floor(i);
        if (i%2==0){
          if (table.rows[0].cells[Math.floor(i/2)].children[0] && table.rows[0].cells[Math.floor(i/2)].children[0].checked) {
            target_train[i] = '&#10004';
            seats.push([table.rows[0].cells[Math.floor(i/2)].innerText, target_date, target_direction]);}
          }else {
            if (table.rows[1].cells[Math.floor(i/2)].children[0] && table.rows[1].cells[Math.floor(i/2)].children[0].checked) {
              target_train[i] = '&#10004';
              seats.push([table.rows[1].cells[Math.floor(i/2)].innerText, target_date, target_direction]);
            }
          }
        }
        out_prise.innerText = 'Total prise: '+seats.length*RATE+' $';
        selectTrain();
        showTickets();
      }

      function showTickets (){
        if (seats.length==0) return;
        let table_str ='<table class="out"><tr><th>Direction</th><th>Date</th><th>Seats</th</tr>';
        for (var i = 0; i < seats.length; i++) {
          table_str += '<tr><td>' + arr_train[seats[i][2]]+ '</td><td>' +arr_date[seats[i][1]] +'</td><td>'+seats[i][0]+'</td></tr>'
        }
        table_str += '</table>';
        out_tickets.innerHTML = table_str;
      }
  }
  byTickets();
}
