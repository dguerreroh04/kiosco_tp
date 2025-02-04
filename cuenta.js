document.addEventListener('DOMContentLoaded', function () {
    // Selecciona los elementos del formulario
    const nombreInput = document.querySelector('.nombre .input');
    const edadInput = document.querySelector('.edad .input');
    const mailInput = document.querySelector('.mail .input');
    const numtelInput = document.querySelector('.numtel .input');
    const dniInput = document.querySelector('.dni .input');
    const guardarBtn = document.getElementById('guardarBtn');

    // Cargar datos guardados del localStorage
    if (localStorage.getItem('nombre')) nombreInput.value = localStorage.getItem('nombre');
    if (localStorage.getItem('edad')) edadInput.value = localStorage.getItem('edad');
    if (localStorage.getItem('mail')) mailInput.value = localStorage.getItem('mail');
    if (localStorage.getItem('numtel')) numtelInput.value = localStorage.getItem('numtel');
    if (localStorage.getItem('dni')) dniInput.value = localStorage.getItem('dni');

    // Guardar datos en el localStorage al hacer clic en el botón
    guardarBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe

        // Guardar los valores en el localStorage
        localStorage.setItem('nombre', nombreInput.value);
        localStorage.setItem('edad', edadInput.value);
        localStorage.setItem('mail', mailInput.value);
        localStorage.setItem('numtel', numtelInput.value);
        localStorage.setItem('dni', dniInput.value);

        // Mostrar mensaje de confirmación
        alert('Datos actualizados');
    });
});