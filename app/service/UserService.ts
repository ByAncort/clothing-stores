// ~/service/UserService.ts
import { AuthService } from './AuthService';
import type { UserUpdateData } from '~/types/user';

export class UserService {
  static async updateUser(userId: number, userData: UserUpdateData): Promise<any> {
    const token = AuthService.getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch(`http://localhost:9011/api/users/update/${userId}`, {
        method: 'PUT',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error updating user: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch error in UserService:', error);
      throw error;
    }
  }
}