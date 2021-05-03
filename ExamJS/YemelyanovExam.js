
class Service {
  constructor() {
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
  }
    error_geo(err){
      console.warn(`ERROR(${err.code}): ${err.message}`);
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
    this.weather_hour;
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
  setWeatherHour(info) {
    this.weather_hour = info;
  }
}

class WeathersModel {
  constructor() {
    this.key = "";
  }
  async search(position) {
      let result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${this.key}&units=metric`);
      let info = await result.json();
      return info;
  }
  async searchNear(position){
    let result = await fetch(`https://api.openweathermap.org/data/2.5/find?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=5&appid=${this.key}&units=metric`);
    let info = await result.json();
    return info;
  }

  async searchCity(city){
    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.key}&units=metric`);
    let info = await result.json();
    return info;
  }

  async searchDailyHourly(city){
    let result = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.key}&units=metric`);
    let info = await result.json();
    return info;
  }
}

class View {
  constructor() {
    this.arr_week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    this.arr_month = ['JUN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  }

  rendering(w){
    main_list.innerHTML = '';
    let cityContainer = document.createElement("div");
    let time1 = new Date(w.current.sunrise*1000);
    let minuts1=(time1.getMinutes()>9)?time1.getMinutes():`0${time1.getMinutes()}`;
    let time2 = new Date(w.current.sunset*1000);
    let minuts2 = (time2.getMinutes()>9) ? time2.getMinutes() : `0${time2.getMinutes()}`;
    let dur = new Date((w.current.sunset-w.current.sunrise)*1000);

      cityContainer.innerHTML = document.getElementById('main').innerHTML
        .replace(/{{date_}}/, new Date().toLocaleDateString())
        .replace(/{{image}}/, `http://openweathermap.org/img/wn/${w.current.weather[0].icon}@2x.png`)
        .replace(/{{text}}/, w.current.weather[0].main)
        .replace(/{{temp}}/, `${Math.round(w.current.temp)} &degC`)
        .replace(/{{temp_feel}}/, `Real Feel ${Math.round(w.current.temp)} &degC`)
        .replace(/{{sunrise}}/, `Sunrise: ${time1.getHours()}:${minuts1} AM`)
        .replace(/{{sunset}}/, `Sunset: ${time2.getHours()}:${minuts2} PM`)
        .replace(/{{duration}}/, `Duration: ${(dur.getHours()-3)}:${dur.getUTCMinutes()}`)
      let result = cityContainer.children[0];
      result.classList.remove('hidden');
      main_list.append(result);
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
        .replace(/{{wind}}/, `${Math.round(w.hourly[i].wind_speed)}, ${Math.round(w.hourly[i].wind_deg)}&deg`)
      let result = hourlyContainer.children[0];
      result.classList.remove('hidden');
      hourly_list.append(result);
    }
  }

  renderingNear(w){
    mutable.classList.remove('hidden');
    nearly_list.innerHTML = '';
    nearly.classList.remove('hidden');
    let cityContainer = document.createElement("div");
    for (var i = 1; i < 5; i++) {
      cityContainer.innerHTML = document.getElementById('nearly_temp').innerHTML
        .replace(/{{name}}/, w.list[i].name)
        .replace(/{{image}}/, `http://openweathermap.org/img/wn/${w.list[i].weather[0].icon}@2x.png`)
        .replace(/{{temp}}/, `${Math.round(w.list[i].main.temp)}&degC`);
      let result = cityContainer.children[0];
      result.classList.remove('hidden');
      nearly_list.append(result);
    }
  }

  renderingDaily(w, f){
    daily_list.innerHTML = '';
    let cityContainer = document.createElement("div");

    for (var i = 0; i < 5; i++) {
      let day_ = new Date();
      day_.setDate(day_.getDate() + i)
      cityContainer.innerHTML = document.getElementById('daily').innerHTML
        .replace(/{{day_week}}/, this.arr_week[day_.getDay()])
        .replace(/{{date_}}/, this.arr_month[day_.getMonth()]+' '+day_.getDate())
        .replace(/{{image}}/, `http://openweathermap.org/img/wn/${w.daily[i].weather[0].icon}@2x.png`)
        .replace(/{{temp}}/, `${Math.round(w.daily[i].temp.day)}&degC`)
        .replace(/{{weth}}/, w.daily[i].weather[0].description);
      let result = cityContainer.children[0];
      result.addEventListener('click', f);
      daily_list.classList.remove('hidden');
      result.setAttribute('data-state', i);
      daily_list.append(result);
    }
  }

  renderingDailyHourly(w){
    hourly_list.innerHTML = '';
      let headContainer = document.createElement("div");
        headContainer.innerHTML = document.getElementById('head_hourly').innerHTML
        .replace(/{{today}}/, this.arr_week[new Date(w[0].dt_txt).getDay()].toUpperCase())
        let result1 = headContainer.children[0];
        result1.classList.remove('hidden');
        hourly_list.append(result1);

    hourly.classList.remove('hidden');
    let hourlyContainer = document.createElement("div");
    for (var i = 0; i < 8; i++) {
      if (!w[i]) continue;
      hourlyContainer.innerHTML = document.getElementById('hourly_temp').innerHTML
        .replace(/{{time}}/, new Date(w[i].dt_txt).getHours()+'.00')
        .replace(/{{image}}/,`http://openweathermap.org/img/wn/${w[i].weather[0].icon}@2x.png`)
        .replace(/{{forecast}}/, w[i].weather[0].main)
        .replace(/{{temp}}/, `${ Math.round(w[i].main.temp)}&degC`)
        .replace(/{{temp_feel}}/, `${Math.round(w[i].main.feels_like)}&degC`)
        .replace(/{{wind}}/, `${Math.round(w[i].wind.gust)}, ${Math.round(w[i].wind.deg)}&deg`)
      let result = hourlyContainer.children[0];
      result.classList.remove('hidden');
      hourly_list.append(result);
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
    if (!navigator.geolocation) this.load_search('Mykolayiv');
    else this.service.geo(this.load_servis.bind(this));

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
    this.main_servis();

    day_5.addEventListener('click', ()=>this.daily_servis());
    today.addEventListener('click', ()=>this.main_servis());
    search_button.addEventListener('click', ()=>this.load_search(search_city.value));
    document.body.addEventListener('keydown', ()=>this.load_search(search_city.value));
  }

  async load_search(city){
    try {
      if (event.type == "click" || event.key == "Enter"){
        event.preventDefault();
        let coord = await this.weathersModel.searchCity(city);
        let position = {coords:{
          latitude: coord.coord.lat,
          longitude: coord.coord.lon
        }}
      this.load_servis(position);
      mutable.classList.remove('hidden');
      error_message.classList.add('hidden');
    }
    } catch (e) {
      error_message.classList.remove('hidden');
      mutable.classList.add('hidden');
    }
  }

  main_servis(){
    day_5.classList.remove('border-gray-100', 'border');
    today.classList.add('border-gray-100', 'border');
    main_list.classList.remove('hidden');
    nearly.classList.remove('hidden');
    hourly.classList.remove('hidden');
    this.view.renderingHourly(this.weatherState.weather);
    daily_list.classList.add('hidden');
  }

  daily_servis(){
    day_5.classList.add('border-gray-100', 'border');
    today.classList.remove('border-gray-100', 'border');
    main_list.classList.add('hidden');
    hourly.classList.add('hidden');
    nearly.classList.add('hidden');
     this.view.renderingDaily(this.weatherState.weather, this.daily_servis_hour.bind(this));
     this.daily_servis_hour();
  }

  async daily_servis_hour(e){
    Array.from(daily_list.children).forEach(item => item.classList.remove('bg-gray-300'));

    let i, target;
    if (!e) { i=0; target = daily_list.firstChild;}
    else {i=e.currentTarget.dataset.state; target = e.currentTarget; }

    target.classList.add('bg-gray-300');
    if (!this.weatherState.weather_hour || search_city.value!=this.weatherState.weather_hour.city.name){
      let weather_hour = await this.weathersModel.searchDailyHourly(search_city.value);
      this.weatherState.setWeatherHour(weather_hour);
    }
    let day_ = new Date();
    day_.setDate(Number(day_.getDate()) + Number(i));

    let day_weather = this.weatherState.weather_hour.list.filter(point => {
    return  new Date(point.dt_txt).getDate() == day_.getDate()
    })
    this.view.renderingDailyHourly(day_weather)
  }
}
let weatherState = new WeatherState();
let service = new Service()
let weathersMode = new WeathersModel();
let view = new View();
let controller = new Controller(weathersMode, service, weatherState, view);
controller.start()
