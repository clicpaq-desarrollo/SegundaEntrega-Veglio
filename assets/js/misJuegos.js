 function mostrarMisJuegos() {
    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));
    const misJuegosContainer = document.getElementById("misJuegosContainer");

    misJuegosContainer.innerHTML = "";

    if (usuarioData.juegosComprados.length === 0) {
        misJuegosContainer.innerHTML = "<h2 class='text-light' >No tienes juegos comprados.</h2 >";
        return;
    }

    usuarioData.juegosComprados.forEach(juego => {
        const card = document.createElement("div");
        card.classList.add("col");
        card.innerHTML = `
            <div class="card">
                <img src="./assets/images/${juego.imagen}.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${juego.nombre}</h5>
                    <p class="card-text">$${juego.precio}</p>
                    <button class="btn btn-primary" onclick="jugar(${juego.id})">Jugar</button>
                </div>
            </div>`;
        misJuegosContainer.appendChild(card);
    });
}


function jugar(juegoId) {
    switch(juegoId) {
        case 1: ppt(); break;
        case 2: numberSecret(); break;
        case 3: matematicas(); break;
    }
}


 document.addEventListener("DOMContentLoaded", mostrarMisJuegos);
