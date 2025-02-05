document.addEventListener('DOMContentLoaded', function () {

    const iniciarSesionForm = document.getElementById('iniciarSesionForm');
    if (iniciarSesionForm) {
        iniciarSesionForm.addEventListener('submit', function (event) {
            event.preventDefault(); 
            window.location.href = 'cuenta.html';
        });
    }

    const crearCuentaForm = document.getElementById('crearCuentaForm');
    if (crearCuentaForm) {
        crearCuentaForm.addEventListener('submit', function (event) {
            event.preventDefault();
            window.location.href = 'cuenta.html';
        });
    }
});