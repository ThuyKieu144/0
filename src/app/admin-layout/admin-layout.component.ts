import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service'; // Make sure this path is correct

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  email: string | null = ''; // Initialize email as null

  constructor(private authService: AuthService) {
    this.email = this.authService.getUserEmail(); // Get the user's email from the service
  }
}
