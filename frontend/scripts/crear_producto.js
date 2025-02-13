window.onload = function() {
    const id_usuario = obtener_id_comprador()
    if (!id_usuario) {
        alert("No hay sesión iniciada, inicie sesion o cree un usuario.")
        location.replace('http://127.0.0.1:5500/frontend/html/inicio_cuenta.html')
    }
}

function obtener_id_comprador() {
    return sessionStorage.getItem("id_usuario");
}

function crear(){
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio_unidad").value;
    console.log(precio)
    const descripcion = document.getElementById("descripcion").value;
    const nacional = document.querySelector('input[name="flexRadioDefault1"]:checked');
    const categoria = document.querySelector('input[name="flexRadioDefault2"]:checked');
    const imagen = document.getElementById("imagen").value;

    const datosProducto = {nombre, precio, descripcion, nacional, categoria, imagen};

    fetch('http://localhost:3000/api/v1/productos', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            precio: precio,
            descripcion: descripcion,
            nacional: nacional.nextElementSibling.textContent.trim(),
            categoria: categoria.nextElementSibling.textContent.trim(),
            imagen: imagen
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje !== 'Producto creado') {
            alert(data.mensaje);
        } else {
            alert(data.mensaje);
            sessionStorage.removeItem("id_producto");
            window.location.href = "inicio.html";
        }
    })
    .catch(error => console.error("Error al crear el producto:", error));
}