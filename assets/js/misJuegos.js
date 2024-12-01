/**
 * Muestra los juegos comprados por el usuario autenticado.
 * Obtiene los datos desde `sessionStorage` y los renderiza como cartas en el contenedor.
 */
function mostrarMisJuegos() {
    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));  
    const misJuegosContainer = document.getElementById("misJuegosContainer");  

    console.log("Juegos comprados:", usuarioData.juegosComprados);  

    misJuegosContainer.innerHTML = "";  

     
    if (usuarioData.juegosComprados.length === 0) {
        misJuegosContainer.innerHTML = "<h2 class='text-light'>No tienes juegos comprados.</h2>";
        return;  
    }

     
    usuarioData.juegosComprados.forEach(juegoData => {
         
        const juego = new Juego(
            juegoData.nombre,
            juegoData.descripcion,
            juegoData.precio,
            juegoData.genero,
            juegoData.imagen,
            juegoData.url
        );

        const url = juego.getUrl() || '#';  
        
         
        const card = document.createElement("div");
        card.classList.add("col");  

         
        card.innerHTML = `
            <div class="card">
                <img src="./assets/images/${juego.imagen}.jpg" class="card-img-top" alt="${juego.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${juego.nombre}</h5>
                    <span class="badge bg-warning text-dark">${juego.genero}</span>
                    <p class="card-text mt-2">${juego.descripcion}</p>
                    <a class="btn btn-primary mt-3" href="./juegos/${url}">Jugar</a>
                </div>
            </div>`;

        misJuegosContainer.appendChild(card);  
    });
}

/**
 * Evento que se ejecuta al cargar el DOM.
 * - Inicializa el botón de logout.
 * - Muestra los juegos comprados por el usuario.
 */
document.addEventListener("DOMContentLoaded", mostrarMisJuegos);

document.addEventListener("DOMContentLoaded", () => {
    inicializarLogout();  
    mostrarMisJuegos();  
});
