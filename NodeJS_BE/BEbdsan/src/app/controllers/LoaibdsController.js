const db = require("../models");
class LoaibdsController {

  //[GET] /loaibatdongsan/create
  async create(req, res) {
    let loaibds = await db.LoaiBDS.create({
        L_Ten: req.body.L_Ten
    })
      .then(data => {
        res.status(200).json({ status: "success", message: "Thêm loại bất động sản thành công!" });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ status: "failed", message: "server has an error" })
      })
  }


//[UPDATE] loaibatdongsan/id

async update(req, res) {
      const id=req.params.id;
    let updateloaibds = await db.LoaiBDS.update(req.body,{
      where: { L_Ma:  id}
    })

    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cập nhật loại bất động sản thành công!"
        });
      } else {
        res.send({
          message: `Cannot update loaibds with id=${id}. Maybe News was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error update! "
      });
    });

  }

  /// [DELETE] loaibatdongsan/id
  async delete(req, res) {
      const id=req.params.id;
    let deleteloaibds = await db.LoaiBDS.destroy({
      where: { L_Ma:  id}
    })

      .then(num => {
        if (num == 1) {
          res.send({
            message: "Xóa loại bất động sản thành công!"
          });
        } else {
          res.send({
            message: `Cannot delete loai bat dong san with id=${id}. Maybe News was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete "
        });
      });

  }

  //[GET] loaibatdongsan/
  async findAll(req, res) {
    try {
      let newsall = await db.LoaiBDS.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => { throw err });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }

  //[GET] /loaibatdongsan/id
  async findOne(req, res){
    let loai =await db.LoaiBDS.findOne({
      where: {
        L_Ma: req.params.id
      }
    })
    .then(loai => {
      res.send(loai);
    })
    .catch(err => { throw err });
  }


}

module.exports = new LoaibdsController();