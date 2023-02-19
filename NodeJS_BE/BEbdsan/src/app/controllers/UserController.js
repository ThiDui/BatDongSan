const db = require("../models");
const bcryptjs = require("bcryptjs");
class UserController{

  //[GET] /news/
  async findAll(req, res) {
    try {
      let user = await db.User.findAll()
        .then(data => {
          res.send(data);
        })
        .catch(err => { throw err });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }

  //[GET] /news/id
  async findOne(req, res){
    let user =await db.User.findOne({
      where: {
        id: req.userId
      }
    })
    .then(newsone => {
      res.send([newsone]);
    })
    .catch(err => { throw err });
  }




          //[UPDATE] user/id

      async update(req, res) {
        const id=req.params.id;
      let user = await db.User.update(req.body,{
        where: { id:  id}
      })

      .then(num => {
        if (num == 1) {
          res.send({
            message: "Updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + id
        });
      });

      }
    
    async changePassword(req, res){
        try {
          // if(!req.body.oldPassword){
          //   return res.status(400).json({status:"failed", message:"Mật khẩu cũ trống!"})
          // }
          // if(!req.body.newPassword){
          //   return res.status(400).json({status:"failed", message:"Mật khẩu mới trống"})
          // }
          let user = await db.User.findOne({
            where: {
              id : req.userId
            }
          }).catch(err=>{throw err});
          if(!bcryptjs.compareSync(req.body.oldPassword, user.password)){
            return res.status(400).json({status:"failed", message:"Mật khẩu cũ của bạn không chính xác!"})
          }
          // if(bcryptjs.compareSync(req.body.newPassword, user.password)){
          //   return res.status(400).json({status:"failed", message:"Mật khẩu mới không đuco của bạn không chính xác!"})
          // }
          user.password = req.body.newPassword;
          await user.save().catch(err=>{throw err});
          res.json({status: "success", "message": "Cập nhật mật khẩu thành công"})
        } catch (err) {
          console.log(err);
          res.status(500).json({ status: "failed", message: "Server has an err" })
        }
      }
}
module.exports = new UserController