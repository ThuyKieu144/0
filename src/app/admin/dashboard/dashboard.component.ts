import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalProducts: number = 0;
  totalAccounts: number = 0;
  totalRevenue: number = 0;
  totalOrders: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTotalProducts();
    this.getTotalAccounts();
    this.getTotalRevenue();
    this.getTotalOrders();
  }

  getTotalProducts(): void {
    this.http.get<number>('http://localhost:8080/api/admin/count/products').subscribe(
      (response) => this.totalProducts = response
    );
  }

  getTotalAccounts(): void {
    this.http.get<number>('http://localhost:8080/api/admin/count/accounts').subscribe(
      (response) => this.totalAccounts = response
    );
  }

  getTotalOrders(): void {
    this.http.get<number>('http://localhost:8080/api/admin/count/orders').subscribe(
      (response) => this.totalOrders = response
    );
  }

  getTotalRevenue(): void {
    this.http.get<number>('http://localhost:8080/api/admin/count/revenue').subscribe(
      (response) => this.totalRevenue = response
    );
  }
  
  
}
