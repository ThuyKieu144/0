import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaiKhoan } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/taikhoan';

  constructor(private http: HttpClient) {}

  getTaiKhoans(): Observable<TaiKhoan[]> {
    return this.http.get<TaiKhoan[]>(`${this.apiUrl}/getAll`);
  }

  getTaiKhoanById(id: number): Observable<TaiKhoan> {
    return this.http.get<TaiKhoan>(`${this.apiUrl}/getById/${id}`);
  }

  createTaiKhoan(taiKhoan: TaiKhoan): Observable<TaiKhoan> {
    return this.http.post<TaiKhoan>(`${this.apiUrl}/create`, taiKhoan);
  }

  updateTaiKhoan(id: number, taiKhoan: TaiKhoan): Observable<TaiKhoan> {
    return this.http.put<TaiKhoan>(`${this.apiUrl}/update/${id}`, taiKhoan);
  }

  deleteTaiKhoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // AccountService
  checkEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-email?email=${email}`);
  }

  
  
}
