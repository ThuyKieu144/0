import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HttpClientModule, // Thêm HttpClientModule vào imports
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Sửa thành styleUrls
})
export class AppComponent {
  title = 'angular_crud';
}
