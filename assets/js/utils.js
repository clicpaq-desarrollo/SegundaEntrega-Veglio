
function generateId(type) {
    const key = `${type}IdCounter`; 
    const currentId = parseInt(localStorage.getItem(key)) || 1; 
    localStorage.setItem(key, currentId + 1); 
    return currentId; 
}


function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value)); 
}


function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || []; 
}


function actualizarSaldo(monto) {
    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado")); 
    if (usuarioData) { 
        usuarioData.saldo += monto; 
        sessionStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioData)); 
    }
}


function actualizarContadorCarrito() {
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || []; 
    const cartCountElement = document.getElementById("cartCount"); 

    if (!cartCountElement) return; 

    if (carrito.length > 0) { 
        cartCountElement.textContent = carrito.length; 
        cartCountElement.style.display = "inline-block"; 
    } else {
        cartCountElement.style.display = "none"; 
    }
}


function verificarAutenticacion() {
    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado")); 
    if (!usuarioData) { 
        Swal.fire({ 
            icon: "warning",
            title: "Acceso denegado",
            text: "Debes iniciar sesión para acceder a esta funcionalidad.",
            confirmButtonText: "OK",
        }) 
        return false; 
    }
    return true; 
}


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
 
document.addEventListener("DOMContentLoaded", () => {
    const menuMisJuegos = document.getElementById("menuMisJuegos");
    const menuMisDatos = document.getElementById("menuMisDatos");
    const menuCarrito = document.getElementById("cartIcon");

     menuMisJuegos?.addEventListener("click", (e) => {
        e.preventDefault(); 
        verificarAcceso('misJuegos');
    });

    menuMisDatos?.addEventListener("click", (e) => {
        e.preventDefault(); 
        verificarAcceso('datosPersonales');
    });

    menuCarrito?.addEventListener("click", (e) => {
        e.preventDefault(); 
        verificarAcceso('carrito');
    });
});
 

