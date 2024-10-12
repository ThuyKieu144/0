import { Component, OnInit } from '@angular/core';
import { CTDonHangService } from '../../admin/orders/ctdonhang.service';
import { CTDonHang } from '../../admin/orders/ctdonhang.model';
import { DonHangService } from '../../admin/orders/donhang.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  // orderDetails: CTDonHang[] = [];
  ordersWithDetails: any[] = [];
  email: string = '';

  constructor(
    private cTDonHangService: CTDonHangService,
    private donhangService: DonHangService,
    private authService: AuthService
  ) {
    this.email = this.authService.getUserEmail() || ''; // Get the user's email
  }

  ngOnInit(): void {
    if (this.email) {
      this.getOrderDetails();
    } else {
      console.error('User email is null or empty. Cannot fetch order details.');
    }
  }

  getOrderDetails(): void {
    this.donhangService.getOrdersByCustomerEmail(this.email).subscribe(
      (orders: any[]) => {
        this.ordersWithDetails = []; // Initialize to an empty array

        this.ordersWithDetails.sort((a, b) => Number(b.dh_id) - Number(a.dh_id));
        // Fetch CTDonHang for each order
        for (const order of orders) {
          this.cTDonHangService.getCTDonHangByDonHangId(order.dh_id).subscribe(
            (details: CTDonHang[]) => {
              // Combine order and its details
              const orderWithDetails = {
                ...order,
                details // Add the CTDonHang details to the order
              };
              this.ordersWithDetails.push(orderWithDetails); // Store the combined object
            },
            (error) => {
              console.error(`Error fetching details for order ID ${order.dh_id}:`, error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching order history:', error);
      }
    );
  }

  cancelOrder(orderId: number): void {
    if (confirm('Bạn có chắc muốn hủy đơn hàng này không?')) {
      this.donhangService.updateTrangThai(orderId, 4).subscribe(
        () => {
          alert('Đơn hàng đã được hủy.');
          this.getOrderDetails(); // Refresh the order history
        },
        (error) => {
          console.error('Failed to cancel the order', error);
        }
      );
    }
  }

  calculateTotalOrderPrice(details: CTDonHang[]): number {
    return details.reduce((total, item) => total + (item.ctdh_soluong * item.ctdh_gia), 0);
  }
}
