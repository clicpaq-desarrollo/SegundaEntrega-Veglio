document.addEventListener("DOMContentLoaded", () => {
  const btnAdivinar = document.getElementById("btnAdivinar");
  const inputNumero = document.getElementById("numeroUsuario");
  const resultado = document.getElementById("resultado");
  const intentosDisplay = document.getElementById("intentos");

  const numeroCorrecto = numeroAleatorio(1, 10);  
  let intentos = 0;

  btnAdivinar.addEventListener("click", () => {
      const numeroUsuario = parseInt(inputNumero.value);

      if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 10) {
          Swal.fire({
              title: "Número inválido",
              text: "Por favor, ingresa un número entre 1 y 10.",
              icon: "error",
              confirmButtonText: "Entendido"
          });
          return;
      }

      intentos++;
      if (numeroUsuario === numeroCorrecto) {
          Swal.fire({
              title: "¡Felicidades! 🎉",
              text: `Adivinaste el número en ${intentos} intentos.`,
              icon: "success",
              confirmButtonText: "Jugar de nuevo"
          }).then(() => {
              location.reload();  
          });
      } else if (numeroUsuario < numeroCorrecto) {
          resultado.textContent = "El número es mayor.";
      } else {
          resultado.textContent = "El número es menor.";
      }

      intentosDisplay.textContent = `Intentos: ${intentos}`;
      inputNumero.value = "";  
  });

  function numeroAleatorio(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});
