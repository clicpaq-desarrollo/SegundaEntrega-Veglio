/**
 * Actualiza el saldo del usuario autenticado en `sessionStorage`.
 * @param {number} monto - Cantidad a agregar al saldo.
 */
function actualizarSaldo(monto) {
    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado")); 
    if (usuarioData) { 
        usuarioData.saldo += monto; 
        sessionStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioData)); 
    }
}

/**
 * Actualiza el contador de elementos en el carrito y lo muestra/oculta según corresponda.
 */
function actualizarContadorCarrito() {
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || []; 
    const cartCountElement = document.getElementById("cartCount"); 

    if (!cartCountElement) return; // Si no existe el elemento, salir.

    if (carrito.length > 0) { 
        cartCountElement.textContent = carrito.length; 
        cartCountElement.style.display = "inline-block"; 
    } else {
        cartCountElement.style.display = "none"; 
    }
}

/**
 * Verifica si el usuario está autenticado.
 * @returns {boolean} - Devuelve `true` si está autenticado, de lo contrario muestra una alerta y devuelve `false`.
 */
function verificarAutenticacion() {
    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado")); 
    if (!usuarioData) { 
        Swal.fire({ 
            icon: "warning",
            title: "Acceso denegado",
            text: "Debes iniciar sesión para acceder a esta funcionalidad.",
            confirmButtonText: "OK",
        });
        return false; 
    }
    return true; 
}

/**
 * Inicializa el evento para cerrar sesión al hacer clic en el botón correspondiente.
 */
function inicializarLogout() {
    const btnSalir = document.getElementById("menuLogout"); 
    if (!btnSalir) return;  

    btnSalir.addEventListener("click", (e) => { 
        e.preventDefault(); 
        Swal.fire({ 
            title: '¿Estás seguro de cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) { 
                logout();  
            }
        });
    });
}

/**
 * Añade eventos para redirigir a las páginas de juegos, datos personales o carrito
 * solo si el usuario está autenticado.
 */
document.addEventListener("DOMContentLoaded", () => {
    const menuMisJuegos = document.getElementById("menuMisJuegos");
    const menuMisDatos = document.getElementById("menuMisDatos");
    const menuCarrito = document.getElementById("cartIcon");

    // Verifica acceso y redirige a "Mis Juegos".
    menuMisJuegos?.addEventListener("click", (e) => {
        e.preventDefault(); 
        verificarAcceso('misJuegos');
    });

    // Verifica acceso y redirige a "Datos Personales".
    menuMisDatos?.addEventListener("click", (e) => {
        e.preventDefault(); 
        verificarAcceso('datosPersonales');
    });

    // Verifica acceso y redirige al "Carrito".
    menuCarrito?.addEventListener("click", (e) => {
        e.preventDefault(); 
        verificarAcceso('carrito');
    });
});
