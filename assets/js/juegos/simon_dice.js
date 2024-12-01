


const colores = ["rojo", "verde", "azul", "amarillo"];
let secuencia = [];
let secuenciaJugador = [];
let ronda = 0;


const tablero = document.getElementById("tablero");
const botones = document.querySelectorAll(".boton");
const mensaje = document.getElementById("mensaje");
const btnIniciar = document.getElementById("btnIniciar");

const MAX_RONDAS = 10;


btnIniciar.addEventListener("click", iniciarJuego);

 


function iniciarJuego() {
    secuencia = [];
    secuenciaJugador = [];
    ronda = 0;
    mensaje.textContent = "¡Presta atención!";
    btnIniciar.disabled = true;
    siguienteRonda();
}

function siguienteRonda() {
    secuenciaJugador = [];
    ronda++;
    mensaje.textContent = `Ronda ${ronda}`;


    const nuevoColor = colores[Math.floor(Math.random() * colores.length)];
    secuencia.push(nuevoColor);


    reproducirSecuencia();
}

function reproducirSecuencia() {
    let delay = 0;
    secuencia.forEach((color) => {
        setTimeout(() => {
            resaltarColor(color);
        }, delay);
        delay += 1000;
    });


    setTimeout(() => {
        mensaje.textContent = "Tu turno";
        activarBotones();
    }, delay);
}

function resaltarColor(color) {
    const boton = document.querySelector(`.${color}`);
    boton.classList.add("activo"); 

    setTimeout(() => {
        boton.classList.remove("activo"); 
    }, 500);
}


function activarBotones() {
    botones.forEach(boton => {
        boton.addEventListener("click", manejarClicJugador);
    });
}

function desactivarBotones() {
    botones.forEach(boton => {
        boton.removeEventListener("click", manejarClicJugador);
    });
}

function manejarClicJugador(e) {
    const colorClickeado = e.target.dataset.color;
    secuenciaJugador.push(colorClickeado);

    const indice = secuenciaJugador.length - 1;

    
    if (secuenciaJugador[indice] !== secuencia[indice]) {
        manejarError(); 
        return;
    }

    
    if (secuenciaJugador.length === secuencia.length) {
        desactivarBotones();
        if (ronda === MAX_RONDAS) { 
            terminarJuego(); 
        } else {
            setTimeout(siguienteRonda, 1000); 
        }
    }
}

 
function terminarJuego() {
    Swal.fire({
      icon: "success",
      title: "¡Felicitaciones!",
      text: "Completaste la secuencia correctamente. ¡Ganaste!",
      confirmButtonText: "Aceptar"
    }) 
  }

  function manejarError() {
    Swal.fire({
      icon: "error",
      title: "¡Oh no!",
      text: "Te equivocaste en la secuencia. ¿Querés intentarlo de nuevo?",
      showCancelButton: true,
      confirmButtonText: "Reintentar",
      cancelButtonText: "Salir"
    }).then((result) => {
      if (result.isConfirmed) {
        iniciarJuego(); 
      } else {
        Swal.fire({
          title: "Gracias por jugar",
          text: "Podés volver cuando quieras.",
          icon: "info"
        });
      }
    });
  }
  
  

 
