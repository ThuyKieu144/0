export interface TaiKhoan {
  taikhoan_id: number;
  taikhoan_ten: string;
  taikhoan_matkhau: string;
  taikhoan_email: string;
  quyen: {
    quyen_id: number;
    quyen_ten: string;
  };
}
