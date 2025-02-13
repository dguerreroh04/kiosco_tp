window.onload = function() {
    const id_usuario = obtener_id_comprador()
    if (!id_usuario) {
        alert("No hay sesión iniciada, inicie sesion o cree un usuario.")
        location.replace('http://127.0.0.1:5500/frontend/html/inicio_cuenta.html')
    }
    saludo_usuario();
    showCarrito();
}

function obtener_id_comprador() {
    return sessionStorage.getItem("id_usuario");
}

function saludo_usuario() {
    const id_usuario = obtener_id_comprador()
    fetch(`http://localhost:3000/api/v1/usuarios/${id_usuario}`)
    .then(response => response.json())
    .then(usuario => {
        console.log(usuario)
        let container = document.getElementById('saludo_usuario');
        let saludo = document.createElement('div')
        saludo.innerHTML = ` 
            <p style="font-size: large; font-weight: bold;" >Hola ${usuario.nombre}!</p>
        `;
        container.appendChild(saludo);
    })
}

function showCarrito() {
    let container = document.getElementById('lista_productos');
    let totalCarrito = document.getElementById('total_carrito');
    let total = 0;
    const id_comprador = obtener_id_comprador()
    fetch(`http://localhost:3000/api/v1/productos_seleccionados/${id_comprador}`)
    .then(response => response.json())
    .then(productos => {
        console.log(productos);
        container.innerHTML = '<h2 class="titulo_carrito" >Tu Carrito</h2>';

        productos.forEach(producto => {
            total += producto.producto.precio_unidad * producto.cantidad;
            let productoDiv = document.createElement('div')
            productoDiv.classList.add('card', 'border-success', 'mb-3', 'card-carrito');
            productoDiv.style.width = '700px';
            productoDiv.innerHTML = `
                <img src="${producto.producto.imagen}" alt="Producto" style="width: 150px; grid-area: img;">
                <h5 class="card-title nombre" style="grid-area: nombre;">${producto.producto.nombre}</h5>
                <h5 class="card-text precio" style="grid-area: precio;">$${producto.producto.precio_unidad}</h5>
                <div class="contador">
                    <button type=button class="disminuir" onclick="disminuir_producto(${producto.id}, ${producto.cantidad})">-</button>
                    <div class="valor">${producto.cantidad}</div>
                    <button type=button class="aumentar" onclick="aumentar_producto(${producto.id}, ${producto.cantidad})">+</button>
                </div>
                <p class="card-text descripcion" style="grid-area: descripcion;">${producto.producto.descripcion}</p>
                <button type="button" class="btn btn-danger" style="grid-area: btn;" onclick="eliminar_del_carrito(${producto.id}, ${producto.id_comprador})">Eliminar</button>
            `;
            container.appendChild(productoDiv);
        });
        totalCarrito.textContent = '$' + total;
    })
    .catch(error => console.error("Error al obtener el carrito", error));
}

function disminuir_producto(id_producto, cantidad) {
    if (parseInt(cantidad) === 1) {
        return alert("La cantidad del producto no puede ser menor que 1")
    }
    fetch('http://localhost:3000/api/v1/productos_seleccionados/' + id_producto, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cantidad: parseInt(cantidad - 1)
        })
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        showCarrito()
    })
}

function aumentar_producto(id_producto, cantidad) {
    fetch('http://localhost:3000/api/v1/productos_seleccionados/' + id_producto, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cantidad: parseInt(cantidad + 1)
        })
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        showCarrito()
    })
}

function eliminar_del_carrito(id_producto, id_comprador) {
    fetch(`http://localhost:3000/api/v1/productos_seleccionados/${id_comprador}/${id_producto}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        showCarrito()
    })
}

function confirmar_compra() {
    const metodo_pago = document.querySelector('input[name="flexRadioDefault"]:checked');
    const id_comprador = obtener_id_comprador()
    if (!metodo_pago) {
        alert("Seleccione un método de pago!");
        return;
    }
    let lista_productos = " "
    fetch(`http://localhost:3000/api/v1/productos_seleccionados/${id_comprador}`)
    .then(response => response.json())
    .then(productos => {
        if (productos.length === 0) {
            alert("El carrito esta vacio");
            return;
        }
        let total = 0
        productos.forEach(producto => {
            total += (parseInt(producto.producto.precio_unidad) * producto.cantidad)
            lista_productos += producto.producto.nombre + " X" + producto.cantidad + " "
        })
        fetch('http://localhost:3000/api/v1/ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_comprador: parseInt(id_comprador),
                nombre_kiosco: 'Kiosco Informatico',
                domicilio: 'Paseo Colon 850',
                forma_pago: metodo_pago.nextElementSibling.textContent.trim(),
                total: total,
                productos_comprados: lista_productos
            }) 
        })
        .then(response => response.json())
        .then(data => {
            console.log("Ticket creado", data);
            document.getElementById("alert").style.display = "flex";
            return fetch(`http://localhost:3000/api/v1/productos_seleccionados/${obtener_id_comprador()}`, { method: 'DELETE' });
        })
        .then(() => showCarrito())
        .catch(error => console.error("Error al generar ticket", error));
    })
    .catch(error => console.error("Error al generar carrito", error))
}