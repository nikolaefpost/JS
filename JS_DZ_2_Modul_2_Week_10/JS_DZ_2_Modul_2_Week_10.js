
  class Circle {
    constructor() {
      this.radius=0;
    }

    get radius() {
      return this.radius;
    }

    set radius(value) {
      (!Number(value)) ? alert('Введите число!') : this.radius = value;
      return this;
    }
  }
