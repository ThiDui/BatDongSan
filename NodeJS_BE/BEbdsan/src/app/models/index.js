const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
// const Acount = require("./Acount");
const User = require("./User");
const Role = require("./Role");
const New = require("./New");
const UserRole = require("./UserRole");
const ChucVu = require("./ChucVu");
const TinBatDongSan = require("./TinBatDongSan");
const LoaiTienTe = require("./LoaiTienTe");
const LoaiGiaoDich = require("./LoaiGiaoDich");
const TinhTrangPhapLy = require("./TinhTrangPhapLy");
const LoaiBDS = require("./LoaiBDS");
const HinhBDS = require("./HinhBDS");
const LienHe = require("./LienHe");
const TinhThanh = require("./TinhThanh");
const QuanHuyen = require("./QuanHuyen");
const XaPhuong = require("./XaPhuong");
const YeuCauLienHe = require("./YeuCauLienHe");

//const { BULKDELETE } = require("sequelize/types/query-types");
const sequelize = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }

});

const db = {};
// db.Acount = Acount(sequelize);
db.User = User(sequelize);
db.Role = Role(sequelize);
db.New = New(sequelize);
db.UserRole = UserRole(sequelize);
db.ChucVu = ChucVu(sequelize);
db.TinBatDongSan = TinBatDongSan(sequelize);
db.LoaiTienTe = LoaiTienTe(sequelize);
db.LoaiGiaoDich = LoaiGiaoDich(sequelize);
db.TinhTrangPhapLy = TinhTrangPhapLy(sequelize);
db.LoaiBDS = LoaiBDS(sequelize);
db.HinhBDS = HinhBDS(sequelize);
db.LienHe = LienHe(sequelize);
db.TinhThanh = TinhThanh(sequelize);
db.QuanHuyen = QuanHuyen(sequelize);
db.XaPhuong = XaPhuong(sequelize);
db.YeuCauLienHe =YeuCauLienHe(sequelize);
/* ======== association ======== */
//user <- - => UserRole
db.User.hasMany(db.UserRole);
db.UserRole.belongsTo(db.User);
//Role <- - => UserRole
db.Role.hasMany(db.UserRole);
db.UserRole.belongsTo(db.Role);
// User <=-=> Role
db.User.belongsToMany(db.Role, {
    through: db.UserRole
})

db.Role.belongsToMany(db.User, {
    through: db.UserRole
})

//user <> Acount
// db.User.belongsTo(db.Acount);
//db.User.hasOne(db.Acount);

//user <- - => TinBDS
db.User.hasMany(db.TinBatDongSan);
db.TinBatDongSan.belongsTo(db.User);

//User <- - =>  Yeucaulienhe
db.User.hasMany(db.YeuCauLienHe);
db.YeuCauLienHe.belongsTo(db.User);
//tinbds <- - => yeucaulienhe
db.TinBatDongSan.hasMany(db.YeuCauLienHe);
db.YeuCauLienHe.belongsTo(db.TinBatDongSan);



//ChucVu <- - => UserRole
db.ChucVu.hasMany(db.UserRole);
db.UserRole.belongsTo(db.ChucVu);
//LoaiTienTe <- - => TinDBS>
db.LoaiTienTe.hasMany(db.TinBatDongSan);
db.TinBatDongSan.belongsTo(db.LoaiTienTe);
//LoaiGiaoDich <- - => TinDBS>
db.LoaiGiaoDich.hasMany(db.TinBatDongSan);
db.TinBatDongSan.belongsTo(db.LoaiGiaoDich);
//TinDBS <- - =>  TinhTranngPhapLy>
db.TinBatDongSan.hasMany(db.TinhTrangPhapLy);
db.TinhTrangPhapLy.belongsTo(db.TinBatDongSan);
//LoaiBDS <- - => TinDBS>
db.LoaiBDS.hasMany(db.TinBatDongSan);
db.TinBatDongSan.belongsTo(db.LoaiBDS);
//LienHe <- - => TinDBS>
db.LienHe.hasMany(db.TinBatDongSan);
db.TinBatDongSan.belongsTo(db.LienHe);
//HinhBDS <= - -> TinBDS
db.TinBatDongSan.hasMany(db.HinhBDS);
db.HinhBDS.belongsTo(db.TinBatDongSan);
//TinhThanh <- - => QuanHuyen
db.TinhThanh.hasMany(db.QuanHuyen);
db.QuanHuyen.belongsTo(db.TinhThanh);
//QuanHuyen <- - => XaPhuong
db.QuanHuyen.hasMany(db.XaPhuong);
db.XaPhuong.belongsTo(db.QuanHuyen);

//XaPhuong <- - => TinBDS
db.XaPhuong.hasMany(db.TinBatDongSan);
db.TinBatDongSan.belongsTo(db.XaPhuong);




db.Sequelize = Sequelize;
db.sequelize = sequelize;


module.exports = db;