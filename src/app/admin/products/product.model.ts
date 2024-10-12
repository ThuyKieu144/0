
export interface Sanpham {
    sp_id: number;
    sp_ten: string;
    sp_gia: number;
    sp_slton: number;
    sp_mota: string;
    sp_hinhanh: string;
    nhacungcap: {
        ncc_id: number;
        ncc_ten: string;
      };    
  }
  