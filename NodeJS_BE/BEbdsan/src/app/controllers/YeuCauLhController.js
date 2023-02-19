const db = require("../models");
const { Op } = require("sequelize");
class YeuCauLhController {
    //[GET] yeucaulienhe/
  async findAll(req, res) {
    try {
      let yeucau = await db.YeuCauLienHe.findAll({
        include:[
          { model: db.TinBatDongSan},
          { model: db.User}
           ],
           order: [
            ['createdAt', 'DESC']
          
        ]
      })

        .then(data => {
          res.send(data);
        })
        .catch(err => { throw err });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }
  
  //[GET] /lienhe/create
  async create(req, res) {
    let lienhe = await db.YeuCauLienHe.create({
        TinBDS_Ma: req.body.TinBDS_Ma,
        UserId: req.userId,
        YC_NoiDung: req.body.YC_NoiDung,
        TinBatDongSanBDSMa: req.body.TinBatDongSanBDSMa
    })
      .then(data => {
        res.status(200).json({ status: "success", message: "Gửi yêu cầu thành công!" });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ status: "failed", message: "server has an error" })
      })
  }


//[GET] yeucaulienhe/find




async findOne(req, res){
  let yeucau =await db.YeuCauLienHe.findAll({
    where: {
      [Op.and]: [
        { TinBDS_Ma: req.params.idbds },
        { UserId: req.userId }
      ]
    }
  })
  .then(yeucau => {
    
    res.send(yeucau);
  })
  .catch(err => { throw err });
}



//[GET] yeucaulienhe/user

async findUserLH(req, res){
  let yeucau =await db.YeuCauLienHe.findAll({
    where: {
      UserId: req.userId
    },
    include: 
    { model: db.TinBatDongSan ,
      include: [{
        model: db.HinhBDS,

      }]
  }
})
  .then(yeucau => {
    
    res.send(yeucau);
  })
  .catch(err => { throw err });
}

}



module.exports = new YeuCauLhController();