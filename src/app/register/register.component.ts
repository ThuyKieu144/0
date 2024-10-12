import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TaiKhoan } from '../admin/accounts/account.model';
import { AccountService } from '../admin/accounts/account.server';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule], // Include CommonModule here
})
export class RegisterComponent {
  taiKhoan: TaiKhoan = {
    taikhoan_id: 0,
    taikhoan_ten: '',
    taikhoan_matkhau: '',
    taikhoan_email: '',
    quyen: { quyen_id: 2, quyen_ten: 'User' }  // Default role is 'User'
  };

  errorMessage: string = '';
  emailExists: boolean = false; // Initialize emailExists
  existingEmails: string[] = []; // This should be populated from your API

  constructor(private accountService: AccountService, private router: Router) {}

  // checkEmailExists() {
  //   if (!this.taiKhoan.taikhoan_email) return; // If email is empty, do not check
  //   this.accountService.checkEmail(this.taiKhoan.taikhoan_email).subscribe(
  //     (exists) => {
  //       this.emailExists = exists; // Assuming your API returns true/false
  //     },
  //     (error) => {
  //       console.error('Email check error:', error);
  //     }
  //   );
  // }

  checkEmailExists() {
    if (!this.taiKhoan.taikhoan_email || !this.isEmailValid(this.taiKhoan.taikhoan_email)) {
      this.emailExists = false; // Reset emailExists if the email is invalid
      return; // If email is empty or invalid, do not check
    }
  
    this.accountService.checkEmail(this.taiKhoan.taikhoan_email).subscribe(
      (exists) => {
        this.emailExists = exists; // Assuming your API returns true/false
      },
      (error) => {
        console.error('Email check error:', error);
      }
    );
  }
  

  isEmailValid(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailPattern.test(email);
  }

  onRegister() {
      
    if (this.emailExists) {
      this.errorMessage = 'Email already exists. Please use a different email.';
      return;
    }
  
    // Proceed with registration if all checks pass
    this.accountService.createTaiKhoan(this.taiKhoan).subscribe(
      () => {
        alert('Registration successful!');
        this.router.navigate(['/login']); // Navigate back to login after successful registration
      },
      (error) => {
        console.error('Registration error:', error);
        // this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }

  
  // onRegister() {
  //   if (this.emailExists) {
  //     this.errorMessage = 'Email already exists. Please use a different email.';
  //     return;
  //   }
    
  //   this.accountService.createTaiKhoan(this.taiKhoan).subscribe(
  //     () => {
  //       alert('Registration successful!');
  //       this.router.navigate(['/login']); // Navigate back to login after successful registration
  //     },
  //     (error) => {
  //       console.error('Registration error:', error);
  //       this.errorMessage = 'Registration failed. Please try again.';
  //     }
  //   );
  // }
}
