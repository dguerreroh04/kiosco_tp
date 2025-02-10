
document.addEventListener("DOMContentLoaded", async () => {
    const nombreInput = document.getElementById("nombre");
    const edadInput = document.getElementById("edad");
    const mailInput = document.getElementById("mail");
    const numTelInput = document.getElementById("nro_tel");
    const dniInput = document.getElementById("dni");
    const contraseniaInput = document.getElementById("contraseña");
    const guardarBtn = document.getElementById("guardarBtn");

    try {
        //mostrar datos ya cargaados
        const response = await fetch(`http://localhost:3000/api/v1/usuarios/${idUsuario}`);
        if (!response.ok) {
            throw new Error(`Error al obtener datos: ${response.statusText}`);
        }

        const usuario = await response.json();
        
        nombreInput.value = usuario.nombre || "";
        edadInput.value = usuario.edad || "";
        mailInput.value = usuario.mail || "";
        numTelInput.value = usuario.nro_tel || "";
        dniInput.value = usuario.dni || "";

    } catch (error) {
        console.error("Error al cargar los datos: ", error);
        alert("Hubo un problema al cargar los datos. Intenta nuevamente.");
    }

function guardar(){
    //actulizaacion de datos
    guardarBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        const datosActualizados = {
            nombre: nombreInput.value,
            edad: edadInput.value,
            mail: mailInput.value,
            nro_tel: numTelInput.value,
            dni: dniInput.value,
            contrasenia: contraseniaInput.value
        };

        try {
            //envio de datos
            const response = await fetch(`http://localhost:3000/api/v1/usuarios/${idUsuario}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datosActualizados),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.mensaje || "Datos actualizados correctamente");
            } else {
                alert(data.mensaje || "Error al actualizar los datos");
            }
        } catch (error) {
            console.error("Error al actualizar los datos ", error);
            alert('Hubo un problema al actualizar los datos de tu cuenta.');
        }
    });
}});
