window.onload = function() {
    showCarrito();
}

function showCarrito() {
    let container = document.getElementById('lista_productos');

    fetch('http://localhost:3000/api/v1/')
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