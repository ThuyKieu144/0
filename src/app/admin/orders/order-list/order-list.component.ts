import { Component, OnInit } from '@angular/core';
import { DonHangService } from '../donhang.service';
import { Router,RouterLink } from '@angular/router';
import { DonHang } from '../donhang.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
})
export class DonHangListComponent implements OnInit {

  donhangs: DonHang[] = [];
  searchQuery: string = '';

  constructor(
    private donHangService: DonHangService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.donHangService.getAllDonHang().subscribe((data) => {
      console.log('Orders:', data);
      // Sort orders by ID in descending order (newest first)
      // this.donhangs = data.sort((a, b) => b.dh_id - a.dh_id);
      this.donhangs = data.sort((a, b) => (b.dh_id ?? 0) - (a.dh_id ?? 0));

    });

  }

  // viewDetails(id: number): void {
  //   this.router.navigate(['/orders/details', id]);
  // }

  viewDetails(id: number): void {
    const targetUrl = `/admin/orders/details/${id}`;
    console.log('Navigating to order details for ID:', id);
    console.log('Target URL:', targetUrl);
    this.router.navigate([targetUrl]);
}




  confirmDonHang(id: number): void {
    this.donHangService.updateTrangThai(id, 3).subscribe(() => {
      alert('Đơn hàng đã giao thành công!');
      this.reloadData();
    });
  }

  cancelDonHang(id: number): void {
    const confirmed = confirm('Bạn có chắc chắn muốn hủy đơn hàng này?');
    if (confirmed) {
      this.donHangService.updateTrangThai(id, 4).subscribe(() => {
        alert('Đơn hàng đã được hủy');
        this.reloadData();
      });
    }
  }
  
  reloadData(): void {
    this.donHangService.getAllDonHang().subscribe((data) => {
      this.donhangs = data;
    });
  }

  get filteredOrders(): DonHang[] {
    if (!this.searchQuery) {
      return this.donhangs;
    }
  
    return this.donhangs.filter(donhang =>
      donhang.dh_tenkh.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      donhang.dh_diachi.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      donhang.dh_emailkh.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      donhang.dh_sdt.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      // Use the custom date formatting for searching
      this.formatDate(new Date(donhang.dh_ngaydat)).includes(this.searchQuery) ||
      donhang.trangthaiDH?.trangthaidh_ten?.toLowerCase().includes(this.searchQuery.toLowerCase())

      // donhang.trangthaiDH?.trangthaidh_ten?.toLowerCase().includes(searchTerm.toLowerCase())

    );
  }
  
  // Helper function to format date to dd-MM-yyyy
  formatDate(date: Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }
  

  
}
