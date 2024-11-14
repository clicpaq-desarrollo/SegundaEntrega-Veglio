 if (!localStorage.getItem("coleccion_usuarios")) {
    const usuariosIniciales = [
        { id: 999, nombre: "Gonzalo", apellido: "Veglio", edad: 20, usuario: "gveglio", password: "pass1234", saldo: 10600 },
        { id: 998, nombre: "Maria", apellido: "Jimenez", edad: 20, usuario: "mjimenez", password: "pass1234", saldo: 0 },
        { id: 997, nombre: "Pedro", apellido: "Perez", edad: 20, usuario: "pperez", password: "pass1234", saldo: 0 }
    ];
    localStorage.setItem("coleccion_usuarios", JSON.stringify(usuariosIniciales));
}

if (!localStorage.getItem("coleccion_juegos")) {
    const juegosIniciales = [
        { id: 1, nombre: "Piedra, Papel, Tijera", descripcion: "Selecciona una de las opciones válidas.", precio: "10500", genero: "Aventura", imagen: "ppt2" },
        { id: 2, nombre: "Adivina el numero", descripcion: "El objetivo es adivinar un número entre 1 y 10", precio: "10500", genero: "Aventura", imagen: "adiv_num" },
        { id: 3, nombre: "Matematicas", descripcion: "Resuelve las operaciones matemáticas que se muestran.", precio: "10500", genero: "Ingenio", imagen: "numbers2" }
    ];
    localStorage.setItem("coleccion_juegos", JSON.stringify(juegosIniciales));
}
 function getNewId(type) {
    const counterKey = type === "user" ? "userIdCounter" : "gameIdCounter";
    let currentId = parseInt(localStorage.getItem(counterKey), 10) || 1;
    localStorage.setItem(counterKey, (currentId + 1).toString());
    return currentId;
}

 const coleccion_usuarios = JSON.parse(localStorage.getItem("coleccion_usuarios")) || [];
const coleccion_juegos = JSON.parse(localStorage.getItem("coleccion_juegos")) || [];
