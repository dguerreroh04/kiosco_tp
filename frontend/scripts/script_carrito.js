window.onload = function() {
    showCarrito();
}

function showCarrito() {
    let container = document.getElementById('lista_productos');

    fetch('http://localhost:3000/api/v1/productos_seleccionados')
    .then(response => response.json())
    .then(productos => {
        console.log(productos);
        container.innerHTML = '';

        productos.forEach(producto => {
            let productoDiv = document.createElement('div')
            productoDiv.classList.add('card', 'border-success', 'mb-3', 'card-carrito');
            productoDiv.innerHTML = `
                <img src="${producto.producto.imagen}" alt="Producto" style="width: 180px; grid-area: img;">
                <h5 class="card-title nombre" style="grid-area: nombre;">${producto.producto.nombre}</h5>
                <h5 class="card-text precio" style="grid-area: precio;">${producto.producto.precio}</h5>
                <div class="contador">
                    <button class="disminuir">-</button>
                    <div class="valor">1</div>
                    <button class="aumentar">+</button>
                </div>
                <p class="card-text descripcion" style="grid-area: descripcion;">${producto.producto.descripcion}</p>
                <button type="button" class="btn btn-danger" style="grid-area: btn;" onclick="eliminar_del_carrito(${producto.id})">Eliminar</button>
            `;
            container.appendChild(productoDiv);
        });
    })
    .catch(error => console.error("Error al obtener el carrito", error));
}

function eliminar_del_carrito(id_producto) {
    alert('Borrando producto ' + id_producto);
    fetch('http://localhost:3000/api/v1/productos_seleccionados/' + id_producto, {
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

    if (!metodo_pago) {
        alert("Seleccione un método de pago!");
        return;
    }

    fetch('http://localhost:3000/api/v1/productos_seleccionados')
    .then(response => response.json())
    .then(productos => {
        if (productos.length === 0) {
            alert("El carrito esta vacio");
            return;
        }
        let total = productos.reduce((sum, producto) => sum + (producto.producto.precio * producto.cantidad), 0);
        let id_comprador = 1;
        fetch('http://localhost:3000/api/v1/ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_comprador: id_comprador,
                nombre_kiosco: 'Kiosco Informatico',
                Domicilio: 'Paseo Colon 850',
                forma_pago: metodo_pago.nextElementSibling.textContent.trim(),
                total: total
            }) 
        })
        .then(response => response.json())
        .then(data => {
            console.log("Ticket creado", data);
            document.getElementById("alert").style.display = "flex";
            return fetch('http://localhost:3000/api/v1/productos_seleccionados/vaciar', { method: 'DELETE' });
        })
        .then(() => showCarrito())
        .catch(error => console.error("Error al generar ticket", error));
    })
    .catch(error => console.error("Error al generar carrito", error))
}