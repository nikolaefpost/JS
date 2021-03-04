window.onload = function () {
  let form = document.forms[0];
  let user_name = form.elements.name.value;
  let user_message = form.elements.message.value;
  // let div = document.createElement('div');
  // div.classList.add('container');
  // let x = document.createElement('span');
  // x.setAttribute("id", "x");
  // x.innerText = 'x';
  // div.prepend(x);
  // let p1 = document.createElement('p');
  // p1.classList.add('header', 'border_bottom');
  var container = document.querySelector('.container').cloneNode(true);
  let span = container.getElementsByTagName('span');
  span[1].innerText = user_name;
  span[2].innerText = (new Date()).toLocaleString();
  container.children[2].innerText = user_message;

  button.onclick = function () {
    main.prepend(container);
  }


  console.log(container.children[2]);
}
