const db = require("../models");
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
class ThongKeController {
//[GET] /thongke/tintheothang
async countTinThang(req, res) {
    let users = await db.sequelize.query("select month(`tinbatdongsans`.`createdAt`) as `month`, count(`tinbatdongsans`.`BDS_Ma`) as `sl_Bds` FROM `tinbatdongsans` where (year(`tinbatdongsans`.`createdAt`) = year(current_date())) group by `month`", { type: QueryTypes.SELECT }) 
    .then(data => {
    res.send(data);
  })
  .catch(err => { throw err });
  }

//[GET] /thongke/tinloaitheothang

async countTinLoaiThue(req, res) {
    let loai = await db.sequelize.query("select month(`t`.`createdAt`) as `month`,`LoaiBDLMa`,`L_Ten`, count(`t`.`LoaiBDLMa`) as `soloai` FROM `tinbatdongsans` t join `loaibds` l on t.LoaiBDLMa=l.L_Ma where `LoaiGiaoDichLGDMa` = 2 and `BDS_TrangThai` = 'Đã duyệt' and  (year(`t`.`createdAt`) = year(current_date())) group by `month`,`LoaiBDLMa`", { type: QueryTypes.SELECT }) 
    .then(data => {
    res.send(data);
  })
  .catch(err => { throw err });
  }
  

  async countTinLoaiMua(req, res) {
    let loai = await db.sequelize.query("select month(`t`.`createdAt`) as `month`,`LoaiBDLMa`,`L_Ten`, count(`t`.`LoaiBDLMa`) as `soloai` FROM `tinbatdongsans` t join `loaibds` l on t.LoaiBDLMa=l.L_Ma where `LoaiGiaoDichLGDMa` = 1 and `BDS_TrangThai` = 'Đã duyệt' and  (year(`t`.`createdAt`) = year(current_date())) group by `month`,`LoaiBDLMa`", { type: QueryTypes.SELECT }) 
    .then(data => {
    res.send(data);
  })
  .catch(err => { throw err });
  }

//[GET] thongke/tonguser

async CountUser(req, res) {
  let tin = await db.UserRole.count({
    where: {
      RoleQTCMa: 3
    }
  }
    
  )
  .then(data => {
  res.send(data.toString());
})
.catch(err => { throw err });
}
//[GET] /thongke/tongtin
  async countTin(req, res) {
    let tin = await db.TinBatDongSan.count({
      where: {
        BDS_NgayHetHan: {
            
          [Op.gt]: new Date() 
        },
         BDS_TrangThai: "Đã duyệt" }
    })
    .then(data => {
    res.send(data.toString());
  })
  .catch(err => { throw err });
  }
  

}



module.exports = new ThongKeController();