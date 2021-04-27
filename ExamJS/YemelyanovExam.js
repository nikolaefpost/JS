
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
    this.key = "0cde6e4df2b121c26f6f76f3edd3b7b9";
    this.city_name;
  }
  async search(position) {
      let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=0cde6e4df2b121c26f6f76f3edd3b7b9&units=metric`);
      this.info = await result.json();
      console.log(this.info);
  }
}

class View {
  constructor() {

  }
}

class Controller {
  constructor(weathersModel, service, weatherState) {
    this.weatherState = weatherState;
    this.weathersModel = weathersModel;
    this.service = service;
    (async () => {
     this.service.geo(this.weathersModel.search.bind(this.weatherState));
  // тут будет работа с View
    })();
}
}
let weatherState = new WeatherState();
let service = new Service()
let weathersMode = new WeathersModel();
let controller = new Controller(weathersMode, service, weatherState);
