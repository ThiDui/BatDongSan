const db = require("../models");
class ChucVuController {
//[GET] /loaigiaodich/create
async create(req, res) {
    let chucvu = await db.ChucVu.create({
        ten_chucvu: req.body.ten_chucvu
    })
      .then(data => {
        res.status(200).json({ status: "success", message: "Thêm thành công!" });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ status: "failed", message: "server has an error" })
      })
  }


  //GET chucvu/
  async findAll(req, res) {
    try {
      let newsall = await db.ChucVu.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => { throw err });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }

}



module.exports = new ChucVuController();