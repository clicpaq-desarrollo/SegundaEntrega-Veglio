function cargarUsuariosDesdeLocalStorage() {
    const usuariosData = JSON.parse(localStorage.getItem("coleccion_usuarios")) || [];

    return usuariosData.map(userData => {
        const usuario = Object.assign(new Usuario(), userData);
        if (userData.login) {
            const loginData = userData.login;
            const login = new Login(loginData.user, loginData.pass);
            usuario.login = login;
        }
        return usuario;
    });
}

function login(username, password) {
    const usuarios = cargarUsuariosDesdeLocalStorage();

    const usernameLower = username?.toLowerCase();  

    if (!usernameLower || !password) {
        Swal.fire({
            icon: "error",
            title: "Error de inicio de sesión",
            text: "Usuario o contraseña no pueden estar vacíos."
        });
        return false;
    }

    const usuario = usuarios.find(
        user => user.login?.user === usernameLower && user.login?.pass === password
    );

    if (usuario) {
        const usuarioData = {
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            saldo: usuario.dinero,
            nombreUsuario: usuario.login.user,
            juegosComprados: usuario.juegosComprados || []
        };

        sessionStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioData));

        return true;
    }

    Swal.fire({
        icon: "error",
        title: "Error de inicio de sesión",
        text: "Usuario o contraseña incorrectos."
    });

    return false;
}




function logout() {
    sessionStorage.removeItem("usuarioAutenticado");
    sessionStorage.removeItem("carrito");

    Toastify({
        text: "Sesión cerrada correctamente.",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #ff5f6d, #ffc371)"
        }
    }).showToast();

    window.location.href = "index.html";
}


function verificarAcceso(destino) {

    if (!verificarAutenticacion()) {
        return;
    }


    const redirecciones = {
        carrito: 'carrito.html',
        misJuegos: 'misJuegos.html',
        datosPersonales: 'datosPersonales.html'
    };


    window.location.href = redirecciones[destino] || 'index.html';
}


document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (login(username, password)) {
        bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
        Toastify({
            text: "¡Inicio de sesión exitoso!",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
        }).showToast();
        location.reload();

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: 'Usuario o contraseña incorrectos.',
            confirmButtonText: 'Reintentar'
        });
    }
});


document.getElementById("menuLogout")?.addEventListener("click", function (e) {
    e.preventDefault();
    Swal.fire({
        title: '¿Estás seguro de cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            logout();
            Toastify({
                text: "Sesión cerrada correctamente.",
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #ff5f6d, #ffc371)"
                }
            }).showToast();
            location.reload();

        }
    });
});




function registrarUsuario(nombre, apellido, edad, username, password, saldo = 0) {
    const usuariosData = cargarUsuariosDesdeLocalStorage();

    const usernameLower = username?.toLowerCase();  

    if (!usernameLower) {
        Swal.fire({
            icon: "error",
            title: "Error en el registro",
            text: "El nombre de usuario no puede estar vacío."
        });
        return;
    }

    if (usuariosData.some(user => user.login && user.login.user === usernameLower)) {
        Swal.fire({
            icon: "error",
            title: "Usuario ya registrado",
            text: "El nombre de usuario ya está en uso. Intenta con otro."
        });
        return;
    }

    const nuevoUsuario = new Usuario(nombre, apellido, edad);
    nuevoUsuario.setLogin(usernameLower, password);
    nuevoUsuario.setDinero(saldo);

    usuariosData.push(nuevoUsuario);

     
    localStorage.setItem("coleccion_usuarios", JSON.stringify(usuariosData));

    Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
        confirmButtonText: "Iniciar sesión"
    }).then(() => {
        window.location.href = "index.html";
    });
}




document.getElementById("registroForm")?.addEventListener("submit", function (e) {
    e.preventDefault();


    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = parseInt(document.getElementById("edad").value);
    const username = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;


    if (!username || !password || !nombre || !apellido || isNaN(edad)) {
        Swal.fire({
            icon: "error",
            title: "Campos obligatorios",
            text: "Por favor, completa todos los campos correctamente."
        });
        return;
    }

    if (password !== document.getElementById("confirmPassword").value) {
        Swal.fire({
            icon: "error",
            title: "Contraseñas no coinciden",
            text: "Asegúrate de ingresar la misma contraseña en ambos campos."
        });
        return;
    }


    registrarUsuario(nombre, apellido, edad, username, password);
});


 



document.getElementById("cartIcon")?.addEventListener("click", () => verificarAutenticacion());
document.getElementById("menuMisJuegos")?.addEventListener("click", () => verificarAcceso('misJuegos'));
document.getElementById("menuMisDatos")?.addEventListener("click", () => verificarAcceso('usuario'));
