function numeroAleatorio(min, max) {
  return Math.round(Math.random() * (max - min) + min);
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
      jugadorNumero = parseInt(prompt("Introduce un número del 1 al 10"),10);
  
   
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
        alert("Perdiste ❌, se acabaron los intentos.\nEl número era: " + numero_secreto);
        break;
      }
    }
  }