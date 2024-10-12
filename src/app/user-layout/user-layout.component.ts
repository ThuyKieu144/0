import { Component, OnInit } from '@angular/core';
import { SanphamService } from '../admin/products/product.service';
import { Sanpham } from '../admin/products/product.model';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedService } from './shared.service'; 
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent implements OnInit {
  sanphams: Sanpham[] = [];
  title: string = 'Trang chủ';  // Thêm thuộc tính title
  email: string | null = '';
  cartItemsCount: number = 0;   // Thêm thuộc tính cartItemsCount
  searchQuery: string = '';     // Thêm thuộc tính searchQuery
  filteredSanphams: Sanpham[] = [];

  constructor(
      private sanphamService: SanphamService,
      public sharedService: SharedService,
      private authService: AuthService,
      private router: Router
  ) {
    this.email = this.authService.getUserEmail(); // Lấy email của user từ service
  }

  ngOnInit(): void {
    this.loadSanphams();

    this.sharedService.currentSearchQuery.subscribe(query => {
      this.searchQuery = query;
      this.searchProducts();
    });
  }

  searchProducts(): void {
    // Nếu searchQuery trống, hiển thị tất cả sản phẩm
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      this.filteredSanphams = [...this.sanphams]; // Hiển thị tất cả sản phẩm
    } else {
      this.filteredSanphams = this.sanphams.filter(sanpham =>
        sanpham.sp_ten.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  loadSanphams(): void {
    this.sanphamService.getAllSanpham().subscribe((data: Sanpham[]) => {
      this.sanphams = data;
      this.filteredSanphams = data; // Initialize filtered products
    });
  }

  addToCart(sanpham: Sanpham): void {
    // Logic to add the product to the cart (You may want to implement a cart service)
    console.log('Adding to cart:', sanpham);
    this.cartItemsCount++; // Update cart count (for demonstration)
  }

  logout(): void {
    this.authService.logout(); // Xử lý đăng xuất (xóa token hoặc email)
    this.email = null;         // Cập nhật lại email để làm mới giao diện
    this.router.navigate(['/login']); 
  }
  
}
