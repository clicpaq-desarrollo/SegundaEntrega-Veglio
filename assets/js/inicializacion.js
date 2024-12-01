if (!localStorage.getItem("coleccion_usuarios")) {
    const usuariosIniciales = [
        new Usuario("Gonzalo", "Veglio", 20),
        new Usuario("Matias", "Martini", 20),
        new Usuario("Guido", "Pasciucco", 20)
    ];

     usuariosIniciales[0].setLogin("gveglio", "pass1234");
    usuariosIniciales[0].setDinero(10600);

    usuariosIniciales[1].setLogin("mmartini", "pass1234");
    usuariosIniciales[2].setLogin("gpasciucco", "pass1234");

    localStorage.setItem("coleccion_usuarios", JSON.stringify(usuariosIniciales));
}

 if (!localStorage.getItem("coleccion_juegos")) {
    const juegosIniciales = [
        { id: 1, nombre: "Piedra, Papel, Tijera", descripcion: "Selecciona una de las opciones válidas.", precio: 10500, genero: "Aventura", imagen: "ppt2", url: "ppt.html" },
        { id: 2, nombre: "Adivina el numero", descripcion: "El objetivo es adivinar un número entre 1 y 10", precio: 10500, genero: "Aventura", imagen: "adiv_num", url: "numero_secreto.html" },
        { id: 3, nombre: "Matematicas", descripcion: "Resuelve las operaciones matemáticas que se muestran.", precio: 10500, genero: "Ingenio", imagen: "numbers2", url: "matematicas.html" },
        { id: 4, nombre: "Ta Te Ti", descripcion: "El famoso juego de tres en raya: TA TE TI.", precio: 10500, genero: "Ingenio", imagen: "ttt", url: "tateti.html" },
        { id: 5, nombre: "Ahorcado", descripcion: "Adivina la palabra oculta.", precio: 10500, genero: "Ingenio", imagen: "ahorcado", url: "ahorcado.html" },
        { id: 6, nombre: "Simon Dices", descripcion: "Continua la secuencia de colores.", precio: 10500, genero: "Ingenio", imagen: "simon", url: "simon_dice.html" }
    ];

    localStorage.setItem("coleccion_juegos", JSON.stringify(juegosIniciales));
}
