// Configuración basada en el código de tu compañero
const AUTH_API_URL = 'http://localhost:9010/api/auth'; 

export const AuthService = {
    
    login: async (username: string, password: string) => {
        try {
            // El endpoint de tu compañero es /login
            const response = await fetch(`${AUTH_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Usuario o contraseña incorrectos');
            }

            const data = await response.json();
            
            // Tu compañero devuelve el token en "token" según su JwtUtils
            if (data.token) {
                // Guardamos el token en el navegador (Punto 5 Rúbrica: Persistencia)
                localStorage.setItem('jwt_token', data.token);
                return data.token;
            }
        } catch (error) {
            console.error("Login fallido", error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('jwt_token');
        window.location.href = '/';
    },

    getToken: () => {
        return localStorage.getItem('jwt_token');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('jwt_token');
    }
};