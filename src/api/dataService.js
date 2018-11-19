/**
* Created by nghinv on Sat Oct 20 2018
* Copyright (c) 2018 nghinv@luci.vn
*/
import * as imgs from '../configs/imgs';

const serviceChoThueMayMoc = [
  {
    id: 1,
    name: 'Cho thuê máy bơm',
    image: imgs.serviceChoThueMayMoc.choThueMayBom
  },
  {
    id: 2,
    name: 'Cho thuê máy cắt bê tông',
    image: imgs.serviceChoThueMayMoc.choThueMayCatBeTong
  },
  {
    id: 3,
    name: 'Cho thuê máy đầm bàn',
    image: imgs.serviceChoThueMayMoc.choThueMayDamBan
  },
  {
    id: 4,
    name: 'Cho thuê máy đầm cóc',
    image: imgs.serviceChoThueMayMoc.choThueMayDamCoc
  },
  {
    id: 5,
    name: 'Cho thuê máy đầm dùi',
    image: imgs.serviceChoThueMayMoc.choThueMayDamDui
  },
  {
    id: 6,
    name: 'Cho thuê máy đục bê tông',
    image: imgs.serviceChoThueMayMoc.choThueMayDucBeTong
  },
  {
    id: 7,
    name: 'Cho thuê máy hút bụi',
    image: imgs.serviceChoThueMayMoc.choThueMayHutBui
  },
  {
    id: 8,
    name: 'Cho thuê máy khoan bê tông',
    image: imgs.serviceChoThueMayMoc.choThueMayKhoanBeTong
  },
  {
    id: 9,
    name: 'Cho thuê máy mài sàn bê tông',
    image: imgs.serviceChoThueMayMoc.choThueMayMaiSanBeTong
  },
  {
    id: 10,
    name: 'Cho thuê máy phát điện',
    image: imgs.serviceChoThueMayMoc.choThueMayPhatDien
  },
]

const serviceThiCongXayDung = [
  {
    id: 1,
    name: 'Cắt đường, bê tông Asphalt',
    image: imgs.serviceThiCongXayDung.catDuongBeTongAsphalt
  },
  {
    id: 2,
    name: 'Chống thấm dột',
    image: imgs.serviceThiCongXayDung.chongThamDot
  },
  {
    id: 3,
    name: 'Đầm nền nhà, đầm cọc',
    image: imgs.serviceThiCongXayDung.damNenNhaDamCoc
  },
  {
    id: 4,
    name: 'Khoan bê tông, khoan tường',
    image: imgs.serviceThiCongXayDung.khoanBeTongKhoanTuong
  },
  {
    id: 5,
    name: 'Khoan phá bê tông',
    image: imgs.serviceThiCongXayDung.khoanPhaBeTong
  },
  {
    id: 6,
    name: 'Khoan rút lõi bê tông',
    image: imgs.serviceThiCongXayDung.khoanRutLoiBeTong
  },
  {
    id: 7,
    name: 'Mài sàn bê tông',
    image: imgs.serviceThiCongXayDung.maiSanBeTong
  },
  {
    id: 8,
    name: 'Thi công sơn',
    image: imgs.serviceThiCongXayDung.thiCongSon
  },
]

export const service = [
  {
    id: 1,
    name: 'Cho thuê máy móc',
    image: imgs.service.choThueMayMoc,
    moreService: serviceChoThueMayMoc
  },
  {
    id: 2,
    name: 'Hút bể phốt',
    image: imgs.service.hutBePhot,
    moreService: []
  },
  {
    id: 3,
    name: 'Nạo vét cống, hố ga',
    image: imgs.service.naoVetCongHoGa,
    moreService: []
  },
  {
    id: 4,
    name: 'Sửa chữa bảo dưỡng bình nóng lạnh',
    image: imgs.service.suaChuaBaoDuongBinhNongLanh,
    moreService: []
  },
  {
    id: 5,
    name: 'Sửa chữa, bảo dưỡng điều hoà',
    image: imgs.service.suaChuaBaoDuongDieuHoa,
    moreService: []
  },
  {
    id: 6,
    name: 'Sửa chữa, bảo dưỡng máy giặt',
    image: imgs.service.suaChuaBaoDuongMayGiat,
    moreService: []
  },
  {
    id: 7,
    name: 'Sửa chữa, bảo dưỡng tủ lạnh',
    image: imgs.service.suaChuaBaoDuongTuLanh,
    moreService: []
  },
  {
    id: 8,
    name: 'Sửa chữa bếp từ hồng ngoại, lò vi sóng',
    image: imgs.service.suaChuaBepTuHongNgoaiLoViSong,
    moreService: []
  },
  {
    id: 9,
    name: 'Sửa chữa điện nước',
    image: imgs.service.suaChuaDienNuoc,
    moreService: []
  },
  {
    id: 10,
    name: 'Sửa chữa máy bơm',
    image: imgs.service.suaChuaMayBom,
    moreService: []
  },
  {
    id: 11,
    name: 'Sửa tivi tại nhà',
    image: imgs.service.suaTiviTaiNha,
    moreService: []
  },
  {
    id: 12,
    name: 'Thay rửa bể nước',
    image: imgs.service.thayRuaBeNuoc,
    moreService: []
  },
  {
    id: 13,
    name: 'Thi công xây dựng',
    image: imgs.service.thiCongXayDung,
    moreService: serviceThiCongXayDung
  },
  {
    id: 14,
    name: 'Thông tắc bồn cầu',
    image: imgs.service.thongTacBonCau,
    moreService: []
  },
  {
    id: 15,
    name: 'Thông tắc bồn rửa bát',
    image: imgs.service.thongTacBonRuaBat,
    moreService: []
  },
  {
    id: 16,
    name: 'Thông tắc chậu rửa bát',
    image: imgs.service.thongTacChauRuaBat,
    moreService: []
  },
  {
    id: 17,
    name: 'Thông tắc cống',
    image: imgs.service.thongTacCong
  }
]
