// src/app/services/sanpham.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sanpham } from './product.model';
import { Nhacungcap } from '../suppliers/suppliers.model';

@Injectable({
  providedIn: 'root'
})
export class SanphamService {

  
  private apiUrl = 'http://localhost:8080/sanpham';
  private nccUrl = 'http://localhost:8080/ncc';

  constructor(private http: HttpClient) { }

  getAllSanpham(): Observable<Sanpham[]> {
    return this.http.get<Sanpham[]>(`${this.apiUrl}/getAll`);
  }

  getAllNcc(): Observable<Nhacungcap[]> {
    return this.http.get<Nhacungcap[]>(`${this.nccUrl}/getAll`);
  }

  getSanphamById(id: number): Observable<Sanpham> {
    return this.http.get<Sanpham>(`${this.apiUrl}/getById/${id}`);
  }

  createSanpham(sanpham: Sanpham): Observable<Sanpham> {
    return this.http.post<Sanpham>(`${this.apiUrl}/create`, sanpham);
  }

  updateSanpham(id: number, sanpham: Sanpham): Observable<Sanpham> {
    return this.http.put<Sanpham>(`${this.apiUrl}/update/${id}`, sanpham);
  }

  deleteSanpham(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload`, formData, {
        reportProgress: true,
        observe: 'events'
    });
  }  

}
