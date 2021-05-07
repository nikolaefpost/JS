$(function () {
  $('.user_form').parsley().on('field:validated', function() {
    var ok = $('.parsley-error').length === 0;
    $('.bs-callout-info').toggleClass('hidden', !ok);
    $('.bs-callout-warning').toggleClass('hidden', ok);
  })
  .on('form:submit', function() {
    event.preventDefault();
    let user = $('.username').val();
    if  (user == 'admin' || user == 'user' || user == 'test'){
      new  WarningMessage('.username'); return false;
    }
    if ($('.password1').val()!=$('.password2').val()) {
      new  WarningMessage('.password2'); return false;
    }
    let complexity = testPasword($('.password1').val())
    let email = $('.email').val();
    new RegistredView(user, email, complexity)
  });
});

$(function () {
  $('.user_info_form').parsley().on('field:validated', function() {
    var ok = $('.parsley-error').length === 0;
    $('.bs-callout-info').toggleClass('hidden', !ok);
  })
  .on('form:submit', function() {
    event.preventDefault();
    if (new Date($(".birthday").val()).getFullYear()<1900) {
      new  WarningMessage('.birthday'); return false;
    }
    new InfoView($(".fullname").val(), $(".avatar").val(), $(".birthday").val(), $('input[name="gender"]:checked').val(), $('.subscribe').is(':checked'))
  });
});

class WarningMessage {
  constructor(class_) {
    this.hintText = $(class_).data( "tooltip" );
    let hint = document.createElement('div');
    hint.className = 'tooltip';
    hint.innerHTML = this.hintText;
    $(class_).parent().append(hint);
    $(class_).focus()
    $(class_).blur( function () {
      if (hint) {
        hint.remove();
        hint = null;
      }
    });
  }
}

 function testPasword(str) {
   let n=0, l_s=0, l_b=0, s=0
   for (var i = 0; i < str.length; i++) {
     if(Number(str[i])) n++;
     if(str.charCodeAt(i)>64 && str.charCodeAt(i)<91 ||
     str.charCodeAt(i)>1039 && str.charCodeAt(i)<1072 || str.charCodeAt(i)==1025 ){
       l_b++;
     }
     if(str.charCodeAt(i)>96 && str.charCodeAt(i)<123 ||
     str.charCodeAt(i)>1071 && str.charCodeAt(i)<1104 ||  str.charCodeAt(i)==1105 ){
       l_s++;
     }
   }
   s = str.length - n -l_s - l_b;
   if (n>0 && l_s>0 && l_b>0 && s>0) return 'hard';
   if (n>0 && l_s>0 && l_b>0 && s==0) return 'normal';
   if (n>0 && (l_s>0 || l_b>0) ) return 'Easy';
   if (l_s==str.length || l_b==str.length || n==str.length) return 'very easy';
   else return 'normaly';
 }

 class RegistredView {
   constructor(username, email, complexity) {
       let rezultContainer = document.createElement("div");
         rezultContainer.innerHTML = document.getElementById('rezult').innerHTML
         .replace(/{{username}}/, username)
         .replace(/{{email}}/, email)
         .replace(/{{complexity}}/, `******* (${complexity})`)
         let result = rezultContainer.children[0];
         rezult_list.innerHTML = '';
         rezult_list.append(result);
   }
 }

 class InfoView {
   constructor(fullname, avatar, birthday, gender, subscribe) {
     this.gender = ['Female', 'Male'];
     this.subscribe = ['No', 'Yes'];

       let rezultContainer = document.createElement("div");
         rezultContainer.innerHTML = document.getElementById('rezult_info').innerHTML
         .replace(/{{fullname}}/, fullname)
         .replace(/{{avatar}}/, avatar)
         .replace(/{{birthday}}/, birthday)
         .replace(/{{gender}}/, this.gender[gender])
         .replace(/{{subscribe}}/, subscribe? 'Yes': 'No')
         let result = rezultContainer.children[0];
         rezult_info_list.innerHTML = '';
         rezult_info_list.append(result);
   }
 }
