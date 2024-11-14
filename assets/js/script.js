 function cargarJuegosDesdeLocalStorage() {
    return JSON.parse(localStorage.getItem("coleccion_juegos")) || [];
}
const card_juego = document.getElementById("card_juegos");

function mostrarJuegosCard() {
    const coleccion_juegos = cargarJuegosDesdeLocalStorage();
    card_juego.innerHTML = "";

    coleccion_juegos.forEach((juego) => {
        card_juego.appendChild(generarCardJuego(juego));
    });

    document.querySelectorAll(".btnAgregarCarrito").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const juegoId = parseInt(this.dataset.juegoId);
            const juego = coleccion_juegos.find(j => j.id === juegoId);
            agregarAlCarrito(juego);
        });
    });
}

function generarCardJuego(juego) {
    let card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
        <div class="card">
            <img src="./assets/images/${juego.imagen}.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${juego.nombre}</h5>
                <span class="badge text-bg-warning">${juego.genero}</span>
                <p class="card-text">${juego.descripcion}</p>
            </div>
            <div class="card-footer">
                <a href="#" class="btn btn-outline-warning btnAgregarCarrito" data-juego-id="${juego.id}">Agregar al carrito</a>
            </div>
        </div>`;
    return card;
}
document.addEventListener("DOMContentLoaded", () => {
    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));
    const welcomeTitle = document.getElementById("welcomeTitle");

    if (welcomeTitle) { 
        if (usuarioData && usuarioData.nombre) {
            welcomeTitle.textContent = `BIENVENIDO ${usuarioData.nombre.toUpperCase()} A`;
        } else {
            welcomeTitle.textContent = "BIENVENIDOS A";
        }
    }
});

document.addEventListener("DOMContentLoaded", mostrarJuegosCard);
