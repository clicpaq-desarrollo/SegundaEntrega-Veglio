 class Usuario {
  constructor(nombre, apellido, edad) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.id = -1;
    this.login = null;
    this.dinero = 0;
    this.juegosComprados = [];
  }

  setId(nuevo_id) {
    this.id = nuevo_id;
  }

  getNombreCompleto() {
    return this.nombre + " " + this.apellido;
  }

  getEdad() {
    return this.edad;
  }

  setLogin(user, pass) {
    this.login = new Login(user, pass);
    this.login.setUsuario(this);
  }

  getLogin() {
    return this.login;
  }

  getDinero() {
    return this.dinero;
  }

  setDinero(dinero) {
    this.dinero = dinero;
  }

  getJuegosComprados() {
    return this.juegosComprados;
  }

  setJuegosComprados(juego) {
    this.juegosComprados.push(juego);
  }

   debitar(monto) {
    if (monto > 0 && this.dinero >= monto) {
      this.dinero -= monto;
      return true;
    }
    return false;
  }

  getId() {
    return this.id;
  }

  tieneJuego(juego) {
    return this.juegosComprados.find((j) => j.getId() === juego.getId());
  }
}
