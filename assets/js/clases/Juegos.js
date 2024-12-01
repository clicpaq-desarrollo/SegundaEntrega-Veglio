
class Juego {
  constructor(nombre, descripcion, precio, genero, imagen, url) {
    this.id = Juego.generateId(); 
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.genero = genero;
    this.imagen = imagen;
    this.puntajes = [];
    this.url = url;

  }

  static generateId() {
    const idCounter = parseInt(localStorage.getItem("gameIdCounter")) || 1;
    localStorage.setItem("gameIdCounter", idCounter + 1); 
    return idCounter; 
  }

  getUrl() {
    return this.url;
  }

  getNombre() {
    return this.nombre;
  }

  getImagen() {
    return this.imagen;
  }

  registrarPuntaje(usuario, puntos) {
    this.puntajes.push({ usuario, puntos, fecha: new Date() });
  }

  obtenerPuntajes() {
    return this.puntajes;
  }

  getPrecio() {
    return this.precio;
  }

  getId() {
    return this.id
  }
  setId(nuevo_id) {
    this.id = nuevo_id;
  }
  getGenero() {
    return this.genero;
  }

  getDescripcion() {
    return this.descripcion;
  }

  getFullData() {
    return this.id + " - " + this.nombre + " -" + this.descripcion + " - $" + this.precio + " -" + this.genero
  };
}
