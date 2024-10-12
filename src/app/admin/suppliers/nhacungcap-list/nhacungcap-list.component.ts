import { Component, OnInit } from '@angular/core';
import { NhacungcapService } from '../suppliers.service';
import { Nhacungcap } from '../suppliers.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-nhacungcap-list',
  templateUrl: './nhacungcap-list.component.html',
  styleUrls: ['./nhacungcap-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  
})
export class NhacungcapListComponent implements OnInit {
  nhacungcap: Nhacungcap[] = [];
  searchQuery: string = '';

  constructor(
    private nhacungcapService: NhacungcapService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nhacungcapService.getNcc().subscribe((data) => {
      this.nhacungcap = data;
    });
  }

  editNhacungcap(id: number): void {
    this.router.navigate(['/admin/suppliers/edit', id]);
  }

  deleteNhacungcap(id: number): void {
    const confirmed = window.confirm('Bạn có chắc muốn xóa nhà cung cấp này?');
    if (confirmed) {
      this.nhacungcapService.deleteNcc(id).subscribe(() => {
        this.nhacungcap = this.nhacungcap.filter((c) => c.ncc_id !== id);
      });
      alert("Xóa thành công!")
    }
  }

  get filteredNhacungcap(): Nhacungcap[] {
    if (!this.searchQuery) {
      return this.nhacungcap;
    }
    return this.nhacungcap.filter(nhacungcap =>
      nhacungcap.ncc_ten.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      nhacungcap.ncc_diachi.toLowerCase().includes(this.searchQuery) ||
      nhacungcap.ncc_sdt.includes(this.searchQuery) ||
      nhacungcap.ncc_email.toLowerCase().includes(this.searchQuery)
    );
  }
  
}
