window.onload = function () {
//------------------------------------------------------------------------------1е задание --------------------------------------------------------------------
  function addMessage(article_class) {
    let form = document.forms[0];
    let article = document.querySelector(article_class)
    return function () {
      let user_name = form.elements.name.value;
      let user_message = form.elements.message.value;
      var container = article.cloneNode(true);
      let span = container.getElementsByTagName('span');
      span[1].innerText = user_name;
      span[2].innerText = (new Date()).toLocaleString();
      container.children[2].innerText = user_message;
      main.prepend(container);
    }
  }

  document.onclick = function () { if (event.target.classList.contains("x"))  event.target.parentElement.remove();}
  button.onclick = addMessage('.container');
//------------------------------------------------------------------------------2е задание --------------------------------------------------------------------
  btn1.addEventListener('click', buttonHandling1);
  btn2.addEventListener('click', buttonHandling2);
  btn0.addEventListener('click', buttonHandling0);

  function buttonHandling0 () {
    btn0.hidden = true;
    document.forms[1].hidden = false;
  }

  function buttonHandling1 () {
    if (!document.forms[1].planet.value) {
      alert('Сделайте ваш выбор!');
      return;
    }
    document.forms[1].hidden = true;
    document.forms[2].hidden = false;
  }

  function buttonHandling2() {
    if (!document.forms[2].language.value) {
      alert('Сделайте ваш выбор!');
      return;
    }
    let i=0;
    document.forms[2].hidden = true;
    if (document.forms[1].planet.value==0) i++;
    if (document.forms[2].language.value==1) i++;
    out512.innerText = 'Congratulations! Rezult: '+i+' correct answers to '+ (document.forms.length-1)+' questions';   //-1 форма из предыдущего задания)
  }
}
