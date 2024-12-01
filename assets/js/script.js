/**
 * Carga la colección de juegos desde `localStorage`.
 * @returns {Array} - Array de juegos almacenados o un array vacío si no existen.
 */
function cargarJuegosDesdeLocalStorage() {
    return JSON.parse(localStorage.getItem("coleccion_juegos")) || [];
}

 
const card_juego = document.getElementById("card_juegos");

/**
 * Muestra las cartas de los juegos en el contenedor.
 * Genera cada carta y agrega eventos para manejar la acción de agregar al carrito.
 */
function mostrarJuegosCard() {
    const coleccion_juegos = cargarJuegosDesdeLocalStorage();  
    
    card_juego.innerHTML = "";  

     
    coleccion_juegos.forEach((juego) => {
        card_juego.appendChild(generarCardJuego(juego)); 
    });

     
    document.querySelectorAll(".btnAgregarCarrito").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();  
            const juegoId = parseInt(this.dataset.juegoId); // Obtener el ID del juego del atributo "data-juego-id".
            const juego = coleccion_juegos.find(j => j.id === juegoId); // Buscar el juego por su ID.
            agregarAlCarrito(juego);  
        });
    });
}

/**
 * Genera una carta HTML para un juego específico.
 * @param {Object} juego - Objeto con los datos del juego.
 * @returns {HTMLElement} - Elemento HTML de la carta del juego.
 */
function generarCardJuego(juego) {
    let card = document.createElement("div");  
    card.classList.add("col"); 
    card.classList.add("p-3"); 
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

/**
 * Inicializa el contenido de la página una vez que el DOM está cargado.
 * - Muestra un mensaje de bienvenida personalizado si el usuario está autenticado.
 * - Renderiza las cartas de los juegos en el contenedor.
 */
document.addEventListener("DOMContentLoaded", () => {
    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));  
    const welcomeTitle = document.getElementById("welcomeTitle");  

    if (welcomeTitle) { 
         
        welcomeTitle.innerHTML = usuarioData && usuarioData.nombre
            ? `BIENVENIDO <strong>${usuarioData.nombre.toUpperCase()}</strong> A`
            : "BIENVENIDOS A";
    }
    
    mostrarJuegosCard();  
});
