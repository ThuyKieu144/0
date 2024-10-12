import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NhacungcapService } from '../suppliers.service';
import { Nhacungcap } from '../suppliers.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nhacungcap-form',
  standalone: true,
  templateUrl: './nhacungcap-form.component.html',
  styleUrl: './nhacungcap-form.component.scss',  
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
})
export class NhacungcapFormComponent implements OnInit {

  nhacungcap: Nhacungcap = {
    ncc_id: 0,
    ncc_ten: '',
    ncc_diachi: '',
    ncc_sdt: '',
    ncc_email: ''
  }
  message:string = '';

  constructor(
    private nhacungcapService: NhacungcapService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.nhacungcapService.getNccById(Number(id)).subscribe(
        (nhacungcap) => {
          this.nhacungcap = nhacungcap;
        },
        (error) => console.error(error)
      );
    }
  }

  saveNhacungcap(): void {
    if (this.nhacungcap.ncc_id) {
      this.nhacungcapService.updateNcc(this.nhacungcap.ncc_id, this.nhacungcap).subscribe(() => {
        this.message = 'Nhà cung cấp đã được cập nhật thành công!';
        alert(this.message);
        this.router.navigate(['/admin/suppliers']);
      });
    } else {
      this.nhacungcapService.createNcc(this.nhacungcap).subscribe(() => {
        this.message = 'Nhà cung cấp đã được thêm mới thành công!';
        alert(this.message);
        this.router.navigate(['/admin/suppliers']);
      });
    }
  }

}
