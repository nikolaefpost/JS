
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
    this.key = "";
    this.city_name;
  }
  async search(position) {
      let result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${this.key}&units=metric`);
      let info = await result.json();
      console.log(info);
      return info;
  }
  async searchNear(position){
    let result = await fetch(`https://api.openweathermap.org/data/2.5/find?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=5&appid=${this.key}&units=metric`);
    let info = await result.json();
    console.log(info);
    return info;
  }

  async searchCity(city){
    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.key}&units=metric`);
    let info = await result.json();
    console.log(info);
    return info;
  }

  async searchDailyHourly(city){
    let result = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.key}&units=metric`);
    let info = await result.json();
    console.log(info);
    return info;
  }
}

class View {
  constructor() {
    this.arr_week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    this.arr_month = ['JUN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  }

  rendering(w){
    main_temp.innerHTML = '';
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
    hourly_list.innerHTML = '';
      let headContainer = document.createElement("div");
        headContainer.innerHTML = document.getElementById('head_hourly').innerHTML
        .replace(/{{today}}/, this.arr_week[new Date().getDay()].toUpperCase())
        let result1 = headContainer.children[0];
        result1.classList.remove('hidden');
        hourly_list.append(result1);

    hourly.classList.remove('hidden');
    let hourlyContainer = document.createElement("div");
    for (var i = 0; i < 6; i++) {
      hourlyContainer.innerHTML = document.getElementById('hourly_temp').innerHTML
        .replace(/{{time}}/, new Date(new Date().getTime()+(i+1)*3600000).getHours()+'.00')
        .replace(/{{image}}/,`http://openweathermap.org/img/wn/${w.hourly[i].weather[0].icon}@2x.png`)
        .replace(/{{forecast}}/, w.hourly[i].weather[0].main)
        .replace(/{{temp}}/, `${ Math.round(w.hourly[i].temp)}&degC`)
        .replace(/{{temp_feel}}/, `${Math.round(w.hourly[i].feels_like)}&degC`)
        .replace(/{{wind}}/, `${Math.round(w.hourly[i].wind_speed)}&degC`)
      let result = hourlyContainer.children[0];
      result.classList.remove('hidden');
      hourly_list.append(result);
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

  renderingDaily(w, f){
    // daily.innerHTML = '';
    let cityContainer = document.createElement("div");
    day_5.classList.add('border-gray-100', 'border');
    today.classList.remove('border-gray-100', 'border');
    for (var i = 0; i < 5; i++) {
      let day_ = new Date();
      day_.setDate(day_.getDate() + i)
      cityContainer.innerHTML = document.getElementById('daily_temp').innerHTML
        .replace(/{{day_week}}/, this.arr_week[day_.getDay()])
        .replace(/{{date_}}/, this.arr_month[day_.getMonth()]+' '+day_.getDate())
        .replace(/{{image}}/, `http://openweathermap.org/img/wn/${w.daily[i].weather[0].icon}@2x.png`)
        .replace(/{{temp}}/, `${Math.round(w.daily[i].temp.day)}&degC`)
        .replace(/{{weth}}/, w.daily[i].weather[0].description);
      let result = cityContainer.children[0];
      result.addEventListener('click', f);
      result.classList.remove('hidden');
      result.setAttribute('data-state', i);
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

  start(){
    this.service.geo(this.load_servis.bind(this));
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
  }

  async load_search(city){
    let coord = await this.weathersModel.searchCity(city);
    let position = {coords:{
      latitude: coord.coord.lat,
      longitude: coord.coord.lon
    }}
    this.load_servis(position);
  }

  daily_servis(){
    // day_5.classList.add('border-gray-100 border');

    main_temp.classList.add('hidden');
    hourly.classList.add('hidden');
    nearly.classList.add('hidden');
    if(daily.children.length>0) daily.classList.remove('hidden');
    else this.view.renderingDaily(this.weatherState.weather, this.daily_servis_hour.bind(this));
  }

  async daily_servis_hour(e){
    let i = e.currentTarget.dataset.state;
    let weather = await this.weathersModel.searchDailyHourly(search_city.value);
    console.log(weather.list);
    let day_ = new Date();
    console.log(day_);
    day_.setDate(Number(day_.getDate()) + Number(i))
    console.log(day_);
    let s = weather.list.filter(word => {
      console.log(new Date(word.dt_txt).getDate() == day_.getDate());
    return  new Date(word.dt_txt).getDate() == day_.getDate()
    })
    console.log(s);
  }

  main_servis(){
    main_temp.classList.remove('hidden');
    nearly.classList.remove('hidden');
    hourly.classList.remove('hidden');
    daily.classList.add('hidden');
  }
}
let weatherState = new WeatherState();
let service = new Service()
let weathersMode = new WeathersModel();
let view = new View();
let controller = new Controller(weathersMode, service, weatherState, view);
controller.start()
