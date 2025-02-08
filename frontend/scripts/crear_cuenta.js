function crear(){
    document.getElementById("guardarBtn").addEventListener("click", async function (event) {
        event.preventDefault(); 

        const nombre = document.getElementById("nombre").value;
        const edad = document.getElementById("edad").value;
        const mail = document.getElementById("mail").value;
        const nro_tel = document.getElementById("nro_tel").value;
        const dni = document.getElementById("dni").value;
        const contrasenia = document.getElementById("contraseña").value;

        const datosUsuario = {
        nombre,
        edad,
        mail,
        nro_tel,
        dni,
        contrasenia
        };

        try {
        const respuesta = await fetch('http://localhost:3000/api/v1/usuarios', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        });

        const data = await respuesta.json();

        if (respuesta.ok) {
            alert(data.mensaje);
            sessionStorage.setItem("id_usuario", data.id);
            window.location.href = "inicio.html";
        } else {
            alert(data.mensaje);
        }

        } catch (error) {
        console.error("Error al crear usuario:", error);
        alert('Hubo un problema al crear la cuenta.');
        }
    });
}