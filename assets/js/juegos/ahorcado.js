document.addEventListener("DOMContentLoaded", () => {
    const palabras = ["javascript", "ahorcado", "programa", "juego", "computadora"];
    const intentosMaximos = 6;
    let palabraAdivinar = "";
    let letrasAdivinadas = [];
    let errores = 0;

    const lienzoAhorcado = document.getElementById("lienzoAhorcado");
    const contenedorPalabra = document.getElementById("contenedorPalabra");
    const contenedorLetras = document.getElementById("contenedorLetras");
    const btnReiniciar = document.getElementById("btnReiniciar");

    const ctx = lienzoAhorcado.getContext("2d");

    function iniciarJuego() {
        palabraAdivinar = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
        letrasAdivinadas = [];
        errores = 0;

        dibujarBase();
        dibujarAhorcado(0);
        mostrarPalabra();
        mostrarLetras();
    }

    function dibujarBase() {
        ctx.clearRect(0, 0, lienzoAhorcado.width, lienzoAhorcado.height);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(10, 290), ctx.lineTo(190, 290); // Base
        ctx.moveTo(50, 290), ctx.lineTo(50, 10); // Poste
        ctx.moveTo(50, 10), ctx.lineTo(150, 10); // Brazo superior
        ctx.moveTo(150, 10), ctx.lineTo(150, 50); // Cuerda
        ctx.stroke();
    }

    function mostrarPalabra() {
        contenedorPalabra.innerHTML = palabraAdivinar
            .split("")
            .map(letra => (letrasAdivinadas.includes(letra) ? letra : "_"))
            .join(" ");
    }

    function mostrarLetras() {
        contenedorLetras.innerHTML = "";
        for (let i = 65; i <= 90; i++) {
            const botonLetra = document.createElement("button");
            botonLetra.textContent = String.fromCharCode(i);
            botonLetra.dataset.letra = String.fromCharCode(i);
            botonLetra.addEventListener("click", manejarClickLetra);
            botonLetra.classList.add("btn", "btn-secondary", "m-1");
            contenedorLetras.appendChild(botonLetra);
        }
    }

    function manejarClickLetra(event) {
        const letra = event.target.dataset.letra;
        event.target.classList.add("disabled");
        event.target.disabled = true;

        if (palabraAdivinar.includes(letra)) {
            letrasAdivinadas.push(letra);
            mostrarPalabra();
            if (palabraAdivinar.split("").every(letra => letrasAdivinadas.includes(letra))) {
                finalizarJuego(true);
            }
        } else {
            errores++;
            dibujarAhorcado(errores);
            if (errores >= intentosMaximos) {
                finalizarJuego(false);
            }
        }
    }

    function dibujarAhorcado(paso) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#000";
        ctx.beginPath();

        if (paso >= 1) ctx.arc(150, 80, 30, 0, Math.PI * 2); // Cabeza
        if (paso >= 2) ctx.moveTo(150, 110), ctx.lineTo(150, 200); // Cuerpo
        if (paso >= 3) ctx.moveTo(150, 130), ctx.lineTo(120, 170); // Brazo izquierdo
        if (paso >= 4) ctx.moveTo(150, 130), ctx.lineTo(180, 170); // Brazo derecho
        if (paso >= 5) ctx.moveTo(150, 200), ctx.lineTo(120, 250); // Pierna izquierda
        if (paso >= 6) ctx.moveTo(150, 200), ctx.lineTo(180, 250); // Pierna derecha

        ctx.stroke();
    }

    function finalizarJuego(ganado) {
        const mensaje = ganado
            ? "¡Felicidades, ganaste! 🎉"
            : `Lo siento, perdiste. La palabra era "${palabraAdivinar}".`;
        Swal.fire({
            title: ganado ? "¡Ganaste!" : "¡Perdiste!",
            text: mensaje,
            icon: ganado ? "success" : "error",
            confirmButtonText: "Jugar de nuevo"
        }).then(iniciarJuego);
    }

    btnReiniciar.addEventListener("click", iniciarJuego);

    iniciarJuego();
});
