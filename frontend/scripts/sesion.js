document.getElementById('Iniciar sesion').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  fetch('http://localhost:3000/api/v1/usuarios/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      if (data.mensaje === 'Inicio de sesión exitoso') {
          sessionStorage.setItem("id_usuario", data.id);
          window.location.href = 'cuenta.html';
      } else {
          alert(data.mensaje);
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Ocurrió un error al intentar iniciar sesión');
  });
});
