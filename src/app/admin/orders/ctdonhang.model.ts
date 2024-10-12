import { DonHang } from './donhang.model';
import { Sanpham } from '../products/product.model';

export interface CTDonHang {
  ctdh_id: number;
  donHang: DonHang;
  sanPham: Sanpham;
  ctdh_soluong: number;
  ctdh_gia: number;
}
