const db = require("../models");
class LoaigdController {

  //[GET] /loaigiaodich/create
  async create(req, res) {
    let loaigd = await db.LoaiGiaoDich.create({
        LGD_Ten: req.body.LGD_Ten
    })
      .then(data => {
        res.status(200).json({ status: "success", message: "Thêm loại giao dịch thành công!" });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ status: "failed", message: "server has an error" })
      })
  }


//[UPDATE] loaigiaodich/id

async update(req, res) {
      const id=req.params.id;
    let updateloaigd = await db.LoaiGiaoDich.update(req.body,{
      where: { LGD_Ma:  id}
    })

    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cập nhật loại giao dịch thành công!"
        });
      } else {
        res.send({
          message: `Cannot update loaigd with id=${id}. Maybe News was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error update! "
      });
    });

  }

  /// [DELETE] loaigiaodich/id
  async delete(req, res) {
      const id=req.params.id;
    let deleteloaigd = await db.LoaiGiaoDich.destroy({
      where: { LGD_Ma:  id}
    })

      .then(num => {
        if (num == 1) {
          res.send({
            message: "Xóa loại giao dịch thành công!"
          });
        } else {
          res.send({
            message: `Cannot delete loai giao dicih with id=${id}. Maybe loai giao dich was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete "
        });
      });

  }

  //[GET] loaigiaodich/
  async findAll(req, res) {
    try {
      let loaigd = await db.LoaiGiaoDich.findAll()
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

module.exports = new LoaigdController();