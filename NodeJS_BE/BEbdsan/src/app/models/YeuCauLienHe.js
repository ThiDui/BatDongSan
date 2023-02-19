const {DataTypes, Model} = require("sequelize");

module.exports = (sequelize)=>{
  class YeuCauLienHe extends Model{};
  YeuCauLienHe.init({
    TinBDS_Ma : {
      primaryKey: true,
      type:  DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: "tinbatdongsans",
        key: "BDS_Ma"
      }
    },
    UserId : {
        primaryKey: true,
        type:  DataTypes.INTEGER,
        allowNull:false,
        references: {
          model: "users",
          key: "id"
        },
        field: "user_id"
        },
    YC_NoiDung: {
        type: DataTypes.STRING,
        allowNull:false
    }   
  },{
    sequelize,
    createdAt: true,
    updatedAt: false,
  })
  return YeuCauLienHe;
}