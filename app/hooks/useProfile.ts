// ~/hooks/useProfile.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "~/service/AuthService";
import { OrderService, type Order } from "~/service/OrderService";
import { UserService } from "~/service/UserService";
import type { UserProfile, UserUpdateData } from "~/types/user";

export function useProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate("/login");
      return;
    }

    const token = AuthService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload.sub || "Usuario";
        
        // Extraer user ID del token si está disponible
        const userIdFromToken = payload.userId || payload.id || 3; // Fallback a 3 temporalmente
        
        setUser(username);
        setUserId(userIdFromToken);
        loadUserProfile(username, userIdFromToken);
        loadOrders(username);
      } catch (e) {
        console.error("Error decoding token:", e);
        setUser("Cliente");
        setLoading(false);
      }
    }
  }, [navigate]);

  const loadUserProfile = async (username: string, userId: number) => {
    try {
      // Perfil básico temporal - luego puedes reemplazar con llamada real al API
      setUserProfile({
        id: userId,
        username: username,
        direccion: "Dirección no especificada",
        telefono: "Teléfono no especificado"
      });
    } catch (error) {
      console.error("Error loading user profile:", error);
      // Perfil de fallback
      setUserProfile({
        id: userId,
        username: username,
        direccion: "Error al cargar",
        telefono: "Error al cargar"
      });
    }
  };

  const loadOrders = async (username: string) => {
    try {
      console.log("Loading orders for:", username);
      const data = await OrderService.getMyOrders(username);
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
      // En caso de error, mantener array vacío
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userData: UserUpdateData) => {
    if (!userId) {
      alert("No se pudo identificar el usuario");
      return;
    }
    
    try {
      setLoading(true);
      console.log("Updating user:", userId, userData);
      
      const updatedUser = await UserService.updateUser(userId, userData);
      
      // Actualizar el estado local con los nuevos datos
      setUserProfile(prev => prev ? { ...prev, ...userData } : null);
      if (userData.username) {
        setUser(userData.username);
      }
      setEditing(false);
      
      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error al actualizar el perfil. Verifica la consola para más detalles.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  const handleNavigateToStore = () => {
    navigate("/");
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

return {
  user,
  userProfile,
  orders,
  loading,
  editing,
  onEditToggle: handleEditToggle,
  onUpdateUser: handleUpdateUser,
  onLogout: handleLogout,
  onNavigateToStore: handleNavigateToStore
};
}