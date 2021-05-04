$(function () {
  $('.user_form').parsley().on('field:validated', function() {
    var ok = $('.parsley-error').length === 0;
    $('.bs-callout-info').toggleClass('hidden', !ok);
    $('.bs-callout-warning').toggleClass('hidden', ok);
  })
  .on('form:submit', function() {
    event.preventDefault();
    console.log('ppp');
    let user = $('.username').val();
    console.log(user);
    if  (user == 'admin' || user == 'user' || user == 'test'){
      toolTip('.username'); return false;
    }


    return false;

  });
});


function toolTip(class_){
 let hint;
 // let target = ;
 // console.log($('.username'));
 // let form = $('.user_form');
 let hintText = $(class_).data( "tooltip" );
 console.log(hintText);
 if (!hintText) return;

 hint = document.createElement('div');
 hint.className = 'tooltip';
 hint.innerHTML = hintText;
 $(class_).parents().append(hint);

 // if (target.className == 'in_book'){
 //   form.onmouseout = function () {
 //     if (hint) {
 //       hint.remove();
 //       hint = null;
 //     }
 //   }
 // }
 $(class_).focus( function () {
   if (hint) {
     hint.remove();
     hint = null;
   }
 });
 }
