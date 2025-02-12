window.onload = function() {
    mostrar_usuario();
}

function obtener_id_usuario() {
    return sessionStorage.getItem("id_usuario");
}

function mostrar_usuario() {
    const id_usuario = obtener_id_usuario()
    fetch(`http://localhost:3000/api/v1/usuarios/${id_usuario}`)
    .then(response => response.json())
    .then(usuario => {
        console.log(usuario)
        let container = document.getElementById('datos_usuario');
        let usuarioDiv = document.createElement('div');
        usuarioDiv.classList.add('card', 'border-info', 'mb-3');
        usuarioDiv.style.width = '500px';
        usuarioDiv.style.height = '160px';
        usuarioDiv.innerHTML = `
            <p class="card-title">NOMBRE: ${usuario.nombre}</p>
            <p class="card-title">EDAD: ${usuario.edad}</p>
            <p class="card-title">MAIL: ${usuario.mail}</p>
            <p class="card-title">TELEFONO: ${usuario.nro_tel}</p>
            <p class="card-title">DNI: ${usuario.dni}</p>
        `;
        container.appendChild(usuarioDiv);
    })
}

function guardar() {
    const idUsuario = obtener_id_usuario();
    //actulizaacion de datos
    document.getElementById("guardarBtn").addEventListener("click", async function (event) {
        event.preventDefault();

        const datosActualizados = {
            nombre: nombreInput.value,
            edad: edadInput.value,
            mail: mailInput.value,
            nro_tel: numTelInput.value,
            dni: dniInput.value,
            contrasenia: contraseniaInput.value
        };

        try {
            //envio de datos
            const response = await fetch(`http://localhost:3000/api/v1/usuarios/${idUsuario}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datosActualizados),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.mensaje || "Datos actualizados correctamente");
            } else {
                alert(data.mensaje || "Error al actualizar los datos");
            }
        } catch (error) {
            console.error("Error al actualizar los datos ", error);
            alert('Hubo un problema al actualizar los datos de tu cuenta.');
        }
    });
};
