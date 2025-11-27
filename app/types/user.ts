// ~/types/user.ts
export interface UserUpdateData {
  username?: string;
  direccion?: string;
  telefono?: string;
}

export interface UserProfile {
  id?: number;
  username: string;
  direccion?: string;
  telefono?: string;
  email?: string;
}