import Cookies from 'js-cookie';


export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class UserService {
  private readonly COOKIE_NAME = 'auth_token';
  private readonly COOKIE_EXPIRY_DAYS = 7;

  // For demo purposes, we'll use a simple in-memory user store
  // In a real app, this would be replaced with API calls to your backend
  private users: (User & { password: string })[] = [];

  private getAuthToken(): string | undefined {
    return Cookies.get(this.COOKIE_NAME);
  }

  private setAuthToken(token: string): void {
    Cookies.set(this.COOKIE_NAME, token, { 
      expires: this.COOKIE_EXPIRY_DAYS,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }

  private removeAuthToken(): void {
    Cookies.remove(this.COOKIE_NAME);
  }

  async register(data: RegisterData): Promise<boolean> {
    // Check if email is already in use
    if (this.users.some(user => user.email === data.email)) {
      return false;
    }

    // In a real app, you would hash the password before storing it
    const newUser = {
      id: crypto.randomUUID(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password // In a real app, this would be hashed
    };

    this.users.push(newUser);
    return true;
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // In a real app, you would get this token from your backend
      const token = `demo_token_${Date.now()}`;
      this.setAuthToken(token);
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };
    }
    
    return null;
  }

  async logout(): Promise<void> {
    this.removeAuthToken();
  }

  async getCurrentUser(): Promise<User | null> {
    const token = this.getAuthToken();
    if (!token) return null;

    // In a real app, you would validate the token with your backend
    // and get the current user's information
    const user = this.users[0];
    if (!user) return null;

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}

// Create a singleton instance
export const userService = new UserService(); 