
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
    return navigator.geolocation.getCurrentPosition((position)=>f(position), this.error, this.options);
    }
  }

class WeatherState {
  constructor() {
    this.weather;
  }
  change(info) {
    this.weather = info;
  }
}

class WeathersModel {
  constructor() {
    this.key = "";
    this.city_name;
  }
  async search(position) {
      let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=&units=metric`);
      this.change(await result.json());
      console.log(this.weather);
      return this.weather

  }
}

class View {
  constructor() {
    this.q;
  }
  rendering(s){
    console.log(s);
  }
}

class Controller {
  constructor(weathersModel, service, weatherState, view) {
    this.weatherState = weatherState;
    this.weathersModel = weathersModel;
    this.service = service;
    this.view = view;
    (async () => {
     this.service.geo(this.weathersModel.search.bind(this.weatherState));
     let info = await this.weatherState.weather;
     console.log(info);
     this.view.rendering(info)
    })();
}
}
let weatherState = new WeatherState();
let service = new Service()
let weathersMode = new WeathersModel();
let view = new View();
let controller = new Controller(weathersMode, service, weatherState, view);
