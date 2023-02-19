const acountRouter = require('./acount');
const userRouter = require('./user');
const newsRouter = require('./news');
const tinbdsRouter = require('./tinbds');
const authRouter = require('./auth');
const loaibdsRouter = require('./loaibds');
const loaittRouter = require('./loaitt');
const loaigdRouter = require('./loaigd');
const lienheRouter = require('./lienhe');
const addressRouter = require('./address');
const phaplyRouter = require('./phaply');
const imgRouter = require('./img');
const yeucauRouter = require('./yeucaulh');
const chucvuRouter =  require('./chucvu');
const thongKeRouter = require('./thongke');

function route(app) {

    app.use('/account',acountRouter);
    app.use('/user',userRouter);
    app.use('/news',newsRouter);
    app.use('/batdongsan',tinbdsRouter);
    app.use('/auth',authRouter);
    app.use('/loaibatdongsan',loaibdsRouter);
    app.use('/loaitiente',loaittRouter);
    app.use('/loaigiaodich',loaigdRouter);
    app.use('/lienhe',lienheRouter);
    app.use('/address',addressRouter);
    app.use('/phaply',phaplyRouter);
    app.use('/img',imgRouter);
    app.use('/yeucaulienhe',yeucauRouter);
    app.use('/chucvu',chucvuRouter);
    app.use('/thongke',thongKeRouter);

   // app.use('/role',roleRouter);


}

module.exports = route;