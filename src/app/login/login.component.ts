import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; // Ensure the import is correct

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  loginObj: Login;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { // Inject AuthService
    this.loginObj = new Login();
  }

  onLogin() {
    this.http.post("http://localhost:8080/auth/login", this.loginObj).subscribe(
      (res: any) => {
        if (res.role) {
          this.authService.setUserEmail(this.loginObj.email); // Store user's email
          if (res.role === 'Admin') {
            alert("Admin login successful");
            this.router.navigate(['/admin']);
          } else if (res.role === 'User') {
            alert("User login successful");
            this.router.navigate(['/user']);
          }
        } else {
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']); // Điều hướng đến trang đăng ký
  }
  
}

export class Login {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
