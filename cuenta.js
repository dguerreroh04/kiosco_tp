document.addEventListener('DOMContentLoaded', function () {
    const nombreInput = document.querySelector('.nombre .input');
    const edadInput = document.querySelector('.edad .input');
    const mailInput = document.querySelector('.mail .input');
    const numtelInput = document.querySelector('.numtel .input');
    const dniInput = document.querySelector('.dni .input');
    const guardarBtn = document.getElementById('guardarBtn');

    //Cargar datos desde el almacenamiento local (si ya existen)
    
    if (localStorage.getItem('nombre')) nombreInput.value = localStorage.getItem('nombre');
    if (localStorage.getItem('edad')) edadInput.value = localStorage.getItem('edad');
    if (localStorage.getItem('mail')) mailInput.value = localStorage.getItem('mail');
    if (localStorage.getItem('numtel')) numtelInput.value = localStorage.getItem('numtel');
    if (localStorage.getItem('dni')) dniInput.value = localStorage.getItem('dni');

    guardarBtn.addEventListener('click', function (event) {
        event.preventDefault();

        const datos = {
            nombre: nombreInput.value,
            edad: pasrseInt(edadInput.value), 
            mail: mailInput.value,
            nro_telefono: numtelInput.value,
            dni: parseInt(dniInput.value), 
        };

        localStorage.setItem('nombre', datos.nombre);
        localStorage.setItem('edad', datos.edad);
        localStorage.setItem('mail', datos.mail);
        localStorage.setItem('numtel', datos.nro_telefono);
        localStorage.setItem('dni', datos.dni);

        //Envio de datos al backend
        fetch('http://localhost:3000/api/v1/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .then(data => {
            if (data.mensaje) {
                alert('Datos guardados en la base de datos y en localStorage');
            } else {
                alert('Error: ' + JSON.stringify(data));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al guardar los datos en la base de datos');
        });
    });
});