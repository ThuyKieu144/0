import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DonHangService } from '../../admin/orders/donhang.service';
import { AuthService } from '../../service/auth.service';
import { DonHang } from '../../admin/orders/donhang.model'; // Import mô hình nếu cần

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: true,
  imports: [ CommonModule],
})
export class OrderComponent implements OnInit {
  email: string | null = '';
  customerName: string = '';
  customerPhone: string = '';
  customerAddress: string = '';
  orderSuccess: boolean = false;
  orderId: number | null | undefined = null;  // Cho phép undefined
  orderDetails: DonHang | null = null; // Biến để lưu thông tin đơn hàng
  errorMessage: string = '';

  constructor(
    private donHangService: DonHangService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.email = this.authService.getUserEmail();
  }

  ngOnInit(): void {
    // Nếu chưa đăng nhập, chuyển hướng đến trang login
    if (!this.email) {
      this.router.navigate(['/login']);
    }
    this.route.params.subscribe(params => {
      this.orderId = +params['id']; // Convert string ID to number
      this.getOrderDetails(this.orderId);
    });
  }

  private getOrderDetails(orderId: number | null): void {
    if (orderId) {
      this.donHangService.getDonHangById(orderId).subscribe({
        next: (order) => {
          this.orderDetails = order; // Kiểm tra xem order có dữ liệu không
          this.orderSuccess = true; // Đặt orderSuccess thành true nếu có thông tin
          console.log('Order Details:', this.orderDetails); // Thêm log để kiểm tra
        },
        error: (error) => {
          this.errorMessage = 'Không thể lấy thông tin đơn hàng. Vui lòng thử lại sau.';
          console.error('Error fetching order details:', error); // Log lỗi
        }
      });
    }
  }
  
}
