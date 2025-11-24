// URL de tu compañero (MS-Auth). Usamos el proxy de Vite que configuramos.
const AUTH_BASE_URL = '/api/auth'; 

export const AuthService = {
    
    // --- LOGIN (INICIAR SESIÓN) ---
    login: async (username: string, password: string) => {
        try {
            const response = await fetch(`${AUTH_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Credenciales incorrectas');
            }

            const data = await response.json();
            const tokenRecibido = data.token || data.accessToken || data.jwt;

            if (tokenRecibido) {
                localStorage.setItem('jwt_token', tokenRecibido);
                return tokenRecibido;
            }
        } catch (error) {
            console.error("Login fallido", error);
            throw error;
        }
    },

    // --- REGISTRO (CREAR CUENTA) - ESTA ES LA FUNCIÓN FALTANTE ---
    register: async (username: string, email: string, password: string) => {
        try {
            // Nota: Asumimos que el endpoint es "/register"
            const response = await fetch(`${AUTH_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username, 
                    email, 
                    password,
                    roles: ["user"]
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Error al crear usuario');
            }
            
            return true; // Registro exitoso
        } catch (error) {
            console.error("Registro fallido", error);
            throw error;
        }
    },

    // --- CERRAR SESIÓN Y UTILIDADES ---
    logout: () => {
        localStorage.removeItem('jwt_token');
        window.location.href = '/';
    },

    getToken: () => {
        return localStorage.getItem('jwt_token');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('jwt_token');
    },

    getAuthHeader: () => {
        const token = localStorage.getItem('jwt_token');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    },

    // NUEVA FUNCIÓN: Obtener el ID del usuario desde el Token JWT
    getUserId: (): number | null => {
        const token = localStorage.getItem('jwt_token');
        if (!token) return null;
        
        try {
            // Decodificamos la parte central del token (Payload)
            const payload = JSON.parse(atob(token.split('.')[1]));
            // Asumimos que el ID viene en el campo "id" o "userId" del token.
            // Si tu compañero usó el standard "sub" para el username, 
            // asegúrate de que el token incluya el ID numérico.
            return payload.id || payload.userId || null; 
        } catch (e) {
            return null;
        }
    },

};