
class Service {
  constructor() {
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
  }
    error_geo(err){
      console.warn(`ERRORFuck(${err.code}): ${err.message}`);
    };

   geo(f){
     navigator.geolocation.getCurrentPosition((position)=>f(position), this.error, this.options);
    }
  }

class WeatherState {
  constructor() {
    this.weather;
    this.coord;
    this.near_city;
  }
  setWeather(info) {
    this.weather = info;
  }
  setPosition(coord) {
    this.coord = coord;
  }
  setNear(info) {
    this.near_city = info;
  }
}

class WeathersModel {
  constructor() {
    this.key = "0cde6e4df2b121c26f6f76f3edd3b7b9";
    this.city_name;
  }
  async search(position) {
      let result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=0cde6e4df2b121c26f6f76f3edd3b7b9&units=metric`);
      let info = await result.json();
      console.log(info);
      return info;
  }
  async searchNear(position){
    let result = await fetch(`https://api.openweathermap.org/data/2.5/find?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=5&appid=0cde6e4df2b121c26f6f76f3edd3b7b9&units=metric`);
    let info = await result.json();
    console.log(info);
    return info;
  }

  async searchCity(city){
    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0cde6e4df2b121c26f6f76f3edd3b7b9&units=metric`);
    let info = await result.json();
    console.log(info);
    return info;
  }
}

class View {
  constructor() {
    this.q;
  }
  // rendering(w){
  //   main_comp.classList.remove('hidden');
  //   now_date.innerText = new Date().toLocaleDateString();
  //   icon_comp.src = `http://openweathermap.org/img/wn/${w.current.weather[0].icon}@2x.png`;
  //   text_comp.innerText = w.current.weather[0].main;
  //   temp_comp.innerText = Math.round(w.current.temp)+temp_comp.innerText;
  //   feel_temp_comp.innerText ='Real Feel '+ Math.round(w.current.feels_like)+feel_temp_comp.innerText;
  //   let time1 = new Date(w.current.sunrise)
  //   sunrise.innerText = time1.getHours()+':'+time1.getMinutes()+'AM';
  //   let time2 = new Date(w.current.sunset)
  //   sunset.innerText = time2.getHours()+':'+time2.getMinutes()+'AM';
  //   let dur = new Date(w.current.sunset-w.current.sunrise);
  //   duration.innerText = (dur.getHours()-3)+':'+dur.getMinutes()+' hr';
  // }

  rendering(w){
    main_temp.innerHTML = '';
    // main_comp.classList.remove('hidden');
    let cityContainer = document.createElement("div");
    let time1 = new Date(w.current.sunrise);
    let time2 = new Date(w.current.sunset);
    let dur = new Date(w.current.sunset-w.current.sunrise);

      cityContainer.innerHTML = document.getElementById('main_comp').innerHTML
        .replace(/{{date_}}/, new Date().toLocaleDateString())
        .replace(/{{image}}/, `http://openweathermap.org/img/wn/${w.current.weather[0].icon}@2x.png`)
        .replace(/{{text}}/, w.current.weather[0].main)
        .replace(/{{temp}}/, `${Math.round(w.current.temp)} &degC`)
        .replace(/{{temp_feel}}/, `Real Feel ${Math.round(w.current.temp)} &degC`)
        .replace(/{{sunrise}}/, `Sunrise: ${time1.getHours()}:${time1.getMinutes()} AM`)
        .replace(/{{sunset}}/, `Sunset: ${time1.getHours()}:${time1.getMinutes()} AM`)
        .replace(/{{duration}}/, `Duration: ${(dur.getHours()-3)}:${dur.getMinutes()} AM`)
      let result = cityContainer.children[0];
      result.classList.remove('hidden');
      main_temp.append(result);

  }


  renderingHourly(w){
    hourly.classList.remove('hidden');
    let id_hour=[hour0, hour1, hour2, hour3, hour4, hour5]
    let id_img=[img0, img1, img2, img3, img4, img5];
    let id_forecast=[forecast0, forecast1, forecast2, forecast3, forecast4, forecast5];
    let id_temp=[temp0, temp1, temp2, temp3, temp4, temp5];
    let id_feel=[feel0, feel1, feel2, feel3, feel4, feel5];
    let id_wind=[wind0, wind1, wind2, wind3, wind4, wind5];
    for (let i = 0; i < 6; i++) {
      id_hour[i].innerText = new Date(new Date().getTime()+(i+1)*3600000).getHours()+'.00';
      id_img[i].src = `http://openweathermap.org/img/wn/${w.hourly[i].weather[0].icon}@2x.png`;
      id_forecast[i].innerText = w.hourly[i].weather[0].main;
      id_temp[i].innerText = Math.round(w.hourly[i].temp);
      id_feel[i].innerText = Math.round(w.hourly[i].feels_like);
      id_wind[i].innerText = Math.round(w.hourly[i].wind_speed);
    }
  }

  renderingNear(w){
    nearly_temp.innerHTML = '';
    nearly.classList.remove('hidden');
    let cityContainer = document.createElement("div");
    for (var i = 1; i < 5; i++) {
      cityContainer.innerHTML = document.getElementById('nearly_list').innerHTML
        .replace(/{{name}}/, w.list[i].name)
        .replace(/{{image}}/, `http://openweathermap.org/img/wn/${w.list[i].weather[0].icon}@2x.png`)
        .replace(/{{temp}}/, Math.round(w.list[i].main.temp));
      let result = cityContainer.children[0];
      result.classList.remove('hidden');
      nearly_temp.append(result);
    }
  }

  renderingDaily(w){
    let arr_week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let arr_month = ['JUN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];


    let cityContainer = document.createElement("div");
    day_5.classList.add('border-gray-100', 'border');
    today.classList.remove('border-gray-100', 'border');
    for (var i = 0; i < 5; i++) {
      let day_ = new Date();
      day_.setDate(day_.getDate() + i)
      cityContainer.innerHTML = document.getElementById('daily_temp').innerHTML
        .replace(/{{day_week}}/, arr_week[day_.getDay()])
        .replace(/{{date_}}/, arr_month[day_.getMonth()]+' '+day_.getDate())
        .replace(/{{image}}/, `http://openweathermap.org/img/wn/${w.daily[i].weather[0].icon}@2x.png`)
        .replace(/{{temp}}/, `${Math.round(w.daily[i].temp.day)}&degC`)
        .replace(/{{weth}}/, w.daily[i].weather[0].description);
      let result = cityContainer.children[0];
      result.classList.remove('hidden');
      daily.append(result);
    }
  }

}

class Controller {
  constructor(weathersModel, service, weatherState, view) {
    this.weatherState = weatherState;
    this.weathersModel = weathersModel;
    this.service = service;
    this.view = view;
  }
  async load_servis(position){

    let weather = await this.weathersModel.search(position);
    let near_city = await this.weathersModel.searchNear(position);
    this.weatherState.setWeather(weather);
    this.weatherState.setPosition(position);
    this.weatherState.setNear(near_city);
    search_city.value = near_city.list[0].name;
    this.view.rendering(this.weatherState.weather);
    this.view.renderingHourly(this.weatherState.weather);
    this.view.renderingNear(this.weatherState.near_city);

    day_5.addEventListener('click', ()=>this.daily_servis());
    today.addEventListener('click', ()=>this.main_servis());
    search_button.addEventListener('click', ()=>this.load_search(search_city.value));

    // this.view.renderingDaily(weather);
  }

  async load_search(city){
    let coord = await this.weathersModel.searchCity(city);
    let position = {coords:{
      latitude: coord.coord.lat,
      longitude: coord.coord.lon
    }}
    console.log(position);
    this.load_servis(position);
  }

  start(){
    this.service.geo(this.load_servis.bind(this));
  }

  daily_servis(){
    // day_5.classList.add('border-gray-100 border');

    main_comp.classList.add('hidden');
    hourly.classList.add('hidden');
    nearly.classList.add('hidden');
    if(daily.children.length>0) return;
    this.view.renderingDaily(this.weatherState.weather);
  }

  main_servis(){
    main_comp.classList.remove('hidden');
    nearly.classList.remove('hidden');
    hourly.classList.remove('hidden');
    hourly.classList.add('hidden');
  }
}
let weatherState = new WeatherState();
let service = new Service()
let weathersMode = new WeathersModel();
let view = new View();
let controller = new Controller(weathersMode, service, weatherState, view);
controller.start()
