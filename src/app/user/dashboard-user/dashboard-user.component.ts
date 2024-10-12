// dashboard-user.component.ts
import { Component, OnInit } from '@angular/core';
import { SanphamService } from '../../admin/products/product.service';
import { Sanpham } from '../../admin/products/product.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service'; // Ensure to import your CartService
import { SharedService } from '../../user-layout/shared.service';
@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {
  sanphams: Sanpham[] = [];

  filteredSanphams: Sanpham[] = [];

  constructor(
    private sanphamService: SanphamService, 
    private router: Router, 
    private cartService: CartService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loadSanphams();
  
    this.sharedService.currentSearchQuery.subscribe((query) => {
      this.filterProducts(query);
    });
  }
  
  loadSanphams(): void {
    this.sanphamService.getAllSanpham().subscribe((data: Sanpham[]) => {
      this.sanphams = data;
      this.filteredSanphams = [...this.sanphams]; // Hiển thị tất cả sản phẩm ban đầu
    });
  }
  
  filterProducts(query: string): void {
    if (query) {
      this.filteredSanphams = this.sanphams.filter((sanpham) =>
        sanpham.sp_ten.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredSanphams = [...this.sanphams]; // Hiển thị lại tất cả sản phẩm khi query rỗng
    }
  }

  // Navigate to the product detail page
  viewProductDetail(id: number): void {
    this.router.navigate(['/user/products', id]);
  }

  // Add a product to the cart
  addToCart(sanpham: Sanpham): void {
    if (sanpham) {
      this.cartService.addToCart(sanpham, 1); // Always add with quantity of 1
      console.log('Added to cart:', sanpham);
    }
  }
}
