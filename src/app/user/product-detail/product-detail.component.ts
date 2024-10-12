import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SanphamService } from '../../admin/products/product.service';
import { Sanpham } from '../../admin/products/product.model';
import { CartService } from '../cart.service'; 
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  sanpham : Sanpham ;

  constructor(
    private route: ActivatedRoute,
    private sanphamService: SanphamService,
    private cartService: CartService 
  ) {
    this.sanpham = {} as Sanpham; // Provide a default value (empty object)
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sanphamService.getSanphamById(+id).subscribe((data: Sanpham) => {
        console.log(data);
        this.sanpham = data;
      });
    }
  }  

  addToCart(): void {
    this.cartService.addToCart(this.sanpham, 1); // Default quantity of 1
    console.log('Added to cart:', this.sanpham);
  }
}
