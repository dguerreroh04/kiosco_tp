window.onload = function() {
    const id_usuario = obtener_id_comprador()
    if (!id_usuario) {
        alert("No hay sesión iniciada, inicie sesion o cree un usuario.")
        location.replace('http://127.0.0.1:5500/frontend/html/inicio_cuenta.html')
    }
    showProducts();
    saludo_usuario();
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
                let row = container.querySelector('.row');
                if (!row) {
                    console.error('Fila no encontrada dentro de', container);
                    return;
                }
                row.classList.add("g-3");
                let colDiv = document.createElement('div');
                colDiv.classList.add('col-lg-2', 'col-md-4', 'col-sm-6', 'p-2');
                let productoDiv = document.createElement('div');
                productoDiv.classList.add('card', 'border-dark', 'mb-3');
                productoDiv.style.width = '200px';
                productoDiv.style.height = '395px';
                productoDiv.style.alignItems = 'center';
                productoDiv.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 170px; height:200px; object-fit: cover;">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio_unidad}</p>
                    <p class="card-text" style="height: 200px; overflow: hidden;">${producto.descripcion}</p>
                    <div style="display: flex; flex-direction: row; ">
                        <button type="button" class="btn btn-primary btn-prod" onclick="añadir_carrito(${producto.id})">Añadir al carrito</button>
                        <button type="button" class="btn btn-dark btn-prod" onclick="modificar_producto(${producto.id})">Editar Producto</button>
                    </div>
                `;
                colDiv.appendChild(productoDiv)
                row.appendChild(colDiv);
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


function obtener_id_producto() {
    return sessionStorage.getItem("id_producto");
}

//Para eliminar un producto
function borrar_producto(id_producto) {

    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) {
        return;
    }
    fetch (`http://localhost:3000/api/v1/productos/${id_producto}`,{
        method: "DELETE",
    })
    .then(response => response.json())
    .then(data =>{
        if(response.ok){
            alert(data.mensaje || "Se ha eliminado el producto")
            window.location.reload()
        }else{
            alert(data.mensaje || "No se pudo eliminar el producto")
        }
        window.reload
    })
}

//Para modificar un producto
function modificar_producto(id_producto){
    sessionStorage.removeItem("id_producto"); 
    sessionStorage.setItem("id_producto", id_producto);
    window.location.href = "modificar_producto.html";
}