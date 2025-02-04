window.onload = function() {
    showProducts();
}
function showProducts() {
    fetch('http://localhost:3000/api/v1/productos')
    .then(response => response.json())
    .then(productos => {
        console.log(productos);

        productos.forEach(producto => {
            let container = document.getElementById('container_' + producto.categoria);
            let ul = container.querySelector('ul');
            let productoDiv = document.createElement('div');
            productoDiv.classList.add('card border-info mb-3');
            productoDiv.style.width = 'fit-content';
            productoDiv.style.height = 'min-content';
            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 180px;">
            <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.precio}</p>
                <p class="card-text">${producto.descripcion}</p>
                <button type="button" class="btn btn-primary" onclick="añadir_carrito()" >Añadir al carrito</button>
            `;
            ul.appendChild(productoDiv);
        });
    });
}