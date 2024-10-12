import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DonHang } from './donhang.model';
import { CTDonHang } from './ctdonhang.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DonHangService {

  private apiUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) { }


  getAllDonHang(): Observable<DonHang[]> {
    return this.http.get<DonHang[]>(`${this.apiUrl}/getAll`).pipe(
        catchError((error) => {
            console.error('Error fetching orders', error);
            return throwError(error); // rethrow the error to be handled by the caller
        })
    );
  }

  getDonHangById(id: number): Observable<DonHang> {
    return this.http.get<DonHang>(`${this.apiUrl}/${id}`);
  }

  // getOrderProducts(orderId: number): Observable<CTDonHang[]> {
  //   return this.http.get<CTDonHang[]>(`${this.apiUrl}/${orderId}/products`);
  // }

  updateTrangThai(id: number, trangThaiId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateTrangThai/${id}/${trangThaiId}`, null);
  }

  // Phương thức tạo đơn hàng mới
  createOrder(donHang: DonHang): Observable<DonHang> {
    return this.http.post<DonHang>(`${this.apiUrl}/create`, donHang).pipe(
      catchError((error) => {
        console.error('Error creating order', error);
        return throwError(error);
      })
    );
  }

  // Phương thức thêm chi tiết đơn hàng (CTDonHang)
  addOrderDetails(orderId: number, orderDetails: CTDonHang[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${orderId}/addDetails`, orderDetails).pipe(
      catchError((error) => {
        console.error('Error adding order details', error);
        return throwError(error);
      })
    );
  }

  // getOrdersByCustomerEmail(email: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/email/${email}`);
  // }

  getOrdersByCustomerEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/email/${email}`).pipe(
      catchError((error) => {
        console.error('Failed to load order history', error);
        return throwError(error);
      })
    );
  }
  


}
