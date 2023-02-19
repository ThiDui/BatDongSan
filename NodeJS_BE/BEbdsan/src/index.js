const express = require('express')
const app = express()
const cookieParser = require("cookie-parser");
const port = 3001

   const route = require('./routes');
const db = require("./app/models");
const path = require('path');
const cors = require('cors');

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use(cookieParser());

// ///////////////////chay lai db
// db.sequelize.sync({force:true, logging: console.log}).then(data=>{
//   console.log("synchronize successfully");
//  // console.log(data)
// }).catch(err=>{
//   console.log(err)
// })


//static Images Folder

console.log(__dirname);
app.use(express.static(path.join(__dirname, "resources")))
//Connect to db

 route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
