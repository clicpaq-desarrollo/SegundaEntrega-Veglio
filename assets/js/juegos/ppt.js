
/**
 * JUEGO PIEDRA PAPEL TIJERA
 */
function ppt() {
    let piedra = 1;
    let papel = 2;
    let tijera = 3;
    
    let eleccionIA = numeroAleatorio(1, 3);
    console.log("La computadora eligió: " + eleccionIA);
    let eleccionUsuario = parseInt(prompt(
      "Elige una opción(número):\n 1: Piedra 🗿\n 2: Papel 📃\n 3: Tijera ✂"
    ));
  
    
    while (isNaN(eleccionUsuario) || eleccionUsuario < 1 || eleccionUsuario > 3) {
      alert("Opción inválida. Por favor, elige un número entre 1 y 3.");
      eleccionUsuario = parseInt(prompt("Elige una opción(numero):\n 1: Piedra 🗿\n 2: Papel 📃\n 3: Tijera ✂"));
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