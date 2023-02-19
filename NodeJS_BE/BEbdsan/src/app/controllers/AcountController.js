const db = require("../models");
const { Op } = require("sequelize");
class AcountController{
    async create(req, res){
        try {
          let acount = await db.Acount.create({
            TK_Ten : req.body.TK_Ten,
            TK_Pass : req.body.TK_Pass
          })
          .catch(err =>{throw err});
          console.log("Acount: ", acount.TK_Ma);
        } catch (err) {
          console.log(err);
          res.status(500).json({status:"failed", message:"server has an error"} )
        }
      }

       //[GET] account/

  async findAllisAdminOrModerator(req, res) {
    try {
      const User=db.User;
      const Role=db.Role;
      const UserRole = db.UserRole;
      const ChucVu = db.ChucVu;
      let acc = await User.findAll({
        
        include:[
          {model: Role,
            where: {
              [Op.or]: [
                {QTC_Ten : "admin"},
                {QTC_Ten : "moderator"}

            ]
            }},
          {model: UserRole,
          include:{
            model:ChucVu,
            
            }}
          
            
        ]
      }) 
        .then(data => {
         
          res.send(data);
          
        })
        .catch(err => { throw err });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: "server has an error" })
    }
  }


     //[GET] account/user

     async findAllisUser(req, res) {
      try {
        const User=db.User;
        const Role=db.Role;
        const UserRole = db.UserRole;
        const ChucVu = db.ChucVu;
        let acc = await User.findAll({
          
          include:[
            {model: Role,
              where: {QTC_Ten : "user"}},
            {model: UserRole,
            include:{
              model:ChucVu,
              
              }}
            
              
          ]
        }) 
          .then(data => {
           
            res.send(data);
            
          })
          .catch(err => { throw err });
  
      } catch (err) {
        console.log(err);
        res.status(500).json({ status: "failed", message: "server has an error" })
      }
    }


     /// [DELETE] news/id
  async delete(req, res) {
    try {
    const id = req.params.id;
    let dl = await db.User.destroy({
      where: { id: id }
    })

      .then(num => {
          res.send({ message: "Deleted successfully!"});
        
        
      })
      .catch(err => {
        res.status(500).send({ message: "Could not delete " });
      });
  }catch (err) {
    console.log(err);
    res.status(500).json({ status: "failed", message: "server has an error" })
  }
}




}
module.exports = new AcountController