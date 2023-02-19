const db = require('../app/models');
const authConfig = require("../app/config/auth.config");
const jwt = require("jsonwebtoken");

//kiem tra token hop le khong
const verifyToken =(req,res,next)=>{
    // console.log(req)
    // console.debug("cookies: ", req.cookies)
    // const token = req.cookies.accessToken;
    
    let token = req.headers["x-access-token"];;

     if(!token){
        return res.status(400).json({"status": "failed", "message": "No token provided"});
     }

    //  const accessToken = token.split(" ")[1];
     //(token,secret,callback)
     jwt.verify(token,authConfig.secret,(err,decoded)=>{
        if(err){
            return res.status(400).json({"status": "failed", "message": "The token is not valid"});
        }
        req.userId = decoded.userId;
    next()
     });
     
}

const isAdmin = async (req, res, next) => {
    try{
        let userId = req.userId || null;
        let user = await db.User.findOne({
      where: {
        id : userId
      }
    }).catch(err=>{throw err})

        let roles = await user.getRoles();
        let temp=false;

        roles.forEach(role=>{
            console.log(role);
            if(role.QTC_Ten == "admin"){
                temp= true;
            }
            role = role.QTC_Ten;
          })
          if(temp){
            next();
          }
          else{res.status(403).send({ message: "Require Admin Role!" });}
            
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:"success", message:"server has an err"})
      }
    
  };

  const isModerator = async (req, res, next) => {
    try{
        let userId = req.userId || null;
        let user = await db.User.findOne({
      where: {
        id : userId
      }
    }).catch(err=>{throw err})

        let roles = await user.getRoles();
        let temp=false;

        roles.forEach(role=>{
            if(role.QTC_Ten == "moderator"){
                temp= true;
            }
            role = role.QTC_Ten;
          })
          if(valid){
            next();
          }
          else
            res.status(403).send({ message: "Require Moderator Role!" });
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:"success", message:"server has an err"})
      }
    
  };

  const isAdminOrModerator = async (req, res, next) => {
    try{
        let userId = req.userId || null;
        let user = await db.User.findOne({
      where: {
        id : userId
      }
    }).catch(err=>{throw err})

        let roles = await user.getRoles();
        let temp=false;

        roles.forEach(role=>{
            if(role.QTC_Ten == "moderator"|| role.QTC_Ten == "admin"){
                temp= true;
            }
            role = role.QTC_Ten;
          })
          if(valid){
            next();
          }
          else
            res.status(403).send({ message: "Require Admin or Moderator Role!" });
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:"success", message:"server has an err"})
      }
    
  };
  

module.exports = {
    verifyToken,
    isAdmin,
    isModerator,
    isAdminOrModerator
  }