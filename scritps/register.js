document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const url = 'https://node-login-skeleton-oxri.vercel.app/api/register'; // URL del endpoint

    const userData = {
        username: username,
        password: password
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // Verificar si la respuesta fue exitosa
        if (response.ok) {
            const data = await response.json();
            document.getElementById('responseMessage').innerHTML = `<div class="alert alert-success">${data.message}</div>`;
            
            // Redirigir al login después de un registro exitoso
            setTimeout(() => {
                window.location.href = 'login.html'; // Cambia la URL según tu estructura de archivos
            }, 2000); // Espera 2 segundos antes de redirigir
        } else {
            const errorData = await response.json();
            document.getElementById('responseMessage').innerHTML = `<div class="alert alert-danger">${errorData.message || "Error al registrar el usuario"}</div>`;
        }
    } catch (error) {
        document.getElementById('responseMessage').innerHTML = `<div class="alert alert-danger">Error al registrar el usuario: ${error.message}</div>`;
    }
});