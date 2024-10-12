import { Component, OnInit } from '@angular/core';
import { SanphamService } from '../product.service';
import { Sanpham } from '../product.model';
import { Nhacungcap } from '../../suppliers/suppliers.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class ProductListComponent implements OnInit {
  sanpham: Sanpham[] = [];
  nccList: Nhacungcap[] = []; // Danh sách nhà cung cấp
  searchQuery: string = '';
  filterNcc: number | null = null; // ID nhà cung cấp đã chọn

  constructor(
    private sanphamService: SanphamService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sanphamService.getAllSanpham().subscribe((data) => {
      console.log('Products:', data); // Thêm log để kiểm tra dữ liệu
      this.sanpham = data;
    });
  }

  

  editProduct(id: number): void {
    this.router.navigate(['/admin/products/edit', id]);
  }

  deleteProduct(id: number): void {
    const confirmed = window.confirm('Bạn có chắc muốn xóa sản phẩm này không?');
    if (confirmed) {
      this.sanphamService.deleteSanpham(id).subscribe(() => {
        this.sanpham = this.sanpham.filter((p) => p.sp_id !== id);
        alert('Xóa thành công!');
      });
    }
  }

  // setFilter(category: string): void {
  //   this.filterCategory = category;
  // }

  setFilter(nccId: number | null): void {
    this.filterNcc = nccId;
  }

  get filteredProducts(): Sanpham[] {

    if(!this.searchQuery){
      return this.sanpham;
    }
    return this.sanpham.filter(sanpham=>
      sanpham.sp_ten.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      sanpham.sp_mota.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      sanpham.nhacungcap.ncc_ten.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      sanpham.sp_gia.toString().includes(this.searchQuery) || // Convert to string
      sanpham.sp_slton.toString().includes(this.searchQuery) // Convert to string

    )
  }
}
