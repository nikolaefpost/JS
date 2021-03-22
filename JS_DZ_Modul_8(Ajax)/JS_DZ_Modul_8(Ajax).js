window.onload = function () {
  button.addEventListener('click', searchMedia);

  function searchMedia() {
    let movie;
    let form = document.forms.media_content;
    let title = form.title.value;
    let type = form.type.value;
    let request = new XMLHttpRequest();
    request.open("GET", "http://www.omdbapi.com/?s="+ title +"&plot=full&type="+type+"&apikey=ab776285");
    request.onload = function(){
   if(request.status === 200){
     movie = JSON.parse(request.response)
   console.log(movie);
   }
  }
  request.send();

  }

}
