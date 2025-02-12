function crear(){
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const mail = document.getElementById("mail").value;
    const nro_tel = document.getElementById("nro_tel").value;
    const dni = document.getElementById("dni").value;
    const contrasenia = document.getElementById("contraseña").value;

    const datosUsuario = {nombre, edad, mail, nro_tel, dni, contrasenia};

    const respuesta = fetch('http://localhost:3000/api/v1/usuarios', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje !== 'Usuario creado exitosamente, por favor verifique sus datos') {
            alert(data.mensaje);
        } else {
            alert(data.mensaje);
            sessionStorage.setItem("id_usuario", data.id);
            window.location.href = "inicio.html";
        }
    })
    .catch(error => console.error("Error al crear usuario:", error));
}