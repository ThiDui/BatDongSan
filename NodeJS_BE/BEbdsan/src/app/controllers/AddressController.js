const db = require("../models");
class AddressController {


  //[GET] lienhe/
  async findAll(req, res) {
    try {
      let diachi = await db.TinhThanh.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => { throw err });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }
//[GET]
  async findAllQh(req, res) {
    try {
      let diachi = await db.QuanHuyen.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => { throw err });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }

  //[GET] /address/xaphuong
  async findAllXp(req, res) {
    try {
      let diachi = await db.XaPhuong.findAll()
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

module.exports = new AddressController();