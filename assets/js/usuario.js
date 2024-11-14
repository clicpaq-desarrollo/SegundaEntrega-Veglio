document.addEventListener("DOMContentLoaded", () => {
    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));

    if (usuarioData) { 
        
        const cardUser = document.getElementById("cardUser");
        cardUser.innerHTML = `
            <div class="card-body">
                <div class="row">   
                    <div class="col-12 col-md-2">
                        <img src='./assets/images/user.webp' alt="user" class="img-fluid rounded rounded-circle">
                    </div>
                    <div class="col-12 col-md-9">
                        <h5 class="card-title">Usuario: ${usuarioData.nombreUsuario}</h5>
                        <h5 class="card-title">Nombre Completo: ${usuarioData.nombre} ${usuarioData.apellido}</h5> 
                        <p class="card-text">Saldo: $${usuarioData.saldo}</p>
                        <p class="card-text">Juegos Comprados:</p>
                        <ul>
                        ${usuarioData.juegosComprados.map(juego => `<li>${juego.nombre} - $${juego.precio}</li>`).join('')}
                        </ul>
                        <button class="btn btn-success mt-3" id="agregarSaldo"  data-bs-toggle="modal" data-bs-target="#agregarSaldoModal">Agregar Saldo</button>
                    </div>
                    <div class="col-12 col-md-1">
                    <i class="fas fa-edit mt-3" id="editarPerfil" data-bs-toggle="modal" data-bs-target="#editarPerfilModal" ></i>
                    </div>

                </div>
            </div>
        `;

        
        agregarSaldo();
    } else {
        
        window.location.href = "index.html";
    }
});


function agregarSaldo() {
    document.getElementById("agregarSaldoForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const saldo = parseFloat(document.getElementById("importeSaldo").value);
        if (saldo > 0 && document.getElementById("checkMayor").checked) {
            actualizarSaldo(saldo);  
            location.reload();
        } else {
            alert("Debes ingresar un monto válido y confirmar que eres mayor de 18 años.");
        }
    });
}


document.getElementById("editarPerfilForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const usuarioData = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));
    usuarioData.nombre = document.getElementById("nombre").value;
    usuarioData.apellido = document.getElementById("apellido").value;

    
    sessionStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioData));
    alert("Perfil actualizado");
 
    location.reload(); 
    mostrarUsuario(); 
    const perfilModal = document.getElementById("editarPerfilModal");
    const bootstrapModal = bootstrap.Modal.getInstance(perfilModal);
    bootstrapModal.hide();
});
