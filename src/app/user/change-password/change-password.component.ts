import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.changePasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]], // Thêm điều kiện tối thiểu 6 ký tự
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordsMatch });
  }    

  // Custom validator để kiểm tra hai mật khẩu có khớp nhau không
  passwordsMatch(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const { email, currentPassword, newPassword } = this.changePasswordForm.value;
  
      this.authService.changePassword(email, currentPassword, newPassword).subscribe(
        (response) => {
            console.log('Response:', response); // Log the response
            this.successMessage = response.message || 'Password changed successfully!';
            this.errorMessage = '';
    
            alert('Đã thay đổi thành công!');
    
            this.router.navigate(['/user']); // Replace with the desired route
        },
    );    
    }
    
  }
}
