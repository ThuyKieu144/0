import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.server';
import { TaiKhoan } from '../account.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-form',
  standalone: true,
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class AccountFormComponent implements OnInit {
  taikhoan: TaiKhoan = {
    taikhoan_id: 0,
    taikhoan_ten: '',
    taikhoan_email: '',
    taikhoan_matkhau: '',
    quyen: {
      quyen_id: 2, // 1 for user by default
      quyen_ten: 'User' // Default quyền tên là User
    }
  };

  originalEmail: string | null = null;
  emailExists: boolean = false;
  message: string = '';
  confirmPassword: string = ''; 

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.accountService.getTaiKhoanById(Number(id)).subscribe(
        (account) => {
          this.taikhoan = account;
          this.originalEmail = account.taikhoan_email; 
        },
        (error) => console.error(error)
      );
    }
  }

  passwordsMatch(): boolean {
    return this.taikhoan.taikhoan_matkhau === this.confirmPassword; // Check if passwords match
  }

  saveTaiKhoan(): void {
    if (!this.emailExists) {
      if (this.taikhoan.taikhoan_id) {
        this.accountService.updateTaiKhoan(this.taikhoan.taikhoan_id, this.taikhoan).subscribe(() => {
          this.message = 'Tài khoản đã được cập nhật thành công!';
          alert(this.message);
          this.router.navigate(['/admin/accounts']);
        });
      } else {
        this.accountService.createTaiKhoan(this.taikhoan).subscribe(() => {
          this.message = 'Tài khoản đã được thêm mới thành công!';
          alert(this.message);
          this.router.navigate(['/admin/accounts']);
        });
      }
    }else {
      alert('Email đã tồn tại. Không thể tạo hoặc cập nhật tài khoản.');
    }
  }

  isEmailValid(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  checkEmailExists(): void {
    // Kiểm tra tính hợp lệ của email
    if (this.isEmailValid(this.taikhoan.taikhoan_email)) {
      // Only check if the email has changed (or if it's a new account)
      if (!this.taikhoan.taikhoan_id || this.taikhoan.taikhoan_email !== this.originalEmail) {
        this.accountService.checkEmail(this.taikhoan.taikhoan_email).subscribe(
          (exists) => {
            this.emailExists = exists; // Cập nhật trạng thái emailExists
            if (this.emailExists) {
              this.message = 'Email đã tồn tại. Vui lòng chọn email khác.';
            } else {
              this.message = ''; // Reset thông điệp nếu email không tồn tại
            }
          },
          (error) => console.error('Error checking email:', error) // Xử lý lỗi
        );
      } else {
        this.emailExists = false; // Reset if editing with the same email
        this.message = ''; // Reset message if email has not changed
      }
    } else {
      this.emailExists = false; // Reset nếu email không hợp lệ
      this.message = 'Email không hợp lệ. Vui lòng nhập lại.';
    }
  }
  
  
}
