// cart.service.ts
import { Injectable } from '@angular/core';
import { Sanpham } from '../admin/products/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: { product: Sanpham; quantity: number }[] = [];

  constructor() {}

  addToCart(product: Sanpham, quantity: number) {
    const existingItem = this.cartItems.find(item => item.product.sp_id === product.sp_id);
    if (existingItem) {
      existingItem.quantity += quantity; // Update quantity if already exists
    } else {
      this.cartItems.push({ product, quantity });
    }
    window.alert('Đã thêm vào giỏ hàng');
  }

  getCartItems() {
    return this.cartItems;
  }

  getCartItemCount() {
    return this.cartItems.length;
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.product.sp_gia * item.quantity), 0);
  }

  // Xóa tất cả sản phẩm trong giỏ hàng
  clearCart() {
    this.cartItems = []; // Xóa tất cả các mặt hàng trong giỏ hàng
  }

  updateCartItems(items: any[]): void {
    this.cartItems = items;
    localStorage.setItem('cart', JSON.stringify(this.cartItems)); // Cập nhật localStorage nếu cần
}

}
