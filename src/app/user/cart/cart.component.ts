import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { DonHang } from '../../admin/orders/donhang.model'; // Đường dẫn chính xác đến mô-đun
import { AuthService } from '../../service/auth.service';
import { DonHangService } from '../../admin/orders/donhang.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CTDonHangService } from '../../admin/orders/ctdonhang.service';
import { CTDonHang } from '../../admin/orders/ctdonhang.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  email: string | null = null; 
  customerName: string = ''; 
  customerPhone: string = ''; 
  customerAddress: string = ''; 
  orderId: number | undefined; 
  orderSuccess: boolean = false; 
  errorMessage: string | undefined; 

  constructor(
    private cartService: CartService,
    private ctDonHangService: CTDonHangService,
    private authService: AuthService,
    private donHangService: DonHangService,
    private router: Router
    ) {
      this.email = this.authService.getUserEmail() ;
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.product.sp_gia * item.quantity);
    }, 0);
  }

  // Method to update the quantity and recalculate the price
  updateItemQuantity(item: any): void {
    if (item.quantity < 1) {
      item.quantity = 1; // Ensure minimum quantity is 1
    }
    this.calculateTotalPrice(); // Recalculate total price after quantity update
  }

  // Method to remove an item from the cart
  removeFromCart(item: any): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.product.sp_id !== item.product.sp_id);
    this.cartService.updateCartItems(this.cartItems); // Cập nhật giỏ hàng trong service
    this.calculateTotalPrice(); // Recalculate total price after removing an item
}


  checkLoginAndPlaceOrder(): void {
    if (!this.email) {
      this.router.navigate(['/login']);  // Redirect to login if not logged in
    } else {
      this.placeOrder();  // Call the method to place an order if logged in
    }
  }

  placeOrder(): void {
    const newOrder: DonHang = {
      dh_tenkh: this.customerName,
      dh_diachi: this.customerAddress,
      dh_sdt: this.customerPhone,
      dh_emailkh: this.email || '',
      dh_ngaydat: new Date(),
      trangthaiDH: { trangthaidh_id: 1 } // Trạng thái đơn hàng mới
    };

    this.donHangService.createOrder(newOrder).subscribe({
      next: (response) => {
        this.orderId = response.dh_id;  // Lưu ID đơn hàng
        this.orderSuccess = true;

        const cartItems = this.cartService.getCartItems(); // Lấy sản phẩm từ giỏ hàng

        // Tạo chi tiết đơn hàng cho từng sản phẩm
        const detailOrders: CTDonHang[] = cartItems.map(item => ({
          ctdh_id: 0, // Assign 0 or appropriate default value if ctdh_id is auto-generated
          donHang: {
            dh_id: this.orderId, // Use the order ID from the response
            dh_tenkh: this.customerName,
            dh_diachi: this.customerAddress,
            dh_sdt: this.customerPhone,
            dh_emailkh: this.email || '',
            dh_ngaydat: new Date(), // You can adjust this according to your logic
            trangthaiDH: { trangthaidh_id: 1 } // Make sure to include all necessary fields
          },
          sanPham: item.product, // Assuming item.product is of type Sanpham
          ctdh_soluong: item.quantity,
          ctdh_gia: item.product.sp_gia // Assuming item.product.sp_gia contains the product price
        }));

        // Gọi dịch vụ để thêm chi tiết đơn hàng
        this.ctDonHangService.createDetailOrders(detailOrders).subscribe({
          next: () => {
            this.cartService.clearCart(); // Xóa giỏ hàng sau khi đặt thành công
            this.router.navigate(['/user/order', this.orderId]); // Chuyển đến trang chi tiết đơn hàng
          },
          error: (error) => {
            this.errorMessage = 'Có lỗi xảy ra khi tạo chi tiết đơn hàng.';
          }
        });
      },
      error: (error) => {
        this.errorMessage = 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.';
      }
    });
}


}
