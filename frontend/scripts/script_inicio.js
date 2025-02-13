window.onload = function() {
    const id_usuario = obtener_id_comprador()
    saludo_usuario();
    if (!id_usuario) {
        alert("No hay sesión iniciada, inicie sesion o cree un usuario.")
        location.replace('http://127.0.0.1:5500/frontend/html/inicio_cuenta.html')
    }
    showProducts();
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

function showProducts() {
    fetch('http://localhost:3000/api/v1/productos')
    .then(response => response.json())
    .then(productos => {
        console.log(productos);

        productos.forEach(producto => {
            let container = document.getElementById('container_' + producto.categoria);
            
            if (container) {
                let ul = container.querySelector('ul');
                let productoDiv = document.createElement('div');
                productoDiv.classList.add('card', 'border-info', 'mb-3');
                productoDiv.style.width = '200px';
                productoDiv.style.height = '365px';
                productoDiv.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 170px; height:200px;">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio_unidad}</p>
                    <p class="card-text">${producto.descripcion}</p>
                    <button type="button" class="btn btn-primary btn-prod" onclick="añadir_carrito(${producto.id})">Añadir al carrito</button>
                `;
                ul.appendChild(productoDiv);
            } else {
                console.error('Contenedor no encontrado')
            }
        });
    })
    .catch(error => console.error('Error al obtener productos', error));
}

function añadir_carrito(id_producto) {
    const id_usuario = obtener_id_comprador();

    if (!id_usuario) {
        alert("Debe iniciar sesión para añadir productos al carrito.");
        return;
    }
    fetch ('http://localhost:3000/api/v1/productos_seleccionados', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id_usuario: id_usuario,
            id_producto: id_producto,
            cantidad: 1
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje) {
            alert(data.mensaje);
        } else {
            console.log("Producto añadido al carrito:", data);
            alert("Producto añadido al carrito con exito");
        }
    })
    .catch(error => console.error("Error al añadir al carrito:", error));
}