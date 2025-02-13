// *Modificar datos*

window.onload = function() {
    const id_usuario = obtener_id_usuario()
    if (id_usuario) {
        saludo_usuario();
        mostrar_usuario();
        mostrar_tickets();
    } else {
        alert("No hay sesión iniciada, inicie sesion o cree un usuario.")
        location.replace('http://127.0.0.1:5500/frontend/html/inicio_cuenta.html')
    }
}

function obtener_id_usuario() {
    return sessionStorage.getItem("id_usuario");
}

function saludo_usuario() {
    const id_usuario = obtener_id_usuario()
    fetch(`http://localhost:3000/api/v1/usuarios/${id_usuario}`)
    .then(response => response.json())
    .then(usuario => {
        let container = document.getElementById('saludo_usuario');
        let saludo = document.createElement('div')
        saludo.innerHTML = ` 
            <p style="font-size: large; font-weight: bold;" >Hola ${usuario.nombre}!</p>
        `;
        container.appendChild(saludo);
    })
}

function mostrar_usuario() {
    const id_usuario = obtener_id_usuario()
    fetch(`http://localhost:3000/api/v1/usuarios/${id_usuario}`)
    .then(response => response.json())
    .then(usuario => {
        console.log(usuario)
        let container = document.getElementById('datos_usuario');
        let usuarioDiv = document.createElement('div');
        usuarioDiv.classList.add('card', 'text-bg-secondary', 'mb-3');
        usuarioDiv.style.width = '100%';
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

    const datosActualizados = {
        nombre: nombreInput.value,
        edad: edadInput.value,
        mail: mailInput.value,
        nro_tel: numTelInput.value,
        dni: dniInput.value,
        contrasenia: contraseniaInput.value
    };
        //envio de datos
        fetch(`http://localhost:3000/api/v1/usuarios/${idUsuario}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosActualizados),
        })
        .then(response => response.json())
        .then(data => {
            if (data.mensaje !== 'Los datos se han modificado') {
                alert(data.mensaje || "Error al actualizar los datos")
            } else {
                alert(data.mensaje || "Datos actualizados correctamente");
                location.reload()
            }
        })
        .catch(error => console.error("Error al crear usuario:", error));
}

// *Borrar cuenta*

function borrar() {
    if (!confirm("¿Estás seguro de que quieres eliminar tu cuenta?")) {
        return;
    }
    const id_usuario = obtener_id_usuario();

    
    fetch(`http://localhost:3000/api/v1/usuarios/${id_usuario}`, {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje !== 'El usuario ha sido eliminado') {
            alert(data.mensaje);
        } else {
            alert(data.mensaje);
            sessionStorage.removeItem("id_usuario"); 
            window.location.href = "inicio.html";
        }
    })
    .catch(error => console.error("Error al eliminar cuenta:", error));
}

function mostrar_tickets() {
    const id_usuario = obtener_id_usuario()
    fetch(`http://localhost:3000/api/v1/ticket/${id_usuario}`)
    .then(response => response.json())
    .then( tickets => {
        console.log(tickets)
        tickets.forEach(ticket => {
            let container_tickets = document.getElementById("container_ticket")
            let ticketDiv = document.createElement('div')
            ticketDiv.classList.add('card', 'text-bg-dark', 'mb-3');
            ticketDiv.style.width = '100%';
            ticketDiv.style.height = '100px';
            ticketDiv.innerHTML = `
                <p class="card-title">Fecha: ${ticket.fecha_venta.substring(0,10)}</p>
                <p class="card-title">Total: ${ticket.total}</p>
                <p class="card-title">Lista: ${ticket.productos_comprados}</p>
            `;
            container_tickets.appendChild(ticketDiv); 
        });  
    })
}

function cerrar_sesion() {
    sessionStorage.clear();
    window.location.href = "../html/inicio_cuenta.html";
 }
 