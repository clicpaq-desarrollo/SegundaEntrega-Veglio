 
class Juego {
  constructor(nombre, descripcion, precio, genero, imagen) {
    this.id = -1;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.genero = genero;
    this.imagen = imagen;

  }

  getNombre() {
    return this.nombre;
  }

  getImagen() {
    return this.imagen;
  }

  getPrecio() {
    return this.precio;
  }

  getId(){
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
    return  this.id + " - " +  this.nombre + " -" + this.descripcion + " - $" + this.precio + " -" + this.genero
    };
}
