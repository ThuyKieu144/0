import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CTDonHang } from '../ctdonhang.model';
import { DonHang } from '../donhang.model';
import { CTDonHangService } from '../ctdonhang.service';
import { DonHangService } from '../donhang.service';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink], 
})
export class OrderDetailsComponent implements OnInit {
  order: DonHang = {} as DonHang; 
  orderId: number;
  ctDonHangs: CTDonHang[] = [];

  constructor(
    private route: ActivatedRoute,
    private ctDonHangService: CTDonHangService,
    private donHangService: DonHangService,
    private router: Router
  ) { 
    this.orderId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['id']; // The '+' converts the string to a number
      console.log('Order ID from route:', this.orderId);
      this.loadOrderDetails();
      // Fetch order details here using this.orderId
    });

    this.ctDonHangService.getCTDonHangByDonHangId(this.orderId).subscribe((data) => {
      console.log('Order details:', data);

      this.ctDonHangs = data;
    });
  }

  loadOrderDetails(): void {
    this.donHangService.getDonHangById(this.orderId).subscribe(
      (data: DonHang) => {
        this.order = data;
        console.log('Order details:', this.order);
      },
      (error) => {
        console.error('Error fetching order details:', error);
      }
    );
  }

  loadCTDonHangs(): void {
    this.ctDonHangService.getCTDonHangByDonHangId(this.orderId).subscribe(
      (data: CTDonHang[]) => {
        this.ctDonHangs = data;
      },
      (error) => {
        console.error('Lỗi khi load chi tiết đơn hàng: ', error);
      }
    );
  }

  confirmCancel(orderId: number): void {
    const confirmed = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?');
    if (confirmed) {
      this.updateTrangThai(orderId, 4);  // Call the function to update the order status to "Đã hủy"
    }
  }
  
  // Method to update order status
  updateTrangThai(orderId: number, trangThaiId: number): void {
    this.donHangService.updateTrangThai(orderId, trangThaiId).subscribe(() => {
      alert('Trạng thái đơn hàng đã được cập nhật');
      this.loadOrderDetails(); // Reload order details after status update
    });
  }

  getTotalValue(): number {
    return this.ctDonHangs.reduce((total, ct) => total + (ct.ctdh_gia * ct.ctdh_soluong), 0); 
  }

  goBack(): void {
    this.router.navigate(['/admin/orders']);
  }
}
