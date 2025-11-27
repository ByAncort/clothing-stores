import { getRoles } from "@testing-library/dom";

const AUTH_BASE_URL = 'http://localhost:9001'; 

export const AuthService = {
    
    login: async (username: string, password: string) => {
        try {
            const response = await fetch(`${AUTH_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Credenciales incorrectas');
            }

            const data = await response.json();
            localStorage.setItem('userData', JSON.stringify(data));
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

    register: async (username: string, email: string, password: string) => {
        try {
            console.log(JSON.stringify({ 
                    username, 
                    email, 
                    password
                    }));

        const response = await fetch("http://localhost:9001/api/auth/register", {
                method: "POST",
                headers: {
                    "accept": "*/*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();
            console.log(data);


            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Error al crear usuario: ' + data. message);
            }
            
            return true; 
        } catch (error) {
            console.error("Registro fallido", error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('userData');
        window.location.href = '/';
    },
    getUserIdFromStorage: (): number | null => {
    const data = localStorage.getItem('userData');
    if (!data) return null;

    try {
        const parsed = JSON.parse(data);
        return parsed?.idUser ?? null;
    } catch {
        return null;
    }
    },

    getRoles: () => {
        const data = localStorage.getItem('userData');
        if (!data) return [];

        try {
            const parsed = JSON.parse(data);
            return parsed?.roles ?? [];
        } catch (e) {
            console.error("Error parsing userData:", e);
            return [];
        }
    },
    isAdmin: () => {
        const roles = AuthService.getRoles();
        return roles.some((r: any) => r.name === "ROLE_ADMIN");
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

    getUserId: (): number | null => {
        const token = localStorage.getItem('jwt_token');
        if (!token) return null;
        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.id || payload.userId || null; 
        } catch (e) {
            return null;
        }
    },

};