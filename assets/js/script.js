// Generar número aleatorio entre min y max
function numeroAleatorio(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Variables globales
let usuarioAutenticado = null;
let card_juego = document.getElementById("card_juegos");

// Bienvenida
alert("Bienvenidos a 'Es Tim'\nLa mejor tienda de juegos retro");

// Menú principal
function menu_principal() {
  let flag = true;

  while (flag) {
    let mensaje = "Indique lo que desea hacer:";
    mensaje += "\n1) Registrarse ";
    mensaje += "\n2) Login ";
    mensaje += "\n3) Ver juegos ";
    mensaje += "\n4) Salir ";

    let resp = prompt(mensaje);

    switch (resp) {
      case "1":
        registrar_usuario();
        break;
      case "2":
        login();
        break;
      case "3":
        mostrar_juegos();
        break;
      case "4":
        alert("Gracias por utilizar nuestra página :)");
        flag = false;
        break;
      case null:
        alert("Gracias por utilizar nuestra página :)");
        flag = false;
        break;
      default:
        alert("No ingresó una opción válida");
    }
  }
}

// Menú después de login
function menu_login() {
  let flag = true;
  while (flag) {
    let mensaje = "Indique lo que desea hacer:";
    mensaje += "\n1) Comprar juego ";
    mensaje += "\n2) Ver mis juegos ";
    mensaje += "\n3) Juega";
    mensaje += "\n4) Ingresar dinero ";
    mensaje += "\n5) Ver saldo ";
    mensaje += "\n6) Salir ";

    let resp = prompt(mensaje);

    switch (resp) {
      case "1":
        comprar_juego();
        break;
      case "2":
        mostrar_mis_juegos();
        break;
      case "3":
        jugarJuego();
        break;
      case "4":
        ingresar_dinero();
        break;
      case "5":
        ver_saldo();
        break;
      case "6":
        alert("Gracias por utilizar nuestra página :)");
        flag = false;
        break;
      case null:
        alert("Gracias por utilizar nuestra página :)");
        flag = false;
        break;
      default:
        alert("No ingresó una opción válida");
    }
  }
}

// Muestra el saldo del usuario autenticado
function ver_saldo() {
  if (!verificarAutenticacion()) return; // Verifica autenticación

  alert("Tu saldo es: $" + usuarioAutenticado.getDinero());
}

// Muestra los juegos comprados del usuario autenticado
function mostrar_mis_juegos() {
  if (!verificarAutenticacion()) return;

  let mensaje = "Juegos comprados:\n";
  if (usuarioAutenticado.getJuegosComprados().length === 0) {
    mensaje += "No has comprado ningún juego.";
   } else {
    usuarioAutenticado.getJuegosComprados().forEach((juego) => {
      mensaje += juego.getFullData() + "\n";
    });
  }
  alert(mensaje);
}

// Compra un nuevo juego
function comprar_juego() {
  if (!verificarAutenticacion()) return;
  let juego = seleccionar_juego();
  if (juego) {
    if (usuarioAutenticado.tieneJuego(juego)) {
      alert("Ya tienes este juego");
    } else {
      usuarioAutenticado.setJuegosComprados(juego);
      usuarioAutenticado.debitar(juego.getPrecio());
      alert("Juego comprado exitosamente");
    }
  }
}

// Selecciona un nuevo juego
function seleccionar_juego() {
  mostrar_juegos();
  let id = prompt("Indique el ID del juego que desea comprar:");
  id = parseInt(id);
  if (id === null) {
    return null;
  }
  let juego = coleccion_juegos.find((juego) => juego.getId() === id);
  if (!juego) {
    alert("No existe un juego con ese ID");
    return null;
  }

  if (juego.getPrecio() > usuarioAutenticado.getDinero()) {
    alert("No tiene suficiente dinero");
    return null;
  }
  return juego;
}

function jugarJuego() {
  if (!verificarAutenticacion()) return;
  mostrar_mis_juegos();
  if (usuarioAutenticado.getJuegosComprados().length === 0) {
    alert("No has comprado ningun juego");
    return;
  }
   
  let id = parseInt(prompt("Indique el ID del juego que desea jugar:"));

  if (isNaN(id)) {
    alert("Debe ingresar un ID válido.");
    return;
  }

  let juego = usuarioAutenticado
    .getJuegosComprados()
    .find((juego) => juego.getId() === id);

  if (!juego) {
    alert("No existe un juego con ese ID.");
    return;
  }

  switch (juego.getId()) {
    case 1:
      ppt();
      break;
    case 2:
      numberSecret();
      break;
    case 3:
      matematicas();
      break;
    default:
      alert("No existe un juego con ese ID.");
      break;
  }
}

// Ingresa dinero a la cuenta del usuario autenticado
function ingresar_dinero() {
  if (!verificarAutenticacion()) return;

  let dinero = parseInt(prompt("Ingrese la cantidad de dinero a ingresar:"));

  if (isNaN(dinero) || dinero <= 0) {
    alert("Ingrese una cantidad de dinero válida y mayor a 0.");
    return;
  }
  usuarioAutenticado.setDinero(usuarioAutenticado.getDinero() + dinero);
  alert(
    "Dinero ingresado exitosamente.\nTu nuevo saldo es: $" +
      usuarioAutenticado.getDinero()
  );
}

// Muestra los juegos disponibles
function mostrar_juegos() {
  if (existen_juegos()) {
    let mensaje = "Juegos disponibles:";
    coleccion_juegos.forEach((juego) => {
      mensaje += "\n" + juego.getFullData();
    });
    alert(mensaje);
  }
}

// Verifica si existen juegos en la colección
function existen_juegos() {
  if (coleccion_juegos.length === 0) {
    alert("No hay Juegos disponibles");
    return false;
  }
  return true;
}

// Registra un nuevo usuario
function registrar_usuario() {
  alert("Registro de usuario");
  let { nombre, apellidos, edad, usuario, pass } = solicitar_datos_usuario();

  let nuevo_usuario = new Usuario(nombre, apellidos, edad);
  nuevo_usuario.set_id(coleccion_usuarios.length + 1);
  nuevo_usuario.setLogin(usuario, pass);

  coleccion_usuarios.push(nuevo_usuario);
  alert("Usuario registrado exitosamente.");
}

/**
 * Valida el nombre de usuario para el registro
 * @param {*} user
 * @param {*} coleccion_usuarios
 * @returns
 */
function validarUsuario(user, coleccion_usuarios) {
  if (/\s/.test(user)) {
    alert("El nombre de usuario no puede contener espacios en blanco");
    return false;
  }
  if (/\d/.test(user)) {
    alert("El nombre de usuario no puede contener números");
    return false;
  }
  if (coleccion_usuarios.some((u) => u.getLogin()?.getUser() === user)) {
    alert("El nombre de usuario ya está en uso. Por favor, elige otro.");
    return false;
  }
  return true;
}

/**
 * Valida la contraseña para el registro
 * @param {*} pass
 * @returns
 */
function validarPass(pass) {
  if (pass.length < 3 || pass.length > 8) {
    alert("La contraseña debe tener entre 3 y 8 caracteres");
    return false;
  }
  return true;
}

// Solicita y valida los datos del usuario en el registro
function solicitar_datos_usuario() {
  let nombre,
    apellidos,
    edad,
    usuario,
    pass,
    valido = false;

  while (!valido) {
    nombre = prompt("Indique su nombre").toLowerCase().trim();
    apellidos = prompt("Indique sus apellidos").toLowerCase().trim();
    edad = parseInt(prompt("Indique su edad").trim());

    if (isNaN(edad) || edad <= 0) {
      alert("La edad debe ser un número válido y mayor que 0");
      continue;
    }
    usuario = prompt("Indique su usuario").toLowerCase().trim();
    if (!validarUsuario(usuario, coleccion_usuarios)) continue;

    pass = prompt("Indique su contraseña").trim();
    if (!validarPass(pass)) continue;

    valido = true;
  }
  return { nombre, apellidos, edad, usuario, pass };
}

// Realiza el login de un usuario
function login() {
  alert("Login");
  let usuario = prompt("Indique su usuario");
  let pass = prompt("Indique su contraseña");

  let login = coleccion_usuarios.find(
    (l) => l.getLogin().getUser() === usuario && l.getLogin().getPass() === pass
  );

  if (login) {
    usuarioAutenticado = login;
    alert("Login exitoso\nBienvenido " + login.getNombreCompleto());
    menu_login();
  } else {
    alert("Login fallido");
  }
}

// Verifica si el usuario está autenticado
function verificarAutenticacion() {
  if (!usuarioAutenticado) {
    alert("Debes iniciar sesión para acceder a esta funcionalidad.");
    return false;
  }
  return true;
}

// Genera la tarjeta de juego para el DOM
function generar_card_juego(juego) {
  let card = document.createElement("div");
  card.classList.add("col");
  card.innerHTML = `
  <div class="card">
    <img src="./assets/images/${juego.getImagen()}.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${juego.getNombre()}</h5>
      <span class="badge text-bg-warning">${juego.getGenero()}</span>
      <p class="card-text">${juego.getDescripcion()}</p>
    </div>
    <div class="card-footer">
      <a href="#" class="btn btn-outline-warning btnComprar">Comprar </a>
    </div>
  </div>`;
  return card;
}

// Muestra las tarjetas de juego en el DOM
function mostrar_juegos_card() {
  card_juego.innerHTML = "";
  coleccion_juegos.forEach((juego) => {
    card_juego.appendChild(generar_card_juego(juego));
  });
}

// LLAMADA A LOS JUEGOS

/**
 * MATEMATICAS
 */
function matematicas() {
  let aciertos = 0;

  for (let i = 0; i < 3; i++) {
    let pregunta = numeroAleatorio(1, 7);
    let respuestaCorrecta;
    let respuestaUsuario;

    switch (pregunta) {
      case 1:
        respuestaCorrecta = 5 + 3;
        respuestaUsuario = parseInt(prompt("¿Cuánto es 5 + 3?"));
        break;
      case 2:
        respuestaCorrecta = 12 - 7;
        respuestaUsuario = parseInt(prompt("¿Cuánto es 12 - 7?"));
        break;
      case 3:
        respuestaCorrecta = 6 * 2;
        respuestaUsuario = parseInt(prompt("¿Cuánto es 6 * 2?"));
        break;
      case 4:
        respuestaCorrecta = 16 / 4;
        respuestaUsuario = parseInt(prompt("¿Cuánto es 16 / 4?"));
        break;
      case 5:
        respuestaCorrecta = 9 + 6;
        respuestaUsuario = parseInt(prompt("¿Cuánto es 9 + 6?"));
        break;
      case 6:
        respuestaCorrecta = 10 - 3;
        respuestaUsuario = parseInt(prompt("¿Cuánto es 10 - 3?"));
        break;
      case 7:
        respuestaCorrecta = 8 * 3;
        respuestaUsuario = parseInt(prompt("¿Cuánto es 8 * 3?"));
        break;
    }

    if (respuestaUsuario === respuestaCorrecta) {
      alert("¡Correcto! 🎉");
      aciertos++;
    } else {
      alert("¡Incorrecto! ❌ La respuesta correcta era: " + respuestaCorrecta);
      break;
    }
  }

  if (aciertos === 3) {
    alert(
      "¡Felicidades! Respondiste bien las 3 preguntas y ganaste el juego. 🏆"
    );
  } else {
    alert(
      "¡Juego terminado! 😢 No lograste responder correctamente las 3 preguntas."
    );
  }
}

/**
 * JUEGO ADIVINAR EL NUMERO SECRETO
 */
function numberSecret() {
  let numero_secreto = numeroAleatorio(1, 10);
  let intentosUsuarios = 0;
  let jugadorNumero = 0;

  while (jugadorNumero !== numero_secreto) {
    intentosUsuarios++;
    jugadorNumero = parseInt(prompt("Introduce un número del 1 al 10"), 10);

    if (isNaN(jugadorNumero)) {
      alert("Por favor introduce un número válido.");
      continue;
    }

    if (jugadorNumero === numero_secreto) {
      alert("¡Ganaste!🎉");
      break;
    } else if (jugadorNumero > numero_secreto) {
      alert("Más bajo 👇");
    } else if (jugadorNumero < numero_secreto) {
      alert("Más alto 👆");
    }

    if (intentosUsuarios === 3) {
      alert(
        "Perdiste ❌, se acabaron los intentos.\nEl número era: " +
          numero_secreto
      );
      break;
    }
  }
}

/**
 * JUEGO PIEDRA PAPEL TIJERA
 */
function ppt() {
  let piedra = 1;
  let papel = 2;
  let tijera = 3;

  let eleccionIA = numeroAleatorio(1, 3);
  console.log("La computadora eligió: " + eleccionIA);
  let eleccionUsuario = parseInt(
    prompt(
      "Elige una opción(número):\n 1: Piedra 🗿\n 2: Papel 📃\n 3: Tijera ✂"
    )
  );

  while (isNaN(eleccionUsuario) || eleccionUsuario < 1 || eleccionUsuario > 3) {
    alert("Opción inválida. Por favor, elige un número entre 1 y 3.");
    eleccionUsuario = parseInt(
      prompt(
        "Elige una opción(numero):\n 1: Piedra 🗿\n 2: Papel 📃\n 3: Tijera ✂"
      )
    );
  }

  let eleccionIATexto = "";
  if (eleccionIA === piedra) {
    eleccionIATexto = "Piedra 🗿";
  } else if (eleccionIA === papel) {
    eleccionIATexto = "Papel 📃";
  } else if (eleccionIA === tijera) {
    eleccionIATexto = "Tijera ✂";
  }

  if (
    (eleccionUsuario == piedra && eleccionIA == tijera) ||
    (eleccionUsuario == papel && eleccionIA == piedra) ||
    (eleccionUsuario == tijera && eleccionIA == papel)
  ) {
    alert("¡Ganaste! 🎉\n La computadora eligió: " + eleccionIATexto);
  } else if (eleccionUsuario === eleccionIA) {
    alert("¡Empate!\n La computadora eligió: " + eleccionIATexto);
  } else {
    alert("¡Perdiste! ❌\n La computadora eligió: " + eleccionIATexto);
  }
}

// Llamada inicial para mostrar juegos en la interfaz
mostrar_juegos_card();

// Llamada al menú principal al iniciar el programa
menu_principal();

let btnComprar = document.getElementsByClassName("btnComprar");

 for (let i = 0; i < btnComprar.length; i++) {
    // btnComprar[i].classList.add("disabled");
    btnComprar[i].setAttribute("aria-disabled", "true");
    btnComprar[i].onclick = function(event) {
      alert("Proximamente...")
        event.preventDefault();  
    };
}


