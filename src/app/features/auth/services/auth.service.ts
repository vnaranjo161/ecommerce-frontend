import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../interfaces/auth.interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private readonly TOKEN_KEY = 'auth_token';

  register(data: RegisterRequest) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, data);
  }

  login(data: LoginRequest) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

}
