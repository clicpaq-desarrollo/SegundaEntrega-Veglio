class Usuario {
  constructor(nombre, apellido, edad) {
      this.id = Usuario.generateId();
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.dinero = 0;
      this.juegosComprados = [];
      this.login = null; 
  }

  static generateId() {
      const idCounter = parseInt(localStorage.getItem("userIdCounter")) || 1;
      localStorage.setItem("userIdCounter", idCounter + 1);
      return idCounter;
  }

  setLogin(user, pass) {
      this.login = new Login(user, pass);
  }

  getNombreCompleto() {
      return `${this.nombre} ${this.apellido}`;
  }

  comprarJuego(juego) {
      if (this.dinero >= juego.precio && !this.tieneJuego(juego)) {
          this.dinero -= juego.precio;
          this.juegosComprados.push(juego);
          return true;
      }
      return false;
  }

  tieneJuego(juego) {
      return this.juegosComprados.some((j) => j.id === juego.id);
  }

  setDinero(monto) {
      this.dinero = monto;
  }

  getDinero() {
      return this.dinero;
  }

  debitar(monto) {
      if (monto > 0 && this.dinero >= monto) {
          this.dinero -= monto;
          return true;
      }
      return false;
  }
}
