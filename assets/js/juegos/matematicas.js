document.addEventListener("DOMContentLoaded", () => {
    const btnResponder = document.getElementById("btnResponder");
    const btnIniciar = document.getElementById("btnIniciar");
    const inputRespuesta = document.getElementById("respuestaUsuario");
    const operacionTexto = document.getElementById("operacion");
    const timerDisplay = document.getElementById("timer");
    const puntajeDisplay = document.getElementById("puntaje");
  
    let puntaje = 0;
    let tiempoRestante = 30;
    let operacionActual;
    let intervaloTiempo = null;
  
    const operaciones = ["+", "-", "*"];
  
    function iniciarJuego() {
      puntaje = 0;
      tiempoRestante = 30;
  
      puntajeDisplay.textContent = `Puntaje: ${puntaje}`;
      timerDisplay.textContent = `Tiempo restante: ${tiempoRestante}s`;
      operacionTexto.textContent = "¡Resolvamos!";
  
      inputRespuesta.classList.remove("d-none");
      btnResponder.classList.remove("d-none");
      btnIniciar.classList.add("d-none");
  
      generarOperacion();
      intervaloTiempo = setInterval(actualizarTiempo, 1000);  
    }
  
    function generarOperacion() {
      const num1 = numeroAleatorio(1, 10);
      const num2 = numeroAleatorio(1, 10);
      const operador = operaciones[numeroAleatorio(0, 2)];
  
      operacionActual = {
        num1,
        num2,
        operador,
        resultado: eval(`${num1} ${operador} ${num2}`)  
      };
  
      operacionTexto.textContent = `${num1} ${operador} ${num2} = ?`;
    }
  
    function actualizarTiempo() {
      if (tiempoRestante > 0) {
        tiempoRestante--;
        timerDisplay.textContent = `Tiempo restante: ${tiempoRestante}s`;
      } else {
        clearInterval(intervaloTiempo);
        finalizarJuego();
      }
    }
  
    function finalizarJuego() {
      inputRespuesta.classList.add("d-none");
      btnResponder.classList.add("d-none");
      btnIniciar.classList.remove("d-none");
  
      Swal.fire({
        title: "¡Tiempo agotado!",
        text: `Tu puntaje final es: ${puntaje}`,
        icon: "info",
        confirmButtonText: "Jugar de nuevo"
      }).then(() => {
        btnIniciar.classList.remove("d-none");
      });
    }
  
    function procesarRespuesta() {
      const respuestaUsuario = parseInt(inputRespuesta.value);
  
      if (isNaN(respuestaUsuario)) {
        Swal.fire({
          title: "Respuesta inválida",
          text: "Por favor, ingresa un número.",
          icon: "error",
          confirmButtonText: "Entendido"
        });
        return;
      }
  
      if (respuestaUsuario === operacionActual.resultado) {
        puntaje++;
        puntajeDisplay.textContent = `Puntaje: ${puntaje}`;
        Swal.fire({
          title: "¡Correcto!",
          text: "Has acertado.",
          icon: "success",
          timer: 1000,
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          title: "Incorrecto",
          text: "Intenta con otra operación.",
          icon: "error",
          timer: 1000,
          showConfirmButton: false
        });
      }
  
      inputRespuesta.value = "";  
      inputRespuesta.focus();  
      generarOperacion();  
    }
  
    btnResponder.addEventListener("click", procesarRespuesta);
  
    inputRespuesta.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        procesarRespuesta();  
      }
    });
  
    btnIniciar.addEventListener("click", iniciarJuego);
  
    function numeroAleatorio(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  });
  