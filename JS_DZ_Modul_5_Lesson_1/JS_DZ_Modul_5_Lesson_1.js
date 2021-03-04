window.onload = function () {

  function addMessage(article_class) {
    let form = document.forms[0];
    let s = document.querySelector(article_class)



    return function () {
      let user_name = form.elements.name.value;
      let user_message = form.elements.message.value;
      var container = s.cloneNode(true);

      let span = container.getElementsByTagName('span');
      span[1].innerText = user_name;
      span[2].innerText = (new Date()).toLocaleString();
      container.children[2].innerText = user_message;
      main.prepend(container);
    }


  }

document.onclick = function () {
  if (event.target.classList.contains("x"))
  event.target.parentElement.remove();
  console.log(event.target.parentElement);


}
  button.onclick = addMessage('.container');



}
