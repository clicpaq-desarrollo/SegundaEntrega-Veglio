document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
    actualizarContadorCarrito();
});

 
function mostrarCarrito() {
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    const carritoContainer = document.getElementById("carritoContainer");
    carritoContainer.innerHTML = "";

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        actualizarContadorCarrito();
        return;
    }

    let total = carrito.reduce((sum, juego) => sum + parseFloat(juego.precio), 0);

    carrito.forEach(juego => {
        const juegoElement = document.createElement("div");
        juegoElement.classList.add("carrito-item");
        juegoElement.innerHTML = `
            <p>${juego.nombre} - $${parseFloat(juego.precio).toLocaleString()}
            <button onclick="eliminarDelCarrito(${juego.id})" class="btn btn-danger">Eliminar</button></p>
        `;
        carritoContainer.appendChild(juegoElement); 
    });

    const totalElement = document.createElement("p");
    totalElement.innerHTML = `<strong>Total: $${total.toLocaleString()}</strong>`;
    carritoContainer.appendChild(totalElement);

    const botonesContainer = document.createElement("div");
    botonesContainer.innerHTML = `
        <button onclick="confirmarCompra()" class="btn btn-success mt-3">Confirmar Compra</button>
        <button onclick="confirmarVaciarCarrito()" class="btn btn-warning mt-3">Vaciar Carrito</button>
    `;
    carritoContainer.appendChild(botonesContainer);

    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
     const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    const cartCountElement = document.getElementById("cartCount");

     const itemCount = carrito.length;
    if (itemCount > 0) {
        cartCountElement.textContent = itemCount;
        cartCountElement.style.display = "inline-block";  
    } else {
        cartCountElement.style.display = "none";  
    }
}


function eliminarDelCarrito(juegoId) {
    if (confirm("¿Estás seguro de que deseas eliminar este juego del carrito?")) {
        let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
        carrito = carrito.filter(juego => juego.id !== juegoId);
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
        actualizarContadorCarrito();  
    }
}

function confirmarVaciarCarrito() {
    if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        vaciarCarrito();
    }
}

function vaciarCarrito() {
    sessionStorage.removeItem("carrito");
    mostrarCarrito();
    actualizarContadorCarrito();  
}


function confirmarCompra() {
    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    const totalCompra = carrito.reduce((acc, item) => acc + parseFloat(item.precio), 0);

    if (usuarioData.saldo >= totalCompra) {
        usuarioData.saldo -= totalCompra;
        usuarioData.juegosComprados = [...usuarioData.juegosComprados, ...carrito];
        sessionStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioData));
        sessionStorage.removeItem("carrito");
        alert("Compra realizada con éxito. Juegos agregados a tu biblioteca.");
        window.location.href = 'misJuegos.html';
    } else {
        alert("Saldo insuficiente para completar la compra.");
    }
}
 
function agregarAlCarrito(juego) {
    if (verificarAutenticacion()) {
        let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
        if (!carrito.some(item => item.id === juego.id)) {
            carrito.push(juego);
            sessionStorage.setItem("carrito", JSON.stringify(carrito));
            alert("Juego agregado al carrito.");
            actualizarContadorCarrito();  
        } else {
            alert("Este juego ya está en tu carrito.");
        }
    }
}