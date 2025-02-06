document.getElementById('Iniciar sesion').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  fetch('/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      if (data.mensaje === 'Inicio de sesión exitoso') {
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
