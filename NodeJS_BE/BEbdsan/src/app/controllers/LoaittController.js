const db = require("../models");
class LoaittController {

  //[GET] /loaitiente/create
  async create(req, res) {
    let loaitt = await db.LoaiTienTe.create({
        LTT_Ten: req.body.LTT_Ten
    })
      .then(data => {
        res.status(200).json({ status: "success", message: "Thêm loại tiền tệ thành công!" });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ status: "failed", message: "server has an error" })
      })
  }


//[UPDATE] loaitiente/id

async update(req, res) {
      const id=req.params.id;
    let updateloaitt = await db.LoaiTienTe.update(req.body,{
      where: { LTT_Ma:  id}
    })

    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cập nhật loại tiền tệ thành công!"
        });
      } else {
        res.send({
          message: `Cannot update loaitt with id=${id}. Maybe News was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error update! "
      });
    });

  }

  /// [DELETE] loaitiente/id
  async delete(req, res) {
      const id=req.params.id;
    let deleteloaitt = await db.LoaiTienTe.destroy({
      where: { LTT_Ma:  id}
    })

      .then(num => {
        if (num == 1) {
          res.send({
            message: "Xóa loại tiền tệ thành công!"
          });
        } else {
          res.send({
            message: `Cannot delete loai tien te with id=${id}. Maybe loai tien te was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete "
        });
      });

  }

  //[GET] loaitiente/
  async findAll(req, res) {
    try {
      let loaitt = await db.LoaiTienTe.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => { throw err });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }

  //[GET] /loaitiente/id
  async findOne(req, res){
    let loai =await db.LoaiTienTe.findOne({
      where: {
        LTT_Ma: req.params.id
      }
    })
    .then(loai => {
      res.send(loai);
    })
    .catch(err => { throw err });
  }



}

module.exports = new LoaittController();