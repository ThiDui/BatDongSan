const db = require('../models');
const authConfig = require("../config/auth.config");
// const User = db.User;
// const Role = db.Role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
class AuthController {
    async login(req, res) {
        try {
            console.log(req.body);
            let user = await db.User.findOne({
                where: {
                    "username": req.body.username
                }
            })

            if (!user) {
                return res.status(400).json({ status: "failed", message: "Invalid username" });
            }
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (passwordIsValid) {
                //dki mot token moi
                let token = jwt.sign({userId: user.id},authConfig.secret,{
                    expiresIn: 86400 // 24 hours
                  });
            
                //tra ve client
                // res.cookie("accessToken",token,{
                //     httpOnly: true,
                //     maxAge: 24*60*60*1000
                // });
                var authorities = [];
                user.getRoles()
                    .then(roles => {
                for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].QTC_Ten.toUpperCase());
                }
               
                
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    phone: user.phone,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                  });

                }); 
               // npm i react-cookie
                //res.status(200).json({ status: "success", message: "login successfully" })
            }
            else {
                res.status(400).json({ status: "failed", message: "Invalid password" })
            }

        }
        catch (err) {
            console.log(err);
            res.status(500).json({ status: "failed", message: "server has an error" })
        }
    }



    async signup(req, res) {
        try {
            let user = await db.User.create({
                username: req.body.username,
                password: req.body.password,
                avatar: req.body.avatar,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address
            });
            
            let role = await db.Role.findOne({
                where: {
                    QTC_Ten: "user"
                }
            });

            try{
                await user.setRoles(role)

            }catch(err){
                return res.status(500).json(err);
            }

            res.status(200).json({status: "success", message: "Register Account successfully"});

        }
        catch (err) {
            console.log(err);
            res.status(500).json({ status: "failed", message: "server has an error" })
        }
    }

    async signuptest(req, res) {
        try {
            // let chucvu = await db.ChucVu.findOne({
            //     where: { ma_chucvu: req.body.ma_chucvu }
            // })

            // let idchucvu = chucvu.ma_chucvu
            let user = await db.User.create({
                username: req.body.username,
                password: req.body.password,
                avatar: req.file.filename ,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address
            });
            
            console.log(req.file.filename)
            // if (req.files) {
      
            //   let phaply = await req.files.forEach(element => {
            //     db.HinhBDS.create({
            //       HA_DuongDan: element.filename,
            //       TinBatDongSanBDSMa: idbds
            //     })
      
            //   })
      
      
            // }

             let iduser = user.id;
            let userRole = await db.UserRole.create({
                UserId: iduser,
                RoleId: req.body.RoleId,
                RoleQTCMa:req.body.RoleQTCMa ,
                ChucVuMaChucvu: req.body.ChucVuMaChucvu,
            });


            res.status(200).json({status: "success", message: "Register Account successfully"});

        }
        catch (err) {
            console.log(err);
            res.status(500).json({ status: "failed", message: "server has an error" })
        }
    }

}

module.exports = new AuthController();