const db = require("../models");
const { Op } = require("sequelize");
class TinbdsController {

  //[GET] /batdongsan/create
  async create(req, res) {
    try {
      let idlh="";
      if(req.body.LienHeLHMa){
        idlh = req.body.LienHeLHMa;
      }
      else{
      let lienhe = await db.LienHe.create({
        LH_TenChuSoHuu: req.body.LH_TenChuSoHuu,
        LH_SoDienThoai: req.body.LH_SoDienThoai,
        LH_Email: req.body.LH_Email,
        LH_DiaChi: req.body.LH_DiaChi
      })

        idlh = lienhe.LH_Ma;
     }

      let bds = await db.TinBatDongSan.create({
        BDS_Ten: req.body.BDS_Ten,
        BDS_DienTich: req.body.BDS_DienTich,
        BDS_Gia: req.body.BDS_Gia,
        BDS_SoPhongNgu: req.body.BDS_SoPhongNgu,
        BDS_SoPhongTam: req.body.BDS_SoPhongTam,
        BDS_NgayDang: req.body.BDS_NgayDang,
        BDS_NgayHetHan: req.body.BDS_NgayHetHan,
        BDS_MoTaChiTiet: req.body.BDS_MoTaChiTiet,
        BDS_DiaChiCuThe: req.body.BDS_DiaChiCuThe,
        BDS_TrangThai: req.body.BDS_TrangThai,
        UserId: req.body.UserId,
        LoaiTienTeLTTMa: req.body.LoaiTienTeLTTMa,
        LoaiGiaoDichLGDMa: req.body.LoaiGiaoDichLGDMa,
        LoaiBDLMa: req.body.LoaiBDLMa,
        LienHeLHMa: idlh,
        XaPhuongXPMa: req.body.XaPhuongXPMa

      })

      let idbds = bds.BDS_Ma;
      if (req.body.PL_Ten) {
        let phaply = await db.TinhTrangPhapLy.create({
          PL_Ten: req.body.PL_Ten,
          TinBatDongSanBDSMa: idbds
        })
      }
      console.log(req.files)
      if (req.files) {

        let phaply = await req.files.forEach(element => {
          db.HinhBDS.create({
            HA_DuongDan: element.filename,
            TinBatDongSanBDSMa: idbds
          })

        })


      }

      res.status(200).json({ status: "success", message: "Thêm thành công!" });

    }
    catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }


  ////[GET] /batdongsan/createus
  async createUs(req, res) {
    try {

      let lienhe = await db.LienHe.create({
        LH_TenChuSoHuu: req.body.LH_TenChuSoHuu,
        LH_SoDienThoai: req.body.LH_SoDienThoai,
        LH_Email: req.body.LH_Email,
        LH_DiaChi: req.body.LH_DiaChi
      })

      let idlh = lienhe.LH_Ma;
        // .then(data => {
        //   res.status(200).json({ status: "success", message: "Thêm thành công!" });
        // })
        // .catch(err => {
        //   console.log(err);
        //   res.status(500).json({ status: "failed", message: "server has an error" })
        // })

      let bds = await db.TinBatDongSan.create({
        BDS_Ten: req.body.BDS_Ten,
        BDS_DienTich: req.body.BDS_DienTich,
        BDS_Gia: req.body.BDS_Gia,
        BDS_SoPhongNgu: req.body.BDS_SoPhongNgu,
        BDS_SoPhongTam: req.body.BDS_SoPhongTam,
        BDS_NgayDang: req.body.BDS_NgayDang,
        BDS_NgayHetHan: req.body.BDS_NgayHetHan,
        BDS_MoTaChiTiet: req.body.BDS_MoTaChiTiet,
        BDS_DiaChiCuThe: req.body.BDS_DiaChiCuThe,
        BDS_TrangThai: req.body.BDS_TrangThai,
        UserId: req.body.UserId,
        LoaiTienTeLTTMa: req.body.LoaiTienTeLTTMa,
        LoaiGiaoDichLGDMa: req.body.LoaiGiaoDichLGDMa,
        LoaiBDLMa: req.body.LoaiBDLMa,
        LienHeLHMa: idlh,
        XaPhuongXPMa: req.body.XaPhuongXPMa

      })

      let idbds = bds.BDS_Ma;
      if (req.body.PL_Ten) {
        let phaply = await db.TinhTrangPhapLy.create({
          PL_Ten: req.body.PL_Ten,
          TinBatDongSanBDSMa: idbds
        })
      }
      console.log(req.files)
      if (req.files) {

        let phaply = await req.files.forEach(element => {
          db.HinhBDS.create({
            HA_DuongDan: element.filename,
            TinBatDongSanBDSMa: idbds
          })

        })


      }

      res.status(200).json({ status: "success", message: "Thêm thành công!" });

    }
    catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }




  async show(req, res) {
    let detail = await db.TinBatDongSan.findOne({
      where: { BDS_Ma: req.params.id },
      include: [
        { model: db.LoaiBDS },
        { model: db.LoaiGiaoDich },
        { model: db.LoaiTienTe },
        { model: db.LienHe },
        { model: db.User },
        { model: db.TinhTrangPhapLy },
        { model: db.HinhBDS },
      ]

    })
      .then(bds => {
        res.send([bds]);
      })
      .catch(err => { throw err });
  }

  
  async showUD(req, res) {
    let detail = await db.TinBatDongSan.findOne({
      where: { BDS_Ma: req.params.id },
      include: [
        { model: db.LoaiBDS },
        { model: db.LoaiGiaoDich },
        { model: db.LoaiTienTe },
        { model: db.LienHe },
        { model: db.User },
        { model: db.TinhTrangPhapLy },
        { model: db.HinhBDS },
      ]

    })
      .then(bds => {
        res.send(bds);
      })
      .catch(err => { throw err });
  }
  //not approved 

  //[GET] batdongsan/user/notapproved
  async TinUserNotApproved(req, res) {
    let detail = await db.TinBatDongSan.findAll({
      where: {
        
          BDS_NgayHetHan: {
            
            [Op.gt]: new Date() 
          },
           UserId: req.userId ,
          BDS_TrangThai: "Chưa duyệt" 
        
      },order: [
        ['BDS_Ma', 'DESC']
      
    ],
      include: [
        { model: db.LoaiBDS },
        { model: db.LoaiGiaoDich },
        { model: db.LoaiTienTe },
        { model: db.LienHe },
        { model: db.User },
        { model: db.TinhTrangPhapLy },
        { model: db.HinhBDS }
      ]

    })
      .then(bds => {
        res.send(bds);
      })
      .catch(err => { throw err });
  }

  //[GET] batdongsan/user/approved
  async TinUserApproved(req, res) {
    let detail = await db.TinBatDongSan.findAll({
      where: {
        BDS_NgayHetHan: {
            
          [Op.gt]: new Date() 
        },
           UserId: req.userId ,
          BDS_TrangThai: "Đã duyệt" 
        
      },
      include: [
        { model: db.LoaiBDS },
        { model: db.LoaiGiaoDich },
        { model: db.LoaiTienTe },
        { model: db.LienHe },
        { model: db.User },
        { model: db.TinhTrangPhapLy },
        { model: db.HinhBDS }
      ]

    })
      .then(bds => {
        res.send(bds);
      })
      .catch(err => { throw err });
  }

  // [GET] /batdongsan/user/tinhethan
  // [GET] batdongsan/hethan/
        
  async UserTinHetHan(req, res) {
    const TinBatDongSan = db.TinBatDongSan;
    try {
      let bdsall = await TinBatDongSan.findAll({
        where: {
          BDS_NgayHetHan: {
            
              [Op.lte]: new Date() 
            },
            UserId: req.userId   
          
        }
        ,
        order: [
          ['BDS_Ma', 'DESC']
        
      ],
        include: [{
          model: db.LoaiBDS
        },
        { model: db.LoaiGiaoDich },
        { model: db.LoaiTienTe },
        { model: db.LienHe },
        {
          model: db.User,
          include: [{
            model: db.Role,

          }]
        },
        { model: db.TinhTrangPhapLy },
        { model: db.HinhBDS },
        ]


      })
        .then(bdsall => {
          res.send(bdsall);
        })
        .catch(err => { throw err });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }

  // [GET] /batdongsan/  .getTime() < BDS_NgayHetHan.getTime() }
        
  async findAll(req, res) {
    const TinBatDongSan = db.TinBatDongSan;
    try {
      let bdsall = await TinBatDongSan.findAll({
        where: {
          BDS_NgayHetHan: {
            
              [Op.gt]: new Date() 
            },
          BDS_TrangThai: "Đã duyệt" 
          
        }
          // '$TinBatDongSan.User.UserId$':1 


        ,
        order: [
          ['BDS_Ma', 'DESC']
        
      ],
        include: [{
          model: db.LoaiBDS
        },
        { model: db.LoaiGiaoDich },
        { model: db.LoaiTienTe },
        { model: db.LienHe },
        {
          model: db.User,
          include: [{
            model: db.Role,

          }]
        },
        { model: db.TinhTrangPhapLy },
        { model: db.HinhBDS },
        ]


      })
        .then(bdsall => {
          res.send(bdsall);
        })
        .catch(err => { throw err });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }

  // [GET] batdongsan/hethan/
        
  async TinHetHan(req, res) {
    const TinBatDongSan = db.TinBatDongSan;
    try {
      let bdsall = await TinBatDongSan.findAll({
        where: {
          BDS_NgayHetHan: {
            
              [Op.lte]: new Date() 
            },
         
          
        }
          // '$TinBatDongSan.User.UserId$':1 


        ,
        order: [
          ['BDS_Ma', 'DESC']
        
      ],
        include: [{
          model: db.LoaiBDS
        },
        { model: db.LoaiGiaoDich },
        { model: db.LoaiTienTe },
        { model: db.LienHe },
        {
          model: db.User,
          include: [{
            model: db.Role,

          }]
        },
        { model: db.TinhTrangPhapLy },
        { model: db.HinhBDS },
        ]


      })
        .then(bdsall => {
          res.send(bdsall);
        })
        .catch(err => { throw err });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }

  // [GET] /batdongsan/notapproved
  async findAllNotApproved(req, res) {
    const TinBatDongSan = db.TinBatDongSan;
    try {
      let bdsall = await TinBatDongSan.findAll({
        where: {

          BDS_TrangThai: "Chưa duyệt",
          


        },
        include: [{
          model: db.LoaiBDS
        },
        { model: db.LoaiGiaoDich },
        { model: db.LoaiTienTe },
        { model: db.LienHe },
        {
          model: db.User,
          include: [{
            model: db.Role,

          }]
        },
        { model: db.TinhTrangPhapLy },
        { model: db.HinhBDS },
        ]


      })
        .then(bdsall => {
          res.send(bdsall);
        })
        .catch(err => { throw err });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }

  //[UPDATE] batdongsan/id

  async update(req, res) {
    const id = req.params.id;
    let deletenews = await db.TinBatDongSan.update(req.body, {
      where: { BDS_Ma: req.params.id },
      include: [
        { model: db.LoaiBDS },
        { model: db.LoaiGiaoDich },
        { model: db.LoaiTienTe },
        { model: db.LienHe },
        { model: db.User },
        { model: db.TinhTrangPhapLy },
        { model: db.HinhBDS },
      ]
    })

      .then(num => {
        if (num == 1) {
          res.send({
            message: "updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update News with id=${id}. Maybe News was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating News with id=" + id
        });
      });

  }

  /// [DELETE] news/id
  async delete(req, res) {
    const id = req.params.id;
    let deletebds = await db.TinBatDongSan.destroy({
      where: { BDS_Ma: id }
    })

      .then(num => {
        if (num == 1) {
          res.send({
            message: "Deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete. Maybe News was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete News with id=" + id
        });
      });
  }




  async TinUserAll(req, res) {
    let detail = await db.TinBatDongSan.findAll({
      //   where: {
      //     $and: [

      //         {'$loaigiaodiches.LGD_Ma$' : 1}

      //     ]
      // },
      include: [
        { model: db.LoaiBDS },
        { model: db.LoaiGiaoDich },
        { model: db.LoaiTienTe },
        { model: db.LienHe },
        {
          model: db.User
          , include: [{
            model: db.Role
          }]
        },
        { model: db.TinhTrangPhapLy },
        { model: db.HinhBDS },

      ]

    })
      .then(bds => {
        res.send(bds);
      })
      .catch(err => { throw err });
  }

  // phan loai bat dong san 
  async LoaiTin(req, res) {
    let loaitin = await db.TinBatDongSan.findAll({
      where: {
        
        BDS_NgayHetHan: {
            
          [Op.gt]: new Date() 
        },
           LoaiGiaoDichLGDMa: req.params.idgd ,
           LoaiBDLMa: req.params.idbds 
        
      },
      include: [
        { model: db.LoaiBDS },
        { model: db.LoaiGiaoDich },
        { model: db.LoaiTienTe },
        { model: db.LienHe },
        {
          model: db.User
          , include: [{
            model: db.Role
          }]
        },
        { model: db.TinhTrangPhapLy },
        { model: db.HinhBDS },

      ]

    })
      .then(bds => {
        res.send(bds);
      })
      .catch(err => { throw err });
  }


  async TinGioiHan(req, res) {
    let loaitin = await db.TinBatDongSan.findAll({
      limit: 5,
      where: {
        LoaiGiaoDichLGDMa: req.params.idgd
      },
      include: [
        { model: db.LoaiBDS },
        { model: db.LoaiGiaoDich },
        { model: db.LoaiTienTe },
        { model: db.LienHe },
        {
          model: db.User
          , include: [{
            model: db.Role
          }]
        },
        { model: db.TinhTrangPhapLy },
        { model: db.HinhBDS },

      ]

    })
      .then(bds => {
        res.send(bds);
      })
      .catch(err => { throw err });
  }



}







// A.findAll({
//   where: {
//       $or: [
//           {'$B.userId$' : 100},
//           {'$C.userId$' : 100}
//       ]
//   },
//   include: [{
//       model: B,
//       required: false

//   }, {
//       model: C,
//       required: false
//   }]
// }); 

module.exports = new TinbdsController;