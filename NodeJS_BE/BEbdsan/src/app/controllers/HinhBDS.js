const db = require("../models");
// image Upload
const multer = require('multer')
const path = require('path');


const addProduct = async (req, res) => {
//     const {body} = req;
// const post = Post.create({...body, userId: userIdFound.id })
    // let info = {
    //     HA_DuongDan: req.files.filename,
    //     // TinBatDongSanBDSMa: req.body.TinBatDongSanBDSMa
    // }
    
    // console.log(info);

    // const product = await db.HinhBDS.create({
        
    // })
    console.log(req.files);
req.files.forEach(element => {
    db.HinhBDS.create({
        HA_DuongDan: element.filename,
        TinBatDongSanBDSMa: 19
         })
    
});

    res.status(200).send("upload success")
    // console.log(product)

}
// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/resources')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        // cb('Give proper files formate to upload')
    }
})
//single('HA_DuongDan')
// array('HA_DuongDan',4)

module.exports = {
    addProduct,
    upload
    
}