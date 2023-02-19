const db = require('../app/models');
const tin = db.TinBatDongSan;
const isExistentAddress = (req, res,next)=>{
    tin.findOne({
      where: {
        BDS_DiaChiCuThe: req.body.BDS_DiaChiCuThe
      }
    })
    .then((dc)=>{
      if(dc){
        return res.status(400).json({status: "failed", message: "Bất động sản này đã được đăng trước đó!"});
      }
      next();
    })
    .catch(err=>{
      res.status(500);
    })
  }
  module.exports = {
    isExistentAddress
}