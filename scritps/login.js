document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://node-login-skeleton-oxri.vercel.app/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Guardar el token en localStorage
            localStorage.setItem('token', data.token);
            document.getElementById('responseMessage').innerText = 'Login exitoso';
            // Redirigir a otra página, por ejemplo, dashboard.html
            window.location.href = 'index.html'; // Cambia esto a tu página de destino
        } else {
            // Mostrar mensaje de error
            document.getElementById('responseMessage').innerText = data.message || 'Error desconocido';
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        document.getElementById('responseMessage').innerText = 'Error al iniciar sesión';
    }
});