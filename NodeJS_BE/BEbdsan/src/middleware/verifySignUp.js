const db = require('../app/models');
const User = db.User;
const isExistentEmailOrUserName = (req, res,next)=>{
    User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then((user)=>{
      if(user){
        return res.status(400).json({status: "failed", message: "Username is already in use!"});
      }
      User.findOne({
        where:{
          email : req.body.email
        }
      })
      .then(user=>{
        if(user){
          return res.status(400).json({status: "failed", message: "Email is already in use!"});
        }
        next();
      })
      .catch(err=>{
        res.status(500);
      })
    })
    .catch(err=>{
      res.status(500);
    })
  }
  module.exports = {
    isExistentEmailOrUserName
}