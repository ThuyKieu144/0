import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.server';
import { TaiKhoan } from '../account.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
})
export class AccountListComponent implements OnInit {
  taikhoan: TaiKhoan[] = [];
  searchQuery: string = '';
  filterRole: string = 'All'; // Lọc theo quyền admin/user/all

  constructor(
    private taikhoanService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taikhoanService.getTaiKhoans().subscribe((data) => {
      console.log('Account:', data);

      this.taikhoan = data;
    });
  }

  editTaiKhoan(id: number): void {
    this.router.navigate(['/admin/accounts/edit', id]);
  }

  deleteTaiKhoan(id: number): void {
    const confirmed = window.confirm('Bạn có chắc muốn xóa tài khoản này?');
    if (confirmed) {
      this.taikhoanService.deleteTaiKhoan(id).subscribe(() => {
        this.taikhoan = this.taikhoan.filter((c) => c.taikhoan_id !== id);
      });
      alert("Xóa thành công!");
    }
  }

  setFilter(role: string): void {
    this.filterRole = role;
  }

  get filteredTaiKhoan(): TaiKhoan[] {
    let filteredTaiKhoan = this.taikhoan;

    // Lọc theo quyền
    if (this.filterRole === 'Admin') {
      filteredTaiKhoan = filteredTaiKhoan.filter(taikhoan => taikhoan.quyen.quyen_ten === 'Admin');
    } else if (this.filterRole === 'User') {
      filteredTaiKhoan = filteredTaiKhoan.filter(taikhoan => taikhoan.quyen.quyen_ten === 'User');
    }

    // Lọc theo tìm kiếm
    if (this.searchQuery) {
      filteredTaiKhoan = filteredTaiKhoan.filter(taikhoan =>
        taikhoan.taikhoan_ten.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        taikhoan.taikhoan_email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    return filteredTaiKhoan;
  }
}
