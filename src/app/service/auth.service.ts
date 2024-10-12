import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userEmail: string | null = null; // Initialize email as null

  private apiUrl = 'http://localhost:8080/taikhoan'; 

  constructor(private http: HttpClient) {}

  // Method to set the user's email
  setUserEmail(email: string) {
    this.userEmail = email;
  }

  // Method to get the user's email
  getUserEmail(): string | null {
    return this.userEmail;
  }

  logout(): void {
    localStorage.removeItem('userEmail'); // Ví dụ: xóa email trong localStorage
  }

  changePassword(email: string, currentPassword: string, newPassword: string): Observable<any> {
    const body = {
      email: email,
      currentPassword: currentPassword,
      newPassword: newPassword
    };
    return this.http.post(`${this.apiUrl}/change-password`, body);
  }
  
  
}
