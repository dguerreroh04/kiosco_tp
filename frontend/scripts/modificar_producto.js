window.onload = function() {
    saludo_usuario();
    mostrar_producto();
}

function obtener_id_usuario() {
    return sessionStorage.getItem("id_usuario");
}

function obtener_id_producto() {
    return sessionStorage.getItem("id_producto");
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

function mostrar_producto() {
    const id_producto = obtener_id_producto()
    fetch(`http://localhost:3000/api/v1/productos/${id_producto}`)
    .then(response => response.json())
    .then(producto => {
        console.log(producto)
        let container = document.getElementById('datos_producto');
        let productoDiv = document.createElement('div');
        productoDiv.classList.add('card', 'text-bg-secondary', 'mb-3');
        productoDiv.style.width = '100%';
        productoDiv.style.height = '200px';
        productoDiv.innerHTML = `
            <p class="card-title">NOMBRE: ${producto.nombre}</p>
            <p class="card-title">PRECIO: ${producto.precio_unidad}</p>
            <p class="card-title">DESCRIPCION: ${producto.descripcion}</p>
            <p class="card-title">NACIONAL: ${producto.nacional}</p>
            <p class="card-title">CATEGORIA: ${producto.categoria}</p>
        `;
        container.appendChild(productoDiv);
    })
}

function guardar() {
    const id_producto = obtener_id_producto()
    let nacional = document.querySelector('input[name="flexRadioDefault1"]:checked')
    if (nacional !== null) {
        nacional = nacional.nextElementSibling.textContent.trim()
    }
    let categoria = document.querySelector('input[name="flexRadioDefault2"]:checked')
    if (categoria !== null) {
        categoria = categoria.nextElementSibling.textContent.trim()
    }
    const datosActualizados = {
        nombre: nombre.value,
        precio: precio_unidad.value,
        descripcion: descripcion.value,
        nacional: nacional,
        categoria: categoria,
        url_imagen: imagen.value
    };
        //envio de datos
        fetch(`http://localhost:3000/api/v1/productos/${id_producto}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosActualizados),
        })
        .then(response => response.json())
        .then(data => {
            if (data.mensaje !== 'Producto modificado') {
                alert(data.mensaje || "Error al actualizar los datos")
            } else {
                alert(data.mensaje || "Datos actualizados correctamente");
                location.reload()
            }
        })
        .catch(error => console.error("Error al actualizar el producto", error));
}

function borrar() {
    if (!confirm("¿Estás seguro de que quieres eliminar el producto?")) {
        return;
    }
    const id_usuario = obtener_id_producto();

    
    fetch(`http://localhost:3000/api/v1/productos/${id_producto}`, {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje !== 'Producto borrado') {
            alert(data.mensaje);
        } else {
            alert(data.mensaje);
            sessionStorage.removeItem("id_producto"); 
            window.location.href = "inicio.html";
        }
    })
    .catch(error => console.error("Error al eliminar producto:", error));
}

