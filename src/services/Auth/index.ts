import { IUser } from '@/interfaces/User';
import { loginRoute, registerRoute } from '../../constants/routes';

export class AuthService {
  static async login(newLogin: Pick<IUser, 'email' | 'password'>) {
    return fetch(loginRoute, {
      method: 'POST',
      body: JSON.stringify(newLogin)
    });
  }

  static async register(newUser: Omit<IUser, '_id'>) {
    return fetch(registerRoute, {
      method: 'POST',
      body: JSON.stringify(newUser)
    });
  }
}
