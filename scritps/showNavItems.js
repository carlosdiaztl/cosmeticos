async function checkNav() {
    const token = localStorage.getItem('token');
    const authContainer = document.getElementById('auth-container');
    const logoutContainer = document.getElementById('logout-container');

    if (!token) {
        // Si no hay token, muestra el contenedor de autenticación
        authContainer.style.display = 'block';
        logoutContainer.style.display = 'none'; // Asegúrate de ocultar el contenedor de cierre de sesión
        return;
    }

    try {
        const response = await fetch('https://node-login-skeleton-oxri.vercel.app/api/protected', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            // Si el token es inválido, elimina el token
            authContainer.style.display = 'block'; // Muestra el contenedor de autenticación
            logoutContainer.style.display = 'none'; // Asegúrate de ocultar el contenedor de cierre de sesión
        } else {
            // Si el token es válido, muestra el contenedor de cierre de sesión
            authContainer.style.display = 'none'; // Oculta el contenedor de autenticación
            logoutContainer.style.display = 'block'; // Muestra el contenedor de cierre de sesión
        }
    } catch (error) {
        console.error('Error al verificar el token:', error);
        authContainer.style.display = 'block'; // Muestra el contenedor de autenticación
        logoutContainer.style.display = 'none'; // Asegúrate de ocultar el contenedor de cierre de sesión
    }
}

// Función para manejar el cierre de sesión


// Llama a la función al cargar la página

// Agrega el event listener al botón de cerrar sesión

const logout = () => {
    console.log("logout");
    localStorage.removeItem('token');
    window.location.reload(); // Recarga la página para reflejar el cambio
}

// Iniciar la verificación de autenticación al cargar la página
window.onload = () => {
    checkNav();
    document.getElementById('logout-button')?.addEventListener('click', logout);
};