 
function cargarUsuariosDesdeLocalStorage() {
    return JSON.parse(localStorage.getItem("coleccion_usuarios")) || [];
}

 function login(username, password) {
    const usuarios = cargarUsuariosDesdeLocalStorage();
    const usuario = usuarios.find(user => user.usuario === username && user.password === password);

    if (usuario) {
        const usuarioData = {
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            saldo: usuario.saldo,
            nombreUsuario: usuario.usuario,
            juegosComprados: usuario.juegosComprados || []
        };

        sessionStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioData));
        location.reload();
        return true;
    }
    return false;
}

function logout() {
    sessionStorage.removeItem("usuarioAutenticado");
    sessionStorage.removeItem("carrito");
    location.reload();
}

function verificarAutenticacion() {
    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));
    if (!usuarioData) {
        alert("Debes iniciar sesión para acceder a esta funcionalidad.");
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

function verificarAcceso(destino) {
    if (!verificarAutenticacion()) return;

    const redirecciones = {
        carrito: 'carrito.html',
        misJuegos: 'misJuegos.html',
        usuario: 'usuario.html'
    };
    
    window.location.href = redirecciones[destino] || 'index.html';
}

document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (login(username, password)) {
        bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
});

document.getElementById("logoutForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    logout();
});


function registrarUsuario(nombre, apellido, edad, usuario, password, saldo = 0) {
     const usuariosData = JSON.parse(localStorage.getItem("coleccion_usuarios")) || [];
    if (usuariosData.some(user => user.usuario === usuario)) {
        alert("Este usuario ya está registrado.");
        return;
    }

     const nuevoUsuario = {
        id: getNewId("user"),
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        usuario: usuario,
        password: password,
        saldo: saldo,
        juegosComprados: []
    };

     usuariosData.push(nuevoUsuario);
    localStorage.setItem("coleccion_usuarios", JSON.stringify(usuariosData));

    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    window.location.href = 'index.html';
}

document.getElementById("registroForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = parseInt(document.getElementById("edad").value);
    const username = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    if (!username || !password || !nombre || !apellido || isNaN(edad)) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    if (password !== document.getElementById("confirmPassword").value) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    registrarUsuario(nombre, apellido, edad, username, password);
});

function agregarAlCarrito(juego) {
    if (!verificarAutenticacion()) return;

    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    if (carrito.some(item => item.id === juego.id)) {
        alert("El juego ya está en el carrito.");
        return;
    }

    carrito.push({
        id: juego.id,
        nombre: juego.nombre,
        precio: parseFloat(juego.precio),
        imagen: juego.imagen || 'default.jpg'  
    });
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Juego agregado al carrito.");
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
function actualizarSaldo(monto) {
    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));
    usuarioData.saldo += monto;
    sessionStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioData));
}
function getNewId(type) {
    const counterKey = type === "user" ? "userIdCounter" : "gameIdCounter";
    let currentId = parseInt(localStorage.getItem(counterKey), 10) || 1;
    localStorage.setItem(counterKey, (currentId + 1).toString());
    return currentId;
}


document.getElementById("cartIcon")?.addEventListener("click", () => verificarAcceso('carrito'));
document.getElementById("menuMisJuegos")?.addEventListener("click", () => verificarAcceso('misJuegos'));
document.getElementById("menuMisDatos")?.addEventListener("click", () => verificarAcceso('usuario'));
