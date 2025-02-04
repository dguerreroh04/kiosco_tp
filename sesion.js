// Manejo del primer formulario
document.getElementById('loginForm1').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username1').value;
    const password = document.getElementById('password1').value;
    const errorMessage = document.getElementById('error-message1');

    // Validación simple (usuario: "admin", contraseña: "1234")
    if (username === "admin" && password === "1234") {
        errorMessage.style.display = 'none';
        alert('Inicio de sesión 1 exitoso');
    } else {
        errorMessage.textContent = 'Usuario o contraseña incorrectos';
        errorMessage.style.display = 'block';
    }
});

// Manejo del segundo formulario
document.getElementById('loginForm2').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username2').value;
    const password = document.getElementById('password2').value;
    const errorMessage = document.getElementById('error-message2');

    // Validación simple (usuario: "user", contraseña: "5678")
    if (username === "user" && password === "5678") {
        errorMessage.style.display = 'none';
        alert('Inicio de sesión 2 exitoso');
    } else {
        errorMessage.textContent = 'Usuario o contraseña incorrectos';
        errorMessage.style.display = 'block';
    }
});