import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SanphamService } from '../product.service';
import { Sanpham } from '../product.model';
import { Nhacungcap } from '../../suppliers/suppliers.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NhacungcapService } from '../../suppliers/suppliers.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class ProductFormComponent implements OnInit {
  sanpham: Sanpham = {
    sp_id: 0,
    sp_ten: '',
    sp_gia: 1,
    sp_mota: '',
    sp_slton: 1,
    nhacungcap:{
      ncc_id: 1,
      ncc_ten: '',
    },
    sp_hinhanh: ''
  };

  suppliers: Nhacungcap[] = [];
  message: string = '';
  selectedFile: File | null = null;
  imageError: string = '';
  imagePreview: string | null = null;
  isFormSubmitted: boolean = false; // Kiểm tra xem form đã submit hay chưa

  
  constructor(
    private sanphamService: SanphamService,
    private nhacungcapService: NhacungcapService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sanphamService.getSanphamById(Number(id)).subscribe(
        (sanpham) => {
          this.sanpham = sanpham;
          // Ensure nhacungcap is populated correctly
          if (!this.sanpham.nhacungcap) {
            this.sanpham.nhacungcap = { ncc_id: 1, ncc_ten: '' }; // Initialize if undefined
          }
        },
        (error) => console.error(error)
      );
    }

    
  
    this.nhacungcapService.getNcc().subscribe(
      (data) => {
        this.suppliers = data;
      },
      (error) => console.error(error)
    );
  }
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const selectedFile = target.files[0]; // Get the selected file

        console.log('Selected file:', selectedFile);
        console.log('File type:', selectedFile.type);
        console.log('File name:', selectedFile.name); // Log the file name

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(selectedFile.type)) {
            this.imageError = 'Chỉ cho phép tải lên các định dạng hình ảnh: JPEG, PNG, GIF.';
            this.selectedFile = null;
            this.imagePreview = ''; // Reset preview
            return;
        }

        // Validate file size
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (selectedFile.size > maxSize) {
            this.imageError = 'Kích thước hình ảnh không được vượt quá 5MB.';
            this.selectedFile = null;
            this.imagePreview = ''; // Reset preview
            return;
        }

        // If everything is valid, assign the values
        this.selectedFile = selectedFile; // Assign selected file
        this.sanpham.sp_hinhanh = this.selectedFile.name; // Store only the file name
        this.imagePreview = URL.createObjectURL(this.selectedFile); // Preview the image
        this.imageError = ''; // Clear any error messages
    } 
  }


  saveProduct(): void {
    this.isFormSubmitted = true;

    // Kiểm tra nếu chưa có tên hình ảnh
    if (!this.sanpham.sp_hinhanh || this.sanpham.sp_hinhanh.trim() === '') {
        this.imageError = 'Vui lòng nhập tên hình ảnh.';
        return;
    }

    // Nếu sản phẩm có ID -> cập nhật, nếu không thì tạo mới
    if (this.sanpham.sp_id) {
        this.sanphamService.updateSanpham(this.sanpham.sp_id,this.sanpham).subscribe(()=>{
          this.message = "Sản phẩm đã được cập nhật thành công";
          alert(this.message);
          this.router.navigate(['/admin/products']);
        });
    } else {
        // Tạo mới sản phẩm
        this.sanphamService.createSanpham(this.sanpham).subscribe(()=>{
          this.message = "Sản phẩm đã được tạo mới thành công";
          alert(this.message);
          this.router.navigate(['/admin/products']);
        });
    }
  }
}

