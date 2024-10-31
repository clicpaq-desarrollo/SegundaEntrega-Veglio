

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
      alert("¡Felicidades! Respondiste bien las 3 preguntas y ganaste el juego. 🏆");
    } else {
      alert("¡Juego terminado! 😢 No lograste responder correctamente las 3 preguntas.");
    }
  }