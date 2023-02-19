// const mysql = require('mysql');

// function connect() {

//     const connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'password',
//         database: 'batdongsan'
//     })

//     connection.connect(function(err) {
//         if (err) {
//           console.log("Connect failure!");
//           console.log(err);
//           return;
//         }
    
//         console.log("Connect successfully!");
//       });
//     return connection;
// }

// module.exports = { connect }

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "password",
  DB: "batdongsan1",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};