import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CTDonHang } from './ctdonhang.model';

@Injectable({
  providedIn: 'root'
})
export class CTDonHangService {

  private apiUrl = 'http://localhost:8080/ctDH';

  constructor(private http: HttpClient) { }

  getCTDonHangByDonHangId(donHangId: number): Observable<CTDonHang[]> {
    return this.http.get<CTDonHang[]>(`${this.apiUrl}/by-donhang/${donHangId}`);
  }

  createDetailOrders(details: CTDonHang[]): Observable<CTDonHang[]> {
    return this.http.post<CTDonHang[]>(`${this.apiUrl}/batch`, details);
  }
  
}
