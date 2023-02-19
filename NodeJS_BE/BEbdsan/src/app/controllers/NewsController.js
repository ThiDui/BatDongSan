const db = require("../models");
class NewsController {

  //[GET] /news/create
  async create(req, res) {
    let news = await db.New.create({
      TieuDe: req.body.TieuDe,
      HinhTieuDe: req.body.HinhTieuDe,
      Tin_DuongDan: req.body.Tin_DuongDan,
      Mota: req.body.Mota
    })
      .then(data => {
        res.status(200).json({ status: "success", message: "Insert news successfully" });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ status: "failed", message: "server has an error" })
      })
  }


//[UPDATE] news/id

async update(req, res) {
      const id=req.params.id;
    let deletenews = await db.New.update(req.body,{
      where: { TinMa:  id}
    })

    .then(num => {
      if (num == 1) {
        res.send({
          message: "News was updated successfully."
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
      const id=req.params.id;
    let deletenews = await db.New.destroy({
      where: { TinMa:  id}
    })

      .then(num => {
        if (num == 1) {
          res.send({
            message: "News was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete News with id=${id}. Maybe News was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete News with id=" + id
        });
      });

  }

  //[GET] /news/
  async findAll(req, res) {
    try {
      let newsall = await db.New.findAll()
        .then(newsall => {
          res.send(newsall);
        })
        .catch(err => { throw err });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }

  //[GET] /news/id
  async findOne(req, res){
    let newsone =await db.New.findOne({
      where: {
        TinMa: req.params.id
      }
    })
    .then(newsone => {
      res.send(newsone);
    })
    .catch(err => { throw err });
  }



}

module.exports = new NewsController();