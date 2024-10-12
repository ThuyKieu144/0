import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nhacungcap } from './suppliers.model';

@Injectable({
  providedIn: 'root',
})
export class NhacungcapService {
  private apiUrl = 'http://localhost:8080/ncc';

  constructor(private http: HttpClient) {}

  getNcc(): Observable<Nhacungcap[]> {
    return this.http.get<Nhacungcap[]>(`${this.apiUrl}/getAll`);
  }

  getNccById(id: number): Observable<Nhacungcap> {
    return this.http.get<Nhacungcap>(`${this.apiUrl}/getById/${id}`);
  }

  createNcc(nhacungcap: Nhacungcap): Observable<Nhacungcap> {
    return this.http.post<Nhacungcap>(`${this.apiUrl}/create`, nhacungcap);
  }

  updateNcc(id: number, nhacungcap: Nhacungcap): Observable<Nhacungcap> {
    return this.http.put<Nhacungcap>(`${this.apiUrl}/update/${id}`, nhacungcap);
  }

  deleteNcc(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}