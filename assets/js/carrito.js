document.addEventListener("DOMContentLoaded", () => {
  inicializarLogout();
  mostrarCarrito();
  actualizarContadorCarrito();
});

function mostrarCarrito() {
  const carritoContainer = document.getElementById("carritoContainer");
  if (!carritoContainer) return;

  const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
  carritoContainer.innerHTML = "";

  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

   
  const table = document.createElement("table");
  table.classList.add("table", "table-dark", "table-hover");

   
  const thead = document.createElement("thead");
  thead.innerHTML = `
        <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acción</th>
        </tr>
    `;
  table.appendChild(thead);

   
  const tbody = document.createElement("tbody");

  carrito.forEach((juego, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${juego.nombre}</td>
            <td>$${parseFloat(juego.precio).toLocaleString()}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${
                  juego.id
                })"><i class="fa fa-trash"></i></button>
            </td>
        `;

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  carritoContainer.appendChild(table);

   
  const total = carrito.reduce(
    (sum, juego) => sum + parseFloat(juego.precio),
    0
  );
  const totalElement = document.createElement("p");
  totalElement.innerHTML = `<strong>Total: $${total.toLocaleString()}</strong>`;
  totalElement.classList.add("mt-3");

  carritoContainer.appendChild(totalElement);
   
  const botonesContainer = document.createElement("div");
  botonesContainer.classList.add("d-flex", "justify-content-between", "mt-3");

  botonesContainer.innerHTML = `
    <button class="btn btn-success" onclick="confirmarCompra()">Confirmar Compra</button>
    <button class="btn btn-warning" onclick="confirmarVaciarCarrito()">Vaciar Carrito</button>
`;

  carritoContainer.appendChild(botonesContainer);
}

function eliminarDelCarrito(juegoId) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "El juego será eliminado del carrito.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
       
      let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
      carrito = carrito.filter((juego) => juego.id !== juegoId);
      sessionStorage.setItem("carrito", JSON.stringify(carrito));

       
      Toastify({
        text: "Juego eliminado del carrito.",
        duration: 3000,
        gravity: "top",  
        position: "right",  
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
      }).showToast();

       
      mostrarCarrito();
      actualizarContadorCarrito();
    }
  });
}

function confirmarVaciarCarrito() {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Se eliminarán todos los juegos del carrito.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, vaciar carrito",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      vaciarCarrito();
      Toastify({
        text: "Carrito vaciado exitosamente.",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
      }).showToast();
    }
  });
}

function vaciarCarrito() {
  sessionStorage.removeItem("carrito");
  mostrarCarrito();
  actualizarContadorCarrito();
}

function confirmarCompra() {
    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Carrito vacío',
            text: 'Agrega juegos al carrito antes de confirmar la compra.'
        });
        return;
    }

    const juegosComprados = usuarioData.juegosComprados || [];
    
     
    const juegosDuplicados = carrito.filter(juego =>
        juegosComprados.some(comprado => comprado.id === juego.id)
    );

    if (juegosDuplicados.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Juego ya comprado',
            text: `Ya tienes el/los siguiente(s) juego(s): ${juegosDuplicados.map(j => j.nombre).join(", ")}.`
        });
        return;
    }

     
    const totalCompra = carrito.reduce((acc, item) => acc + parseFloat(item.precio), 0);

    if (usuarioData.saldo >= totalCompra) {
        const usuario = new Usuario(usuarioData.nombre, usuarioData.apellido, usuarioData.edad);
        usuario.setDinero(usuarioData.saldo);

        if (usuario.debitar(totalCompra)) {
            usuarioData.saldo = usuario.getDinero();
            usuarioData.juegosComprados = [...usuarioData.juegosComprados, ...carrito];
            sessionStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioData));
            sessionStorage.removeItem("carrito");

            Toastify({
                text: "Compra realizada con éxito. Juegos agregados a tu biblioteca.",
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)"
                }
            }).showToast();

            window.location.href = 'misJuegos.html';  
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Saldo insuficiente',
            text: 'No tienes suficiente saldo para completar la compra.'
        });
    }
}


function agregarAlCarrito(juego) {
  if (!verificarAutenticacion()) return;

  let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
  if (carrito.some(item => item.id === juego.id)) {
      Toastify({
          text: "El juego ya está en el carrito.",
          duration: 3000,
          gravity: "bottom",
          position: "center",
          style: {
              background: "linear-gradient(to right, #ff5f6d, #ffc371)"
          }
      }).showToast();
      return;
  }

  carrito.push({
      id: juego.id,
      nombre: juego.nombre,
      precio: parseFloat(juego.precio),
      imagen: juego.imagen || 'default.jpg',
      url: juego.url || ''
  });
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  Toastify({
      text: "Juego agregado al carrito.",
      duration: 3000,
      gravity: "bottom",
      position: "center",
      style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)"
      }
  }).showToast();
  actualizarContadorCarrito();
}