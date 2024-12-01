function mostrarUsuario() {
    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));
    const cardUser = document.getElementById("cardUser");

    if (!usuarioData || !cardUser) return;

    cardUser.innerHTML = `
        <div class="card-body">
            <div class="row">   
                <div class="col-12 col-md-2">
                    <img src='${usuarioData.imagen || "./assets/images/user.jpg"}' alt="user" class="img-fluid rounded rounded-circle img-perfil">
                </div>
                <div class="col-12 col-md-8">
                    <h5 class="card-title">Usuario: <strong> ${usuarioData.nombreUsuario} </strong></h5>
                    <h5 class="card-title">Nombre Completo:<strong> ${usuarioData.nombre} ${usuarioData.apellido}</strong></h5> 
                    <p class="card-text">Saldo:<strong> $${usuarioData.saldo}</strong></p>
                    <p class="card-text">Juegos Comprados:</p>
                    <ul>
                        ${usuarioData.juegosComprados.map(juego => `<li><strong>${juego.nombre}</strong> - $${juego.precio}</li>`).join('')}
                    </ul>
                    <button class="btn btn-success mt-3" onclick="agregarSaldo()">Agregar Saldo</button>
                </div>
                <div class="col-12 col-md-1">
                    <i class="fas fa-edit mt-3" id="editarPerfil" data-bs-toggle="modal" data-bs-target="#editarPerfilModal"></i>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarLogout(); 
    mostrarUsuario();
 
 
    const inputImagen = document.getElementById("nuevaImagen");
  const vistaPrevia = document.getElementById("vistaPrevia");

  inputImagen?.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
              vistaPrevia.src = event.target.result; 
          };
          reader.readAsDataURL(file);
      }
  });
});



function agregarSaldo() {
    Swal.fire({
        title: 'Agregar Saldo',
        html: `
            <label for="importeSaldo" class="form-label">Ingrese un monto</label>
            <input type="number" id="importeSaldo" class="form-control mb-3" placeholder="Monto a agregar">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="checkMayor">
                <label class="form-check-label" for="checkMayor">Confirmo que tengo más de 18 años</label>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const saldo = parseFloat(document.getElementById("importeSaldo").value);
            const esMayor = document.getElementById("checkMayor").checked;

            if (!saldo || saldo <= 0) {
                Swal.showValidationMessage('Debes ingresar un monto válido.');
                return false;
            }

            if (!esMayor) {
                Swal.showValidationMessage('Debes confirmar que eres mayor de 18 años.');
                return false;
            }

            return saldo; 
        }
    }).then((result) => {
        if (result.isConfirmed) {
            actualizarSaldo(result.value); 
            Toastify({
                text: `Se agregaron $${result.value.toLocaleString()} correctamente.`,
                duration: 3000,
                gravity: 'top',
                position: 'right',
                style: {
                    background: 'linear-gradient(to right, #00b09b, #96c93d)'
                }
            }).showToast();

            mostrarUsuario(); 
        }
    });
}



document.addEventListener("DOMContentLoaded", () => {
    inicializarLogout(); 
    mostrarUsuario();

    const inputImagen = document.getElementById("nuevaImagen");
    const vistaPrevia = document.getElementById("vistaPrevia");

    
    if (inputImagen && vistaPrevia) {
        inputImagen.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    vistaPrevia.src = event.target.result; 
                };
                reader.readAsDataURL(file);
            } else {
                vistaPrevia.src = "./assets/images/user.jpg"; 
            }
        });
    }
});

document.getElementById("editarPerfilForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));
    const inputImagen = document.getElementById("nuevaImagen");
    const file = inputImagen.files[0];
    const loader = document.getElementById("loader");

    usuarioData.nombre = document.getElementById("nombre").value;
    usuarioData.apellido = document.getElementById("apellido").value;

    
    loader.classList.remove("d-none");

    
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            usuarioData.imagen = event.target.result; 
            sessionStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioData));

            
            loader.classList.add("d-none");
            Swal.fire({
                title: 'Perfil actualizado',
                icon: 'success',
                showConfirmButton: true,
            }).then(() => {
                mostrarUsuario();
                cerrarModal();
            });
        };
        reader.readAsDataURL(file);
    } else {
        
        sessionStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioData));
        loader.classList.add("d-none");
        Swal.fire({
            title: 'Perfil actualizado',
            icon: 'success',
            showConfirmButton: true,
        }).then(() => {
            mostrarUsuario();
            cerrarModal();
        });
    }
});


function cerrarModal() {
    const perfilModal = document.getElementById("editarPerfilModal");
    const bootstrapModal = bootstrap.Modal.getInstance(perfilModal);
    bootstrapModal.hide();
}
