export interface DonHang {
    dh_id?: number;
    dh_ngaydat: Date;
    dh_tenkh: string;
    dh_diachi: string;
    dh_sdt: string;
    dh_emailkh: string;
    trangthaiDH: {
        trangthaidh_id: number;
        trangthaidh_ten?: string;
    };
}
