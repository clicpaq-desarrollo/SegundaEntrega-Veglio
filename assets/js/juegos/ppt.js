
/**
 * JUEGO PIEDRA PAPEL TIJERA
 */
function numeroAleatorio(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

document.addEventListener("DOMContentLoaded", () => {
  const btnPiedra = document.getElementById("btnPiedra");
  const btnPapel = document.getElementById("btnPapel");
  const btnTijera = document.getElementById("btnTijera");

  btnPiedra.addEventListener("click", () => jugarPPT(1)); // Piedra 🗿
  btnPapel.addEventListener("click", () => jugarPPT(2));  // Papel 📃
  btnTijera.addEventListener("click", () => jugarPPT(3)); // Tijera ✂
});

function jugarPPT(eleccionUsuario) {
  const piedra = 1, papel = 2, tijera = 3;
  const opciones = ["Piedra 🗿", "Papel 📃", "Tijera ✂"];
  const eleccionIA = numeroAleatorio(1, 3);

  let resultado;
  if (
      (eleccionUsuario === piedra && eleccionIA === tijera) ||
      (eleccionUsuario === papel && eleccionIA === piedra) ||
      (eleccionUsuario === tijera && eleccionIA === papel)
  ) {
      resultado = "win";
  } else if (eleccionUsuario === eleccionIA) {
      resultado = "draw";
  } else {
      resultado = "lose";
  }

  const mensajes = {
      win: { title: "¡Ganaste! 🎉", icon: "success" },
      draw: { title: "¡Empate!", icon: "info" },
      lose: { title: "¡Perdiste! ❌", icon: "error" }
  };

  Swal.fire({
      title: mensajes[resultado].title,
      text: `La computadora eligió: ${opciones[eleccionIA - 1]}`,
      icon: mensajes[resultado].icon,
      confirmButtonText: "Aceptar",
      backdrop: `
          rgba(0,0,0,0.8) 
          left top
          no-repeat
      `
  });
}
