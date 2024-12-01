class Login {
  constructor(user, pass) {
      this.user = user ? user.toLowerCase() : null; 
      this.pass = pass || null; 
      this.isAdmin = false; 
  }

  getUser() {
      return this.user;
  }

  getPass() {
      return this.pass;
  }

  setAdmin(isAdmin) {
      this.isAdmin = isAdmin;
  }

  isAdministrator() {
      return this.isAdmin;
  }
}
