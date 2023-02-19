const db = require("../models");
class LienheController {

  //[GET] /lienhe/create
  async create(req, res) {
    let lienhe = await db.LienHe.create({
        LH_TenChuSoHuu: req.body.LH_TenChuSoHuu,
        LH_SoDienThoai: req.body.LH_SoDienThoai,
        LH_Email: req.body.LH_Email,
        LH_DiaChi: req.body.LH_DiaChi
    })
      .then(data => {
        res.status(200).json({ status: "success", message: "Thêm thành công!" });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ status: "failed", message: "server has an error" })
      })
  }


//[UPDATE] lienhe/id

async update(req, res) {
      const id=req.params.id;
    let lienhe = await db.LienHe.update(req.body,{
      where: { LH_Ma:  id}
    })

    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cập nhật thành công!"
        });
      } else {
        res.send({
          message: `Cannot update with id=${id}. Maybe News was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error update! "
      });
    });

  }

  /// [DELETE] lienhe/id
  async delete(req, res) {
      const id=req.params.id;
    let lienhe = await db.LienHe.destroy({
      where: { LH_Ma:  id}
    })

      .then(num => {
        if (num == 1) {
          res.send({
            message: "Xóa thành công!"
          });
        } else {
          res.send({
            message: `Cannot delete  with id=${id}. Maybe News was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete "
        });
      });

  }

  //[GET] lienhe/
  async findAll(req, res) {
    try {
      let lienhe = await db.LienHe.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => { throw err });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }

  //[GET] /lienhe/id
  async findOne(req, res){
    let lienhe =await db.LienHe.findOne({
      where: {
        LH_Ma: req.params.id
      }
    })
    .then(loai => {
      res.send(loai);
    })
    .catch(err => { throw err });
  }


}

module.exports = new LienheController();