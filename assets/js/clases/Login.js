//Clase Login que modela la entidad login

class Login {
  constructor(user, pass) {
    this.user = user;
    this.pass = pass;
    this.is_adm = false;
    this.usuario = null;
  }

  getUser() {
    return this.user;
  }

  getPass() {
    return this.pass;
  }

  setUsuario(usuario) {
    this.usuario = usuario;
  }

  getCliente() {
    return this.usuario;
  }
 

}
