const db = require("../models");
class PhaplyController {

    //[GET] /loaitiente/create
  async create(req, res) {
    let phaply = await db.TinhTrangPhapLy.create({
        PL_Ten: req.body.PL_Ten,
        TinBatDongSanBDSMa: req.body.TinBatDongSanBDSMa
    })

    console.log(phaply.PL_Ma);
    //   .then(data => {
    //     res.status(200).json({ status: "success", message: "Thêm thành công!" });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     res.status(500).json({ status: "failed", message: "server has an error" })
    //   })
  }

    //[GET] tinhtrangphaply/
  async findAll(req, res) {
    try {
      let phaply = await db.TinhTrangPhapLy.findAll()
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

module.exports = new PhaplyController();