document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value
  };

  try {
    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      alert('Registro exitoso ✔️');
      form.reset();
    } else {
      alert(`Error: ${result.error}`);
    }
  } catch (err) {
    console.error('Error en el registro:', err);
    alert('Ocurrió un error al registrarte.');
  }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const form = e.target;
  const data = {
    email: form.email.value,
    password: form.password.value
  };

  try {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
      // Guardamos el token en localStorage
      localStorage.setItem('token', result.token);
      alert('Inicio de sesión exitoso ✔️');
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
       if (payload.email === 'admin@gmail.com') {
 
        fetch('/admin', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(r => {
        if (!r.ok) throw new Error('No autorizado');
        return r.text();           // HTML completo
      })
      .then(html => {
        document.open();
        document.write(html);
        document.close();
        history.pushState(null, '', '/admin');
      })
      .catch(() => alert('Acceso denegado'));
    } else {
      window.location.href = '/index.html';
    } 
    } else {
      alert(`Error: ${result.error}`);
    }
  } catch (error) {
    console.error('Error en el login:', error);
    alert('No se pudo iniciar sesión');
  }
});





 